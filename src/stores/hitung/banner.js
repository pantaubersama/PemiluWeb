import ApiHitungBanner from '@/services/api/hitung/banner'

export const namespaced = true
export const state = {
  hitung_banner:{},
}
export const actions = {
  hitungBanner({
    commit,
    state
  }, payload) {
    ApiHitungBanner.hitungBanner(result => {
      commit('getHitungBanner', result.data.data)
    })
  },
}
export const mutations = {
  getHitungBanner(state, data) {
    state.hitung_banner = data.banner_info
  },
}
export const getters = {

}
