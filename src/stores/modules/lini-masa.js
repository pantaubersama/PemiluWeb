import types from '../mutations.js'
import serviceLiniMasa from '@/services/api/modules/lini-masa'

const state = {
  bannerData: [],
  janjiPolitiks: [],
  feedsPilpres: []
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
  },
  detailFeedPilpres: state => id => {
    if (!id || !state.feedsPilpres) return {}
    return state.feedsPilpres.filter(item => item.id === id).pop()
  }
}

const actions = {
  fetchBannerInfo({ commit, state }, name = 'pilpres') {
    const savedBannerData = [...state.bannerData]
    return serviceLiniMasa
      .fetchBannerInfo(name)
      .then(response =>
        commit(types.SUCCESS_BANNER_INFO, response.banner_infos)
      )
      .catch(() => commit(types.ERROR_BANNER_INFO, { savedBannerData }))
  },
  fetchJanjiPolitik({ commit, state }, payload, isFilter = false) {
    if (isFilter) commit(types.CLEAR_JANJI_POLITIK)
    const savedJanjiPolitiks = [...state.janjiPolitiks]
    return serviceLiniMasa
      .fetchJanjiPolitik(payload)
      .then(response =>
        commit(types.SUCCESS_JANJI_POLITIK, response.janji_politiks)
      )
      .catch(() => commit(types.ERROR_JANJI_POLITIK, { savedJanjiPolitiks }))
  },
  fetchFeedsPilpres({ commit, state }, payload, isFilter = false) {
    if (isFilter) commit(types.CLEAR_FEEDS_PILPRES)
    const savedFeedsPilpres = [...state.feedsPilpres]
    return serviceLiniMasa
      .fetchFeedsPilpres(payload)
      .then(response => commit(types.SUCCESS_FEEDS_PILPRES, response.feeds))
      .catch(() => commit(types.ERROR_FEEDS_PILPRES, { savedFeedsPilpres }))
  },
  postJanjiPolitik({ commit }, payload) {
    return serviceLiniMasa
      .postJanjiPolitik(payload)
      .then(response =>
        commit(types.SUCCESS_POST_JANJI_POLITIK, response.janji_politik)
      )
      .catch(() => commit(types.ERROR_POST_JANJI_POLITIK, {}))
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
  [types.CLEAR_JANJI_POLITIK](state) {
    state.janjiPolitiks.removeAll()
  },
  [types.ERROR_JANJI_POLITIK](state, { savedJanjiPolitiks }) {
    // rollback to the data saved before sending the request
    state.janjiPolitiks = savedJanjiPolitiks
  },
  [types.SUCCESS_FEEDS_PILPRES](state, payload) {
    state.feedsPilpres = payload
  },
  [types.CLEAR_FEEDS_PILPRES](state) {
    state.feedsPilpres.removeAll()
  },
  [types.ERROR_FEEDS_PILPRES](state, { savedFeedsPilpres }) {
    // rollback to the data saved before sending the request
    state.feedsPilpres = savedFeedsPilpres
  },
  [types.SUCCESS_POST_JANJI_POLITIK](state, payload) {},
  [types.ERROR_POST_JANJI_POLITIK](state, error) {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
