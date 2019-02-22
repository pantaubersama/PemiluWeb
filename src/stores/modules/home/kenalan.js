import ApiHomeKenalan from '@/services/api/home/kenalan'

export const namespaced = true
export const state = {
  feedsKenalan: []
}


export const actions = {
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
  },
}


export const mutations = {
  getHomeKenalan(state, data) {
    state.feedsKenalan = data.kenalans
  },
  updateKenalan(state, data) {
    state.feedsKenalan = data.kenalans
  }
}
