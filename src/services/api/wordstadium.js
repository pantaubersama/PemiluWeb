import {vueAuth} from '@/services/symbolic'
import Api from '@/servives/api/base'

const BASE_URL = process.env.API_BASE_URL || 'https://staging-servive.wordstadium.com/'

const api = Api(BASE_URL, () => vueAuth.getToken())

export const getAllChallenge = (type = 'live_now') => api
  .get('/v1/challenges/all')
  .then(resp => resp.data.data)
