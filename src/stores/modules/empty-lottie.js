// initial state
const state = {
  showLottie: false,
  showLottieTanya: false
}

// actions
const actions = {

}

// mutations
const mutations = {
  showLottie(state) {
    state.showLottie = true
  },
  showLottieTanya(state) {
    state.showLottieTanya = true
  },
  hideLottie(state) {
    state.showLottie = false
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
