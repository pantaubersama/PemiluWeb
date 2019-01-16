import axios from 'axios'
import { vueAuth } from '@/services/symbolic'

const PREFIX = 'pendidikan_politik'
const BASE_URL = process.env.API_PEMILU_BASE_URL
  ? process.env.API_PEMILU_BASE_URL
  : 'https://staging-pemilu.pantaubersama.com/'

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${vueAuth.getToken()}` }
})

const postReport = (id, className = 'Question') => {
  return httpClient
    .post(`${PREFIX}/v1/reports`, {
      id,
      class_name: className
    })
    .then(response => response.data.data)
    .catch(error => error)
}

const services = {
  postReport
}

export default services
