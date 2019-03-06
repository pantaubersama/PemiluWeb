export const namespaced = true
export const state = {
  showLottie: false,
  showLottieTanya: false,
  showLottieJp: false,
  showLottieNotif: false
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
  showLottieNotif(state) {
    state.showLottieNotif = true
  },
  hideLottie(state) {
    state.showLottie = false
  },
  hideLottieUser(state){
    state.showLottieTanya = false
    state.showLottieJp = false
  },
  hideLottieNotif(state){
    state.showLottieNotif = false
  }
}
