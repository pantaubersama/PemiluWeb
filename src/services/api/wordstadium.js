import axios from 'axios'
import { vueAuth } from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL = process.env.API_WORD_STADIUM_URL || 'https://staging-service.wordstadium.com/word_stadium'
const api = Api(BASE_URL, () => vueAuth.getToken())

export const WordstadiumType = {
  ALL: null,
  ONGOING: 'ongoing',
  COMING_SOON: 'coming_soon',
  LIVE_NOW: 'live_now',
  DONE: 'done'
}

export const getChallenge = (type = 'live_now') => api
  .get('/v1/challenges/all', { params: { progress: type } })
  .then(resp => resp.data.data)

export const getMeChallenge = (type = 'live_now') => api
  .get('/v1/challenges/me', { params: { progress: type } })
  .then(resp => resp.data.data)

export const getAllChallenge = () => axios
  .all([
    getChallenge(WordstadiumType.ONGOING),
    getChallenge(WordstadiumType.COMING_SOON),
    getChallenge(WordstadiumType.LIVE_NOW),
    getChallenge(WordstadiumType.DONE)
  ])
  .then(axios.spread((ongoing, comingSoon, liveNow, done) => Promise.resolve([
    ...ongoing.challenges,
    ...comingSoon.challenges,
    ...liveNow.challenges,
    ...done.challenges
  ])))

export const getMeAllChallenge = () => axios
  .all([
    getMeChallenge(WordstadiumType.ONGOING),
    getMeChallenge(WordstadiumType.COMING_SOON),
    getMeChallenge(WordstadiumType.LIVE_NOW),
    getMeChallenge(WordstadiumType.DONE)
  ])
  .then(axios.spread((ongoing, comingSoon, liveNow, done) => Promise.resolve([
    ...ongoing.challenges,
    ...comingSoon.challenges,
    ...liveNow.challenges,
    ...done.challenges
  ])))
export const getPrivateChallenge = (type = 'live_now') => api
  .get('/v1/challenges/me', { params: { progress: type } })
  .then(resp => resp.data.data)
