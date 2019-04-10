import axios from 'axios'
import { vueAuth } from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL = process.env.API_WORD_STADIUM_URL || 'https://staging-service.wordstadium.com'
const api = Api(BASE_URL, () => vueAuth.getToken())

export const WordstadiumType = {
  ALL: null,
  CHALLENGE: 'challenge',
  COMING_SOON: 'coming_soon',
  LIVE_NOW: 'live_now',
  DONE: 'done'
}

export const askAsOpponent = (id) => api
  .put('/word_stadium/v1/challenges/open/ask_as_opponent', { id })
  .then(res => res.data.data)

export const accept = (id, audience_id) => api
  .put('/word_stadium/v1/challenges/open/opponent_candidates', { id, audience_id })
  .then(res => res.data.data)

export const promote = (id) => api
  .post(`/word_stadium/v1/challenges/open/promote/${id}`)
  .then(res => res.data.data)

export const reject = (id, reason_rejected) => api
  .put('/word_stadium/v1/challenges/direct/reject', { id, reason_rejected })
  .then(res => res.data.data)

export const approve = (id) => api
  .put('/word_stadium/v1/challenges/direct/approve', { id })
  .then(res => res.data.data)

export const createChallenge = (type, data) => api
  .post(`/word_stadium/v1/challenges/${type}`, data)
  .then(res => res.data.data)

export const getChallenge = (type = WordstadiumType.CHALLENGE) => api
  .get('/word_stadium/v1/challenges/all', { params: { progress: type } })
  .then(resp => resp.data.data.challenges)

export const getMeChallenge = (type = WordstadiumType.CHALLENGE) => api
  .get('/word_stadium/v1/challenges/me', { params: { progress: type } })
  .then(resp => resp.data.data.challenges)

export const getAllChallenge = () => axios
  .all([
    getChallenge(WordstadiumType.CHALLENGE),
    getChallenge(WordstadiumType.COMING_SOON),
    getChallenge(WordstadiumType.LIVE_NOW),
    getChallenge(WordstadiumType.DONE)
  ])
  .then(axios.spread((challenge, comingSoon, liveNow, done) => Promise.resolve([
    ...challenge,
    ...comingSoon,
    ...liveNow,
    ...done
  ])))

export const getMeAllChallenge = () => axios
  .all([
    getMeChallenge(WordstadiumType.CHALLENGE),
    getMeChallenge(WordstadiumType.COMING_SOON),
    getMeChallenge(WordstadiumType.LIVE_NOW),
    getMeChallenge(WordstadiumType.DONE)
  ])
  .then(axios.spread((challenge, comingSoon, liveNow, done) => Promise.resolve([
    ...challenge,
    ...comingSoon,
    ...liveNow,
    ...done
  ])))
export const getPrivateChallenge = (type = WordstadiumType.CHALLENGE) => api
  .get('/word_stadium/v1/challenges/me', { params: { progress: type } })
  .then(resp => resp.data.data.challenges)

export const getChallengeById = (id) => api
  .get(`/word_stadium/v1/challenges/${id}`)
  .then(resp => resp.data.data.challenge)

export const getWords = (challenge_id, page = 1) => api
  .get('/word_stadium/v1/words/fighter', {
    params: {
      challenge_id,
      page,
      per_page: 100
    }
  })
  .then(res => res.data.data.words)

export const getComments = (challenge_id, page = 1) => api
  .get('/word_stadium/v1/words/audience', {
    params: { challenge_id, page, per_page: 100 }
  })
  .then(res => res.data.data.words)
export const clap = (word_id) => api
  .put('/word_stadium/v1/words/clap', { word_id })
  .then(res => res.data.data)
export const postComment = (challenge_id, words) => api
  .post('/word_stadium/v1/words/audience/comment', { challenge_id, words })
  .then(res => res.data.data)
export const postArgument = (challenge_id, words) => api
  .post('/word_stadium/v1/words/fighter/attack', { challenge_id, words })
  .then(res => res.data.data.words)
