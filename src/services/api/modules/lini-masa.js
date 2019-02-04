import axios from 'axios'
import { vueAuth } from '@/services/symbolic'

const PREFIX = 'linimasa'
const BASE_URL = process.env.API_PEMILU_BASE_URL
  ? process.env.API_PEMILU_BASE_URL
  : 'https://staging-pemilu.pantaubersama.com'
const TOKEN = vueAuth.getToken()

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : ''
  }
})

export const setToken = token => {
  httpClient.defaults.headers['Authorization'] = `Bearer ${token}`
}

const fetchBannerInfo = (page_name = 'pilpres') => {
  return httpClient
    .get(`${PREFIX}/v1/banner_infos`, {
      params: {
        page_name
      }
    })
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}

const fetchBannerInfoShow = (page_name = 'pilpres') => {
  return httpClient
    .get(`${PREFIX}/v1/banner_infos/show`, {
      params: {
        page_name
      }
    })
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}

const fetchJanjiPolitik = ({
  query,
  clusterId,
  filterBy = 'user_verified_all',
  page = 1,
  perPage = 20
}) => {
  return httpClient
    .get(`${PREFIX}/v1/janji_politiks`, {
      params: {
        page,
        q: query,
        per_page: perPage,
        cluster_id: clusterId,
        filter_by: filterBy
      }
    })
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}

const deleteJanjiPolitik = id => {
  return httpClient
    .delete(`${PREFIX}/v1/janji_politiks`, { data: { id } })
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}

export const fetchFeedsPilpres = ({
  filterBy = 'team_all',
  query = '',
  page = 1,
  perPage = 100
}) => {
  return httpClient
    .get(`${PREFIX}/v1/feeds/pilpres`, {
      params: {
        page,
        q: query,
        filter_by: filterBy,
        per_page: perPage
      }
    })
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}

const postJanjiPolitik = ({ title, body, image }) => {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('body', body)
  formData.append('image', image)

  return httpClient
    .post(`${PREFIX}/v1/janji_politiks`, formData)
    .then(response => Promise.resolve(response.data.data))
    .catch(error => Promise.reject(error))
}

const services = {
  fetchBannerInfo,
  fetchBannerInfoShow,
  fetchJanjiPolitik,
  fetchFeedsPilpres,
  postJanjiPolitik,
  deleteJanjiPolitik
}

export default services
