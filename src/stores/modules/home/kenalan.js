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
}

// mutations
const mutations = {
  getHomeKenalan(state, data) {
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
