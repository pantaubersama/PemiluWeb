import {
  vueAuth
} from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL = process.env.API_BASE_URL || 'https://staging-auth.pantaubersama.com'
const PEMILU_URL = process.env.API_PEMILU_BASE_URL || 'https://staging-pemilu.pantaubersama.com'
const api = Api(BASE_URL, () => vueAuth.getToken())
const apiPemilu = Api(PEMILU_URL, () => vueAuth.getToken())

/* eslint-disable camelcase */
export const people = ({
  q,
  page = 1,
  per_page = 100
} = {}) => api
  .get('/v1/users', {
    params: {
      page,
      per_page,
      q
    }
  })
  .then(resp => resp.data.data.users)

export const janjiPolitiks = ({
  q,
  cluster_id,
  filter_by = 'user_verified_all',
  page = 1,
  per_page = 20
}) => {
  return apiPemilu
    .get('/linimasa/v1/janji_politiks', {
      params: {
        q,
        cluster_id,
        filter_by,
        page,
        per_page
      }
    })
    .then(resp => resp.data.data.janji_politiks)
}

export const questions = ({
  page = 1,
  per_page = 100,
  q,
  o = 'and',
  m = 'word_start',
  order_by = 'created_at',
  direction = 'desc',
  filter_by = 'user_verified_all'
}) => {
  return apiPemilu
    .get('pendidikan_politik/v1/questions', {
      params: {
        page,
        direction,
        per_page,
        q,
        o,
        m,
        order_by,
        filter_by
      }
    })
    .then(response => response.data.data.questions)
}
/* eslint-disable */
