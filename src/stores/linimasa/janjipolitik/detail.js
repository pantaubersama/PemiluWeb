import ApiV1LinimasaDetail from '@/services/api/v1/linimasa/detail'

// initial state
const state = {
  janji_politik: {},
  isLoadingJanjiPolitik: true
}

// actions
const actions = {

  getDetailJanjiPolitik({ commit }, payload) {
    ApiV1LinimasaDetail.getDetailJanjiPolitik(payload.id, result => {
      commit('setDetailJanjiPolitik', result.data)
    })
  },

  emptyDetail({ commit }) {
    commit('emptyDetail')
  }

}

// mutations
const mutations = {

  setDetailJanjiPolitik(state, resp) {
    state.janji_politik = resp.data.janji_politik
    state.isLoadingJanjiPolitik = false
  },

  emptyDetail(state) {
    state.janji_politik = {}
  }

}

// getters
const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
