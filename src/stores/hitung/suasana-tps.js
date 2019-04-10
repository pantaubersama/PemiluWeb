import ApiSuasanaTps from '@/services/api/hitung/suasana-tps'

export const namespaced = true
export const state = {
  suasana_tps:[],
  paginations: {
    page: 1,
    perPage: 6,
    total: 0,
    isLast: false
  },
}
export const actions = {
  suasanaTps({
    commit,
    state
  }, payload) {
    ApiSuasanaTps.suasanaTps(state.paginations.page, state.paginations.perPage, result => {
      commit('getSuasanaTps', result.data.data)
    })
  },
  nextPage({
    commit
  }) {
    commit('nextPage')
  },
  updateSuasanaTps({
    commit,
    state
  }, payload) {
    ApiSuasanaTps.suasanaTps(state.paginations.page, state.paginations.perPage, result => {
      commit('updateSuasanaTps', result.data.data)
    })
  }
}
export const mutations = {
  getSuasanaTps(state, data) {
    state.suasana_tps = data.image
    state.paginations.total = data.meta.pages.total
  },

  nextPage(state) {
    state.paginations.page++
  },
  updateSuasanaTps(state, data) {
    if (data.meta.pages.total == state.paginations.page) {
      state.paginations.isLast = true
    }
    state.suasana_tps.push.apply(state.suasana_tps, data.image)
  }
}
export const getters = {

}
