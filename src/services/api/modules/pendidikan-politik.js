import axios from 'axios'
import {
  vueAuth
} from '@/services/symbolic'

const PREFIX = 'pendidikan_politik'
const BASE_URL = process.env.API_PEMILU_BASE_URL
  ? process.env.API_PEMILU_BASE_URL
  : 'https://staging-pemilu.pantaubersama.com'

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${vueAuth.getToken()}`
  }
})

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
  return httpClient
    .get(`${PREFIX}/v1/questions`, {
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
    .then(response => response.data.data)
    .catch(error => error)
}

const postReport = (id, className = 'Question') => {
  return httpClient
    .post(`${PREFIX}/v1/reports`, {
      id,
      class_name: className
    })
    .then(response => response.data.data)
    .catch(error => error)
}

const vote = (id, className = 'Question') => {
  return httpClient
    .post(`${PREFIX}/v1/votes`, {
      id,
      class_name: className
    })
    .then(response => response.data.data)
    .catch(error => error)
}

const services = {
  fetchQuestions,
  postReport,
  vote
}

export default services
