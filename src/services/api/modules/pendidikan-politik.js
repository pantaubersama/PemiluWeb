import axios from 'axios'
import {
  vueAuth
} from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL = process.env.API_PEMILU_BASE_URL
  ? `${process.env.API_PEMILU_BASE_URL}/pendidikan_politik`
  : 'https://staging-pemilu.pantaubersama.com/pendidikan_politik'

const api = Api(BASE_URL, () => vueAuth.getToken())

export const fetchQuestions = ({
  page = 1,
  perPage = 100,
  query = '',
  operator = 'and',
  match = 'word_start',
  orderBy = 'created_at',
  direction = 'desc',
  filter = 'user_verified_all'
}) => {
  return api
    .get(`/v1/questions`, {
      params: {
        page,
        direction,
        per_page: perPage,
        q: query,
        o: operator,
        m: match,
        order_by: orderBy,
        filter_by: filter
      }
    })
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}
export const getQuestionHistory = (id, page, perPage) =>
  api
    .get(`/v1/users/${id}/questions`, {
      params: {
        page: page,
        per_page: perPage
      }
    })
    .then(resp => resp.data.data)

export const postReport = (id, className = 'Question') => {
  return api
    .post(`/v1/reports`, {
      id,
      class_name: className
    })
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}

export const vote = (id, className = 'Question') => {
  return api
    .post(`/v1/votes`, {
      id,
      class_name: className
    })
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}

export const unVote = (id, className = 'Question') => {
  return api
    .delete(`/v1/votes`, {
      data: {
        id,
        class_name: className
      }
    })
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}

export const postQuestion = body =>
  api
    .post(`/v1/questions`, {
      body
    })
    .then(resp => resp.data.data)

const services = {
  fetchQuestions,
  postReport,
  vote
}

export const QuizType = {
  ALL: null,
  NOT_PARTICIPATED: 0x2,
  IN_PROGRESS: 'in_progress',
  FINISHED: 'finished'
}
const listNotParticipatedQuiz = (page = 1, perPage = 100) =>
  api
    .get(`${BASE_URL}/v1/quizzes`, {
      params: {
        per_page: perPage,
        page
      }
    })
    .then(resp => resp.data.data)
const listParticipatedQuiz = (
  type = QuizType.IN_PROGRESS,
  page = 1,
  perPage = 100
) =>
  api
    .get('/v1/quizzes/participated', {
      params: {
        per_page: perPage,
        page,
        filter_by: type
      }
    })
    .then(resp => resp.data.data)
const listAllQuiz = (type = QuizType.ALL, page = 1, perPage = 100) =>
  axios
    .all([
      listNotParticipatedQuiz(page, perPage),
      listParticipatedQuiz(QuizType.IN_PROGRESS, page, perPage),
      listParticipatedQuiz(QuizType.FINISHED, page, perPage)
    ])
    .then(
      axios.spread(
        (notParticipatedQuizzes, inProgressQuizzes, finishedQuizzes) => {
          return Promise.resolve([
            ...notParticipatedQuizzes.quizzes,
            ...inProgressQuizzes.quizzes,
            ...finishedQuizzes.quizzes
          ])
        }
      )
    )
export const listQuizz = (type = QuizType.ALL, page = 1, perPage = 100) => {
  switch (type) {
    case QuizType.IN_PROGRESS:
    case QuizType.FINISHED:
      return listParticipatedQuiz(type, page, perPage)
    case QuizType.NOT_PARTICIPATED:
      return listNotParticipatedQuiz(page, perPage)
    case QuizType.ALL:
    default:
      return listAllQuiz(type, page, perPage)
  }
}

export const getQuizResult = quizId =>
  api.get(`/v1/quizzes/${quizId}/result`).then(resp => resp.data.data)
export const getQuizResultDetail = quizParticipationId =>
  api.get(`/v1/quiz_participations/${quizParticipationId}/result`).then(resp => resp.data.data)
export const getQuizSummary = quizId =>
  api.get(`/v1/quizzes/${quizId}/summary`).then(resp => resp.data.data)
export const getQuizQuestions = quizId =>
  api.get(`/v1/quizzes/${quizId}/questions`).then(resp => resp.data.data)
export const getQuizDetail = quizId =>
  api.get(`/v1/quizzes/${quizId}`).then(resp => resp.data.data.quiz)
export const answerQuestion = (quizId, questionId, answerId) =>
  api
    .post(`/v1/quizzes/${quizId}/questions`, {
      question_id: questionId,
      answer_id: answerId
    })
    .then(resp => Promise.resolve(resp.data.data))
    .catch(error => Promise.reject(error))

export const getTotalKecenderungan = () =>
  api.get('/v1/me/quizzes').then(resp => resp.data.data)
export default services
