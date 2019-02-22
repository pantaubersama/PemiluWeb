export const namespaced = true

export const state = {
  loadingAnimating: false
}

export const mutations = {
  playLoading(state) {
    state.loadingAnimating = true
  },
  stopLoading(state) {
    state.loadingAnimating = false
  }
}
