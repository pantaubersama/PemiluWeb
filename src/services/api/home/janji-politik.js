import {
  http
} from '@/services/http'

export default {
  homeJanjiPolitik(page, perPage, cb, errorCb) {
    http.base_url = process.env.API_PEMILU_BASE_URL ? process.env.API_PEMILU_BASE_URL : 'https://staging-pemilu.pantaubersama.com'
    http.api('get', http.base_url + '/linimasa/v1/janji_politiks', {
      page: page,
      per_page: perPage
    }, cb, errorCb)
  }
}
