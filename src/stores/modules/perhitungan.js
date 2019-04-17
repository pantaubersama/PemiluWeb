import Vue from 'vue'
import * as PerhitunganAPI from '@/services/api/perhitungan'

export const namespaced = true
export const state = {
  provinces: {},
  regencies: {},
  districts: {},
  villages: {},
  dapils: {},
  candidates: {},
  presidents: {},
  realCounts: {},
  formC1: {},
}

export const actions = {
  getProvinces(ctx) {
    return PerhitunganAPI.getProvinces()
      .then(resp => resp.provinces)
      .then((provinces) => ctx.commit('setProvinces', { provinces }))
  },
  getRegencies(ctx, provinceCode) {
    return PerhitunganAPI.getRegencies(provinceCode)
      .then(resp => resp.regencies.map(it => ({ ...it, provinceCode })))
      .then(regencies => ctx.commit('setRegencies', { regencies }))
  },
  getDistricts(ctx, regencyCode) {
    return PerhitunganAPI.getDistricts(regencyCode)
      .then(resp => resp.districts.map(it => ({ ...it, regencyCode })))
      .then(districts => ctx.commit('setDistricts', { districts }))
  },
  getVillages(ctx, districtCode) {
    return PerhitunganAPI.getVillages(districtCode)
      .then(resp => resp.villages.map(it => ({ ...it, districtCode })))
      .then(villages => ctx.commit('setVillages', { villages }))
  },
  getDapils(ctx, { provinceCode, regencyCode, tingkat }) {
    return PerhitunganAPI.getDapils(provinceCode, regencyCode, tingkat)
      .then(resp => resp.dapils)
      .then(dapils => dapils.map(it => ({ ...it, provinceCode, regencyCode, name: it.nama, code: it.id })))
      .then(dapils => ctx.commit('setDapils', { dapils }))
  },
  getCandidates(ctx, { dapilId, tingkat }) {
    return PerhitunganAPI.getCandidates(dapilId, tingkat)
      .then(candidates => candidates.map(it => ({ ...it, dapilId })))
      .then(candidates => ctx.commit('setCandidates', { candidates }))
  },
  getCandidatesSummary(ctx, { dapilId, realCountId, level = 2 }) {
    return PerhitunganAPI.getCandidatesSummary({ dapil_id: dapilId, hitung_real_count_id: realCountId, level })
      .then((summary) => {
        const validVote = summary.valid_vote
        const invalidVote = summary.invalid_vote.total_vote
        const candidates = summary.percentages.map((candidate) => ({
          ...candidate,
          id: Number(candidate.id)
        }))
        ctx.commit('setVoteCount', { dapilId, validVote, invalidVote })
        ctx.commit('setCandidatePercentage', { dapilId, candidates })
      })
  },
  getPresidentSummary(ctx, { region = null, level = 0 } = {}) {
    return PerhitunganAPI.getPresidentSummary(region, level)
      .then(resp => resp.percentages.map(it => ({ ...it, level })))
      .then((resp) => {
        ctx.commit('setPresidentSummary', { region, percentages: resp })
      })
  },
  getPresident(ctx, { region, tps, realCountId, level = 6 }) {
    return PerhitunganAPI.getPresident({ region, tps, realCountId, level })
      .then((resp) => {
        const percentage = { ...resp.percentage, level }
        ctx.commit('setPresidentSummary', { region, percentages: [percentage] })
      })
  },
  getRealCounts(ctx, { userId = null, villageCode = null, dapilId = null, page = 1 } = {}) {
    return PerhitunganAPI.getRealCounts({ user_id: userId, village_code: villageCode, dapil_id: dapilId, page })
      .then(resp => resp.real_counts)
      .then((data) => {
        const realCounts = data.map(it => ({
          ...it,
          userId,
          villageCode,
          dapilId
        }))
        ctx.commit('setRealCounts', { realCounts })
      })
  },
  getFormC1(ctx, { realCountId, type = 'presiden' }) {
    return PerhitunganAPI.getFormC1({ realCountId, type })
      .then((resp) => {
        const form = resp.form_c1
        ctx.commit('setFormC1', { form })
      })
  }
}
export const mutations = {
  setProvinces(state, { provinces }) {
    provinces.forEach(province => Vue.set(state.provinces, province.code, province))
  },
  setRegencies(state, { provinceCode, regencies }) {
    regencies.forEach(regency => Vue.set(state.regencies, regency.code, regency))
  },
  setDistricts(state, { regencyCode, districts }) {
    districts.forEach(district => Vue.set(state.districts, district.code, district))
  },
  setVillages(state, { districtCode, villages }) {
    villages.forEach(village => Vue.set(state.villages, village.code, village))
  },
  setDapils(state, { dapils }) {
    dapils.forEach(dapil => Vue.set(state.dapils, dapil.id, dapil))
  },
  setCandidates(state, { candidates }) {
    candidates.forEach(candidate => Vue.set(state.candidates, candidate.id, candidate))
  },
  setVoteCount(state, { dapilId, validVote, invalidVote }) {
    const dapil = state.dapils[dapilId]
    Vue.set(state.dapils, dapilId, {
      ...dapil,
      validVote,
      invalidVote
    })
  },
  setCandidatePercentage(state, { dapilId, candidates }) {
    candidates.map((it) => {
      it.percentage = it.percentage || 0
      it.total_vote = it.total_vote || 0
      const partai = state.candidates[it.id]
      const sum = it.candidates.map(it => it.cv).reduce((sum, acc) => sum + acc, 0)
      const members = partai.candidates.map((member) => {
        const m = it.candidates.find(it => Number(it.id) === Number(member.id))
        m.percentage = ((m.cv / sum) * 100) || 0
        return { ...m, ...member }
      })
      return { ...it, ...partai, candidates: members }
    }).forEach(it => Vue.set(state.candidates, it.id, it))
  },
  setPresidentSummary(state, { region, percentages }) {
    percentages
      .filter(it => it.region != null)
      .forEach((it) => {
        const regionCode = it.region.code
        const percentage = it.percentage
        if (it.percentage != null) {
          percentage.jokowi = percentage.candidates[0]
          percentage.prabowo = percentage.candidates[1]
        }
        Vue.set(state.presidents, regionCode, {
          ...it,
          region: {
            ...it.region,
            parentCode: region
          },
          percentage: percentage
        })
      })
  },
  setRealCounts(state, { realCounts }) {
    realCounts.forEach(count => Vue.set(state.realCounts, count.id, count))
  },
  setFormC1(state, { form }) {
    Vue.set(state.formC1, form.id, form)
  }
}

