import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import {
  vueAuth
} from '@/services/symbolic'

export const http = {
  base_url: process.env.API_BASE_URL,

  setBaseUrl(b) {
    this.base_url = b
  },

  getBaseUrl() {
    return this.base_url
  },

  request(method, url, data, successCb = null, errorCb = null, headers = {}) {
    axios
      .request({
        method,
        url,
        data: data instanceof FormData ? data : qs.stringify(data),
        params: method === 'get' ? data : {},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...headers
        }
      })
      .then(successCb)
      .catch(errorCb)
  },

  get(url, data, successCb = null, errorCb = null) {
    return this.request(
      'get',
      url + '?' + qs.stringify(data), {},
      successCb,
      errorCb
    )
  },

  post(url, data, successCb = null, errorCb = null, headers = {}) {
    return this.request('post', url, data, successCb, errorCb, headers)
  },

  put(url, data, successCb = null, errorCb = null, headers = {}) {
    return this.request('put', url, data, successCb, errorCb, headers)
  },

  delete(url, data = {}, successCb = null, errorCb = null) {
    return this.request('delete', url, data, successCb, errorCb)
  },

  api(method, url, data = {}, successCb = null, errorCb = null, headers = {}) {
    return this.request(method, url, data, successCb, errorCb, headers)
  },

  init() {
    axios.defaults.baseURL = this.getBaseUrl()

    // Intercept the request to make sure the token is injected into the header.
    axios.interceptors.request.use(config => {
      // we intercept axios request and add authorization header before perform send a request to the server
      config.headers.Authorization = 'Bearer ' + vueAuth.getToken()
      return config
    })

    // Intercept the response and…
    axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        // Also, if we receive / Unauthorized error
        if (error.response.status === 401) {
          router.replace({
            path: '/login',
            query: {
              redirect: window.location.pathname
            }
          })
        }
        return Promise.reject(error)
      }
    )
  }
}
