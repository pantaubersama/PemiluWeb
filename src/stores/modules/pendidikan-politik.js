import Vue from 'vue'
import types from '../mutations.js'
import * as PenpolAPI from '@/services/api/modules/pendidikan-politik'

const QuizType = PenpolAPI.QuizType

export const state = {
  questions: [],
  quizzes: [],
  quizzesNotParticipated: [],
  quizzesInProgress: [],
  quizzesFinised: [],
  quizQuestions: {},
  quizzesResult: {},
  totalKecenderungan: {
    totalQuiz: 0,
    finishedQuiz: 0,
    percentage: 0,
    groupName: null
  },
  quizSummary: {}
}

export const getters = {
  quizzes(state) {
    return [
      ...state.quizzesNotParticipated,
      ...state.quizzesInProgress,
      ...state.quizzesFinised
    ]
  },
  detailPendidikanPolitik: state => id => {
    if (!id || !state.questions) return {}
    return state.questions.filter(item => item.id === id).pop()
  },
  questionsForQuizId: state => quizId => state.quizQuestions[quizId],
  questionsValid: state => quizId => {
    if (!state.quizQuestions || !state.quizQuestions[quizId]) return true
    return state.quizQuestions[quizId].find(quiz => quiz.answered === false)
  },
  quizById: (state, getters) => quizId =>
    getters.quizzes.find(it => it.id === this.quizId) || {}
}

export const actions = {
  fetchQuestions({
    commit,
    state
  }, payload) {
    const savedQuestions = [...state.questions]
    PenpolAPI.fetchQuestions(payload)
      .then(response => commit(types.SUCCESS_QUESTIONS, response.questions))
      .catch(() =>
        commit(types.ERROR_QUESTIONS, {
          savedQuestions
        })
      )
  },
  postReport({
    commit
  }, payload) {
    return PenpolAPI.postReport(payload)
  },
  vote({
    commit
  }, id) {
    PenpolAPI.vote(id)
      .then(() => commit(types.SUCCESS_VOTE, id))
      .catch(() => commit(types.ERROR_VOTE))
  },
  addQuestion(ctx, question) {
    ctx.commit(types.ADD_QUESTION, question)
  },
  async listAllQuiz(ctx, {
    page = 1,
    perPage = 100
  } = {}) {
    const resp = await PenpolAPI.listQuizz(QuizType.ALL, page, perPage)
    const notParticipated = resp.filter(
      it => it.participation_status === 'not_participating'
    )
    const inProgress = resp.filter(
      it => it.participation_status === 'in_progress'
    )
    const finished = resp.filter(it => it.participation_status === 'finished')
    ctx.commit('setNotParticipatedQuiz', notParticipated)
    ctx.commit('setInProgressQuiz', inProgress)
    ctx.commit('setFinishedQuiz', finished)
    return Promise.resolve([...notParticipated, ...inProgress, ...finished])
  },
  listFilterQuiz(ctx, {
    type = QuizType.ALL,
    page = 1,
    perPage = 100
  } = {}) {
    return PenpolAPI.listQuizz(type, page, perPage).then(response => {
      ctx.commit('setQuizzes', response.quizzes)
    })
  },
  async getQuizDetail(ctx, {
    quizId
  }) {
    const quiz = await PenpolAPI.getQuizDetail(quizId)
    ctx.commit('setQuizDetail', {
      quizId,
      quiz
    })
    return Promise.resolve(quiz)
  },
  async getQuizQuestions(ctx, {
    quiz,
    quizId
  }) {
    const detail = await PenpolAPI.getQuizQuestions(quizId)
    const questions = [
      ...detail.answered_questions.map(it => {
        it.answered = true
        return it
      }),
      ...detail.questions.map(it => {
        it.answered = false
        return it
      })
    ]
    if (quiz != null) {
      quiz.questions = questions
    }
    ctx.commit('setQuizQuestions', {
      quizId,
      questions
    })
  },
  async answerQuestion(
    ctx, {
      quizId,
      questionId,
      answerId,
      status = 'in_progress',
      isLast = false
    }
  ) {
    const quiz = await PenpolAPI.answerQuestion(quizId, questionId, answerId)
    ctx.commit('answeredQuestion', {
      quizId,
      questionId,
      answerId
    })
    if (isLast) {
      ctx.commit('checkoutQuiz', {
        id: quizId,
        status: status,
        currentStatus: quiz.quiz_participation.status
      })
    }
  },
  async getTotalKecenderungan(ctx) {
    const resp = await PenpolAPI.getTotalKecenderungan()
    const selectedData = resp.teams
      .sort((a, b) => b.percentage - a.percentage) // sort from the high to the low percentage
      .slice()
      .pop() // get the first value
    const percentage = selectedData.percentage
    const totalQuiz = resp.meta.quizzes.total
    const finishedQuiz = resp.meta.quizzes.finished
    const groupName = selectedData.team.title
    ctx.commit('setTotalKecenderungan', {
      finishedQuiz,
      totalQuiz,
      groupName,
      percentage
    })
  },
  getQuizResult({
    commit
  }, quizId) {
    PenpolAPI.getQuizResult(quizId).then(response =>
      commit('setQuizResult', response)
    )
  },
  getQuizSummary({
    commit
  }, quizId) {
    PenpolAPI.getQuizSummary(quizId).then(response =>
      commit('setQuizSummary', response)
    )
  }
}

