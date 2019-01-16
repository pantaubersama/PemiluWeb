import types from '../mutations.js'
import servicePendidikanPolitik from '@/services/api/modules/pendidikan-politik'

const state = {
  questions: []
}

const getters = {}

const actions = {
  fetchQuestions({ commit, state }, payload) {
    const savedQuestions = [...state.questions]
    servicePendidikanPolitik
      .fetchQuestions(payload)
      .then(response => commit(types.SUCCESS_QUESTIONS, response.questions))
      .catch(() => commit(types.ERROR_QUESTIONS, { savedQuestions }))
  },
  postReport({ commit }, payload) {
    servicePendidikanPolitik
      .postReport(payload)
      .then(response => commit(types.SUCCESS_REPORT, response))
      .catch(() => commit(types.ERROR_REPORT))
  }
}

const mutations = {
  [types.SUCCESS_QUESTIONS](state, payload) {
    state.questions = payload
  },
  [types.ERROR_QUESTIONS](state, { savedQuestions }) {
    state.questions = savedQuestions
  },
  [types.SUCCESS_REPORT](state, payload) {},
  [types.ERROR_REPORT](state) {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
