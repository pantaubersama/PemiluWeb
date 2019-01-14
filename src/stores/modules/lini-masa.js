import types from '../mutations.js'
import serviceLiniMasa from '@/services/api/modules/lini-masa'

const state = {
  bannerData: [],
  janjiPolitiks: []
}

const getters = {
  bannerPilpresData: state => {
    if (!state.bannerData) return {}
    return state.bannerData.filter(item => item.page_name === 'pilpres').pop()
  },
  bannerKuisData: state => {
    if (!state.bannerData) return {}
    return state.bannerData.filter(item => item.page_name === 'kuis').pop()
  },
  bannerTanyaData: state => {
    if (!state.bannerData) return {}
    return state.bannerData.filter(item => item.page_name === 'tanya').pop()
  },
  bannerJanjiPolitikData: state => {
    if (!state.bannerData) return {}
    return state.bannerData
      .filter(item => item.page_name === 'janji politik')
      .pop()
  },
  detailJanjiPolitik: state => id => {
    if (!id || !state.janjiPolitiks) return {}
    return state.janjiPolitiks.filter(item => item.id === id).pop()
  }
}

const actions = {
  fetchBannerInfo({ commit, state }, name = 'pilpres') {
    const savedBannerData = [...state.bannerData]
    serviceLiniMasa
      .fetchBannerInfo(name)
      .then(response =>
        commit(types.SUCCESS_BANNER_INFO, response.banner_infos)
      )
      .catch(() => commit(types.ERROR_BANNER_INFO, { savedBannerData }))
  },
  fetchJanjiPolitik({ commit, state }, payload) {
    const savedJanjiPolitiks = [...state.janjiPolitiks]
    serviceLiniMasa
      .fetchJanjiPolitik(payload)
      .then(response =>
        commit(types.SUCCESS_JANJI_POLITIK, response.janji_politiks)
      )
      .catch(() => commit(types.ERROR_JANJI_POLITIK, { savedJanjiPolitiks }))
  }
}

const mutations = {
  [types.SUCCESS_BANNER_INFO](state, payload) {
    state.bannerData = payload
  },
  [types.ERROR_BANNER_INFO](state, { savedBannerData }) {
    // rollback to the data saved before sending the request
    state.bannerData = savedBannerData
  },
  [types.SUCCESS_JANJI_POLITIK](state, payload) {
    state.janjiPolitiks = payload
  },
  [types.ERROR_JANJI_POLITIK](state, { savedJanjiPolitiks }) {
    // rollback to the data saved before sending the request
    state.janjiPolitiks = savedJanjiPolitiks
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
