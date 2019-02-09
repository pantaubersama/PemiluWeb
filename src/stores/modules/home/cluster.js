import ApiHomeCluster from '@/services/api/home/cluster'
// initial state
const state = {
  paginations: {
    page: 1,
    perPage: 2
  },
  feedsCluster: []
}

// actions
const actions = {
  homeCluster({
    commit,
    state
  }, payload) {
    ApiHomeCluster.homeCluster(state.paginations.page, state.paginations.perPage, result => {
      commit('getHomeCluster', result.data.data)
    })
  }
}

// mutations
const mutations = {
  getHomeCluster(state, data) {
    state.feedsCluster = data.clusters
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