export const mutations = {
  setNotParticipatedQuiz(state, quiz) {
    state.quizzesNotParticipated = quiz
  },
  setInProgressQuiz(state, quiz) {
    state.quizzesInProgress = quiz
  },
  setFinishedQuiz(state, quiz) {
    state.quizzesFinised = quiz
  },
  answeredQuestion(state, {
    quizId,
    questionId,
    answerId
  }) {
    const questions = state.quizQuestions[quizId]
    const index = questions.findIndex(question => question.id === questionId)
    let stateQuestions = questions.find(question => question.id === questionId)
    stateQuestions.answered = true

    state.quizQuestions[index] = stateQuestions
  },
  checkoutQuiz(state, {
    id,
    status,
    currentStatus
  }) {
    const listQuiz = (() => {
      switch (status) {
        case 'not_participating':
          return state.quizzesNotParticipated
        case 'in_progress':
          return state.quizzesInProgress
      }
    })()
    const listTargetQuiz = (() => {
      switch (currentStatus) {
        case 'in_progress':
          return state.quizzesInProgress
        case 'finished':
          return state.quizzesFinised
      }
    })()
    const index = listQuiz.findIndex(quiz => quiz.id === id)
    let quiz = listQuiz.find(quiz => quiz.id === id)
    quiz.participation_status = currentStatus
    listTargetQuiz.unshift(quiz)
    listQuiz.splice(index, 1)
  },
  setQuizQuestions(state, {
    quizId,
    questions
  }) {
    Vue.set(state.quizQuestions, quizId, questions)
  },
  setQuizDetail(state, {
    quizId,
    quiz
  }) {
    const quizType = quiz.participation_status
    const listQuiz = (() => {
      switch (quizType) {
        case 'not_participating':
          return state.quizzesNotParticipated
        case 'in_progress':
          return state.quizzesInProgress
        case 'finished':
          return state.quizzesFinised
      }
    })()
    const index = listQuiz.findIndex(it => it.id === quizId)
    if (index === -1) listQuiz.push(quiz)
    else Vue.set(listQuiz, index, quiz)
  },
  setTotalKecenderungan(state, payload) {
    Vue.set(state, 'totalKecenderungan', payload)
  },
  setQuizResult(state, result) {
    state.quizzesResult = result
  },
  setQuizSummary(state, result) {
    state.quizSummary = result
  },
  setQuizzes(state, result) {
    state.quizzes = result
  },
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
    state.questions = [question, ...state.questions]
  }
}
