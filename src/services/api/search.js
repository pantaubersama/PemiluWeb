import {
  vueAuth
} from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL = process.env.API_BASE_URL || 'https://staging-auth.pantaubersama.com'
const api = Api(BASE_URL, () => vueAuth.getToken())

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
/* eslint-disable */
