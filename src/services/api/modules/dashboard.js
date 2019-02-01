import axios from 'axios'
import { vueAuth } from '@/services/symbolic'

const PREFIX = 'dashboard'
const BASE_URL = process.env.API_BASE_URL
  ? process.env.API_BASE_URL
  : 'https://staging-auth.pantaubersama.com'
const TOKEN = vueAuth.getToken()

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : ''
  }
})

const fetchClusters = ({
  query,
  status,
  filterBy,
  filterValue = '',
  page = 1,
  perPage = 5
}) => {
  return httpClient
    .get(`${PREFIX}/v1/clusters`, {
      params: {
        page,
        status,
        q: query,
        per_page: perPage,
        filter_by: filterBy,
        filter_value: filterValue
      }
    })
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}

const services = {
  fetchClusters
}

export default services
