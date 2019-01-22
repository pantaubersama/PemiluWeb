import {
  http
} from '@/services/http'

export default {
  homeCluster(page, perPage, cb, errorCb) {
    // http.base_url = process.env.API_BASE_URL ? process.env.API_BASE_URL : 'https://staging-pemilu.pantaubersama.com/'
    http.api('get', 'v1/clusters', {
      page: page,
      per_page: perPage
    }, cb, errorCb)
  }
}
