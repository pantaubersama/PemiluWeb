import axios from 'axios'
import { vueAuth } from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL = process.env.API_WORD_STADIUM_URL || 'https://staging-service.wordstadium.com/word_stadium'
const api = Api(BASE_URL, () => vueAuth.getToken())

export const WordstadiumType = {
  ALL: null,
  CHALLENGE: 'challenge',
  COMING_SOON: 'coming_soon',
  LIVE_NOW: 'live_now',
  DONE: 'done'
}

export const createOpenChallenge = (data) => api
  .post('/v1/challenges/open', data)
  .then((res) => res.data.data)

export const createDirectChallenge = (data) => api
  .post('/v1/challenges/direct', data)
  .then(res => res.data.data)

export const getChallenge = (type = WordstadiumType.CHALLENGE) => api
  .get('/v1/challenges/all', { params: { progress: type } })
  .then(resp => resp.data.data)

export const getMeChallenge = (type = WordstadiumType.CHALLENGE) => api
  .get('/v1/challenges/me', { params: { progress: type } })
  .then(resp => resp.data.data)

export const getAllChallenge = () => axios
  .all([
    getChallenge(WordstadiumType.CHALLENGE),
    getChallenge(WordstadiumType.COMING_SOON),
    getChallenge(WordstadiumType.LIVE_NOW),
    getChallenge(WordstadiumType.DONE)
  ])
  .then(axios.spread((challenge, comingSoon, liveNow, done) => Promise.resolve([
    ...challenge.challenges,
    ...comingSoon.challenges,
    ...liveNow.challenges,
    ...done.challenges
  ])))

export const getMeAllChallenge = () => axios
  .all([
    getMeChallenge(WordstadiumType.CHALLENGE),
    getMeChallenge(WordstadiumType.COMING_SOON),
    getMeChallenge(WordstadiumType.LIVE_NOW),
    getMeChallenge(WordstadiumType.DONE)
  ])
  .then(axios.spread((challenge, comingSoon, liveNow, done) => Promise.resolve([
    ...challenge.challenges,
    ...comingSoon.challenges,
    ...liveNow.challenges,
    ...done.challenges
  ])))
export const getPrivateChallenge = (type = WordstadiumType.CHALLENGE) => api
  .get('/v1/challenges/me', { params: { progress: type } })
  .then(resp => resp.data.data)
