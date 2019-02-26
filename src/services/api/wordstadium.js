import axios from 'axios'
import { vueAuth } from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL =
  process.env.API_WORD_STADIUM_URL || 'https://staging-service.wordstadium.com/'

const api = Api(BASE_URL, () => vueAuth.getToken())

export const WordstadiumType = {
  ALL: null,
  ONGOING: 'ongoing',
  COMING_SOON: 'coming_soon',
  LIVE_NOW: 'live_now',
  DONE: 'done'
}

export const getChallenge = (type = 'live_now') => {
  return api
    .get('/word_stadium/v1/challenges/all', {
      params: {
        progress: type
      }
    })
    .then(resp => resp.data.data)
}

export const getAllChallenge = () => {
  return axios
    .all([
      getChallenge(WordstadiumType.ONGOING),
      getChallenge(WordstadiumType.COMING_SOON),
      getChallenge(WordstadiumType.LIVE_NOW),
      getChallenge(WordstadiumType.DONE)
    ])
    .then(
      axios.spread((ongoing, comingSoon, liveNow, done) => {
        return Promise.resolve([
          ...ongoing.challenges,
          ...comingSoon.challenges,
          ...liveNow.challenges,
          ...done.challenges
        ])
      })
    )
}
