import ApiHomeKenalan from '@/services/api/home/kenalan'
// initial state
const state = {
  feedsKenalan: []
}

// actions
const actions = {
  homeKenalan({
    commit,
    state
  }, payload) {
    commit('loadingLottie/playLoading', {}, {
      root: true
    })
    ApiHomeKenalan.homeKenalan(result => {
      commit('loadingLottie/stopLoading', {}, {
        root: true
      })
      commit('getHomeKenalan', result.data.data)
    })
  },
  updateKenalan({
    commit,
    state
  }, payload) {
    ApiHomeKenalan.updateKenalan(payload.id, result => {
      commit('updateKenalan', result.data.data)
    })
  }
}

// mutations
const mutations = {
  getHomeKenalan(state, data) {
    var filtered = data.kenalans.filter(function(obj) {
      return obj.id !== '2022ad13-d602-4eba-9cf1-9ef2ea0e158d' && obj.id !== 'c3fded37-5b4b-4a81-aee7-ee24d845b5e8'
    })
    state.feedsKenalan = filtered
  },
  updateKenalan(state, data) {
    state.feedsKenalan = data.kenalans
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
