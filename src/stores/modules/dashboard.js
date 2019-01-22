import types from '../mutations.js'
import serviceDashboard from '@/services/api/modules/dashboard'

const state = {
  clusters: []
}

const getters = {
  clusterNames: state => state.clusters.map(cluster => cluster.name)
}

const actions = {
  fetchClusters({ commit, state }, payload) {
    const savedClusters = [...state.clusters]
    return serviceDashboard
      .fetchClusters(payload)
      .then(response => commit(types.SUCCESS_CLUSTERS, response.clusters))
      .catch(() => commit(types.ERROR_CLUSTERS, { savedClusters }))
  }
}

const mutations = {
  [types.SUCCESS_CLUSTERS](state, payload) {
    state.clusters = payload
  },
  [types.ERROR_CLUSTERS](state, { savedClusters }) {
    // rollback to the data saved before sending the request
    state.clusters = savedClusters
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
