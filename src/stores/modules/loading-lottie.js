// initial state
const state = {
  isAnimating: false
}

// actions
const actions = {

}

// mutations
const mutations = {
  playLoading(state) {
    state.isAnimating = true
  },
  stopLoading(state) {
    state.isAnimating = false
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
