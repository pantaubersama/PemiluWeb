import {
  vueAuth
} from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL = process.env.API_BASE_URL || 'https://staging-auth.pantaubersama.com'
const PEMILU_URL = process.env.API_PEMILU_BASE_URL || 'https://staging-pemilu.pantaubersama.com'
const api = Api(BASE_URL, () => vueAuth.getToken())
const pemilu = Api(PEMILU_URL, () => vueAuth.getToken())

/* eslint-disable-next-line camelcase */
export const people = ({ q, page = 1, per_page = 100, filter_by = 'verified_all' } = {}) => api
  .get('/v1/users', {
    params: {
      page,
      per_page,
      q,
      filter_by
    }
  })
  .then(resp => resp.data.data.users)

// eslint-disable-next-line camelcase
export const pilpres = ({ q, page = 1, per_page = 100, filter_by = 'team_all' } = {}) => pemilu
  .get('/linimasa/v1/feeds/pilpres', {
    params: { page, per_page, q, filter_by }
  })
  .then(resp => resp.data.data.feeds)

