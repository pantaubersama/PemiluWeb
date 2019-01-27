import Vue from 'vue'
import types from '../mutations.js'
import * as PenpolAPI from '@/services/api/modules/pendidikan-politik'

const QuizType = PenpolAPI.QuizType

export const state = {
  questions: [],
  quizzesNotParticipated: [],
  quizzesInProgress: [],
  quizzesFinised: [],
  quizQuestions: {}
}

export const getters = {
  quizzes(state) {
    return [
      ...state.quizzesNotParticipated,
      ...state.quizzesInProgress,
      ...state.quizzesFinised
    ]
  },
  questionsForQuizId: state => quizId => state.quizQuestions[quizId],
  quizById: (state, getters) => quizId => getters.quizzes.find(it => it.id === this.quizId) || {}
}

export const actions = {
  fetchQuestions({
    commit,
    state
  }, payload) {
    const savedQuestions = [...state.questions]
    PenpolAPI
      .fetchQuestions(payload)
      .then(response => commit(types.SUCCESS_QUESTIONS, response.questions))
      .catch(() => commit(types.ERROR_QUESTIONS, {
        savedQuestions
      }))
  },
  postReport({
    commit
  }, payload) {
    PenpolAPI
      .postReport(payload)
      .then(response => commit(types.SUCCESS_REPORT, response))
      .catch(() => commit(types.ERROR_REPORT))
  },
  vote({
    commit
  }, id) {
    PenpolAPI
      .vote(id)
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
    console.log(resp)
    const notParticipated = resp.filter(it => it.participation_status === 'not_participating')
    const inProgress = resp.filter(it => it.participation_status === 'in_progress')
    const finished = resp.filter(it => it.participation_status === 'finished')
    ctx.commit('setNotParticipatedQuiz', notParticipated)
    ctx.commit('setInProgressQuiz', inProgress)
    ctx.commit('setFinishedQuiz', finished)
    return Promise.resolve([
      ...notParticipated,
      ...inProgress,
      ...finished
    ])
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
      ...detail.answered_questions.map((it) => {
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
  async answerQuestion(ctx, {
    quizId,
    questionId,
    answerId
  }) {
    return PenpolAPI.answerQuestion(quizId, questionId, answerId)
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
        case 'not_participated':
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
