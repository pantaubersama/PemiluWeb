export const namespaced = true
export const state = {
  showLottie: false,
  showLottieTanya: false
}

export const mutations = {
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
