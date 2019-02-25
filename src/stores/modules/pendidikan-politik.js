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
    groupName: null,
    userId: null
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
      .then(() => {
        this.dispatch('PendidikanPolitikDetail/increaseVote', id, { root: true })
        commit(types.SUCCESS_VOTE, id)
      })
      .catch(() => commit(types.ERROR_VOTE))
  },
  unVote({
    commit
  }, id) {
    PenpolAPI.unVote(id)
      .then(() => {
        this.dispatch('PendidikanPolitikDetail/decreaseVote', id, { root: true })
        commit(types.SUCCESS_UNVOTE, id)
      })
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
    const quizType = quiz.participation_status
    if (quizType === 'not_participating') {
      ctx.commit('checkoutQuiz', {
        id: quizId,
        status: quiz.participation_status,
        currentStatus: 'in_progress'
      })
    }
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
    var selectedData = null
    var groupName = null
    var percentage = 0
    var groupAvatar = null
    var image = null
    var id = null
    if (resp.teams[0].percentage === 50.0) {
      selectedData = resp.teams[Math.floor(resp.teams.length * Math.random())]
    } else {
      selectedData = resp.teams.find(item => item.percentage === Math.max(...resp.teams.map(function(d) { return d.percentage })))
    }
    if (selectedData != null) {
      percentage = Math.ceil(selectedData.percentage)
      groupAvatar = selectedData.team.avatar
      groupName = selectedData.team.title
    }
    if (resp.quiz_preference.image_result != null) {
      image = resp.quiz_preference.image_result.url
    }

    if (resp.quiz_preference.id != null) {
      id = resp.quiz_preference.id
    }
    const totalQuiz = resp.meta.quizzes.total
    const fullName = resp.user.full_name
    const finishedQuiz = resp.meta.quizzes.finished
    const userId = resp.user.id
    ctx.commit('setTotalKecenderungan', {
      id,
      finishedQuiz,
      totalQuiz,
      groupName,
      percentage,
      fullName,
      groupAvatar,
      image,
      userId
    })
  },

  getQuizResult({
    commit
  }, quizId) {
    PenpolAPI.getQuizResult(quizId).then(response =>
      commit('setQuizResult', response)
    )
  },
  getQuizResultDetail({
    commit
  }, quizParticipationId) {
    PenpolAPI.getQuizResultDetail(quizParticipationId).then(response =>
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
    state.questions = payload.sort(function (a, b) {
      return b.like_count - a.like_count
    })
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

    if (question) {
      question.is_liked = true
      question.like_count += 1

      state.questions[index] = question
    }
  },
  [types.SUCCESS_UNVOTE](state, id) {
    const index = state.questions.findIndex(question => question.id === id)
    let question = state.questions.find(question => question.id === id)
    if (question) {
      question.is_liked = false
      question.like_count -= 1

      state.questions[index] = question
    }
  },
  [types.ERROR_VOTE](state) {},
  [types.ADD_QUESTION](state, question) {
    state.questions = [question, ...state.questions]
  }
}
