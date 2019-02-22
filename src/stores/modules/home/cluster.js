import ApiHomeCluster from '@/services/api/home/cluster'

export const namespaced = true
export const state = {
  paginations: {
    page: 1,
    perPage: 2
  },
  feedsCluster: []
}


export const actions = {
  homeCluster({
    commit,
    state
  }, payload) {
    ApiHomeCluster.homeCluster(state.paginations.page, state.paginations.perPage, result => {
      commit('getHomeCluster', result.data.data)
    })
  }
}

export const mutations = {
  getHomeCluster(state, data) {
    state.feedsCluster = data.clusters
  }
}
