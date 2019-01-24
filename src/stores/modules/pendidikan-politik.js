import types from '../mutations.js'
import servicePendidikanPolitik from '@/services/api/modules/pendidikan-politik'

const state = {
  questions: []
}

const getters = {}

const actions = {
  fetchQuestions({
    commit,
    state
  }, payload) {
    const savedQuestions = [...state.questions]
    servicePendidikanPolitik
      .fetchQuestions(payload)
      .then(response => commit(types.SUCCESS_QUESTIONS, response.questions))
      .catch(() => commit(types.ERROR_QUESTIONS, {
        savedQuestions
      }))
  },
  postReport({
    commit
  }, payload) {
    servicePendidikanPolitik
      .postReport(payload)
      .then(response => commit(types.SUCCESS_REPORT, response))
      .catch(() => commit(types.ERROR_REPORT))
  },
  vote({
    commit
  }, id) {
    servicePendidikanPolitik
      .vote(id)
      .then(() => commit(types.SUCCESS_VOTE, id))
      .catch(() => commit(types.ERROR_VOTE))
  },
  addQuestion(ctx, question) {
    ctx.commit(types.ADD_QUESTION, question)
  }
}

const mutations = {
  [types.SUCCESS_QUESTIONS](state, payload) {
    state.questions = payload
  },
  [types.ERROR_QUESTIONS](state, {
    savedQuestions
  }) {
    state.questions = savedQuestions
  },
  [types.SUCCESS_REPORT](state, payload) {},
  [types.ERROR_REPORT](state) {},
  [types.SUCCESS_VOTE](state, id) {
    const index = state.questions.findIndex(question => question.id === id)
    let question = state.questions.find(question => question.id === id)
    question.is_liked = true
    question.like_count += 1

    state.questions[index] = question
  },
  [types.ERROR_VOTE](state) {},
  [types.ADD_QUESTION](state, question) {
    state.questions = [
      question,
      ...state.questions
    ]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
