export const namespaced = true
export const state = {
  showLottie: false,
  showLottieTanya: false,
  showLottieJp: false
}

export const mutations = {
  showLottie(state) {
    state.showLottie = true
  },
  showLottieTanya(state) {
    state.showLottieTanya = true
  },
  showLottieJp(state) {
    state.showLottieJp = true
  },
  hideLottie(state) {
    state.showLottie = false
  }
}
