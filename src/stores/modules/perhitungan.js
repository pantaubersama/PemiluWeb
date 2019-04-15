import Vue from 'vue'
import * as PerhitunganAPI from '@/services/api/perhitungan'

export const namespaced = true
export const state = {
  provinces: {},
  regencies: {},
  districts: {},
  villages: {},
  dapils: {},
  candidates: {}
}

export const actions = {
  getProvinces(ctx) {
    return PerhitunganAPI.getProvinces()
      .then(resp => resp.provinces)
      .then((provinces) => ctx.commit('setProvinces', { provinces }))
  },
  getRegencies(ctx, provinceCode) {
    return PerhitunganAPI.getRegencies(provinceCode)
      .then(resp => resp.regencies.map(it => ({ ...it, provinceCode})))
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
  getDapils(ctx, { provinceCode, regencyCode }) {
    return PerhitunganAPI.getDapils(provinceCode, regencyCode)
      .then(resp => resp.dapils)
      .then(dapils => dapils.map(it => ({ ...it, provinceCode, regencyCode, name: it.nama, code: it.id })))
      .then(dapils => ctx.commit('setDapils', { dapils }))
  },
  getCandidates(ctx, { dapilId }) {
    return PerhitunganAPI.getCandidates(dapilId)
      .then(candidates => candidates.map(it => ({ ...it, dapilId })))
      .then(candidates => ctx.commit('setCandidates', { candidates }))
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
  dapil: (state) => (dapilId) => state.dapils[dapilId],

  candidates: (state) => (dapilId) => Object.values(state.candidates)
    .filter(it => it.dapilId === dapilId),
  candidate: (state) => (candidateId) => state.candidate[candidateId]
}
