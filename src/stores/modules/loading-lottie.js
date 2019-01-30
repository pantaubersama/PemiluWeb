// initial state
const state = {
  loadingAnimating: false
}

// actions
const actions = {

}

// mutations
const mutations = {
  playLoading(state) {
    state.loadingAnimating = true
  },
  stopLoading(state) {
    state.loadingAnimating = false
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
