import types from '../mutations.js'
import servicePendidikanPolitik from '@/services/api/modules/pendidikan-politik'

const state = {}

const getters = {}

const actions = {
  postReport({ commit }, payload) {
    servicePendidikanPolitik
      .postReport(payload)
      .then(response => commit(types.SUCCESS_REPORT, response))
      .catch(() => commit(types.ERROR_REPORT))
  }
}

const mutations = {
  [types.SUCCESS_REPORT](state, payload) {},
  [types.ERROR_REPORT](state) {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