export const getters = {
  provinces: (state) => Object.values(state.provinces),
  province: (state) => (provinceCode) => state.provinces[provinceCode],

  regencies: (state) => (provinceCode) => Object.values(state.regencies)
    .filter(it => it.provinceCode === provinceCode),
  regency: (state) => (regencyCode) => state.regencies[regencyCode],

  districts: (state) => (regencyCode) => Object.values(state.districts)
    .filter(it => it.regencyCode === regencyCode),
  district: (state) => (districtCode) => state.districts[districtCode],

  villages: (state) => (districtCode) => Object.values(state.villages)
    .filter(it => it.districtCode === districtCode),
  village: (state) => (villageCode) => state.villages[villageCode],

  dapils: (state) => (regencyCode) => Object.values(state.dapils)
    .filter(it => it.regencyCode === regencyCode),
  dapilsByProvince: (state) => (provinceCode) => Object.values(state.dapils)
    .filter(it => it.provinceCode === provinceCode),
  dapilsByTingkat: (state) => (tingkat) => Object.values(state.dapils)
    .filter(it => it.tingkat === tingkat),
  dapil: (state) => (dapilId) => state.dapils[dapilId],

  candidates: (state) => (dapilId) => Object.values(state.candidates)
    .filter(it => it.dapilId === dapilId),
  candidate: (state) => (candidateId) => state.candidate[candidateId],

  presidents: (state) => Object.values(state.presidents)
    .slice()
    .sort((a, b) => a.region.name > b.region.name ? 1 : -1),
  presidentsByLevel: (s, getters) => (level) => getters.presidents
    .filter(it => it.level === level),
  presidentsByRegion: (state) => (regionCode) => state.presidents[regionCode],

  realCounts: (state) => Object.values(state.realCounts),
  realCount: (state) => (id) => state.realCounts[id],
  realCountsByUser: (s, getters) => (userId) => getters.realCounts
    .filter(it => it.userId === userId),
  realCountsByVillage: (s, getters) => (villageCode) => getters.realCounts
    .filter(it => it.villageCode === villageCode),
  realCountsByDapil: (s, getters) => (dapilId) => getters.realCounts
    .filter(it => it.dapilId === dapilId),
  forms: (state) => Object.values(state.formC1),
  form: (s, getters) => (realCountId) => getters.forms.find(it => it.real_count.id === realCountId)
}
