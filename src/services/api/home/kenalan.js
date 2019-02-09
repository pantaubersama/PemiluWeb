import {
  http
} from '@/services/http'

export default {
  homeKenalan(cb, errorCb) {
    http.base_url = process.env.API_PEMILU_BASE_URL ? process.env.API_PEMILU_BASE_URL : 'https://staging-pemilu.pantaubersama.com'
    http.api('get', http.base_url + '/linimasa/v1/kenalans', {}, cb, errorCb)
  },
  updateKenalan(kenalan_id, cb, errorCb) {
    http.base_url = process.env.API_PEMILU_BASE_URL ? process.env.API_PEMILU_BASE_URL : 'https://staging-pemilu.pantaubersama.com'
    const data = {
      id: kenalan_id,
    }
    http.api('put', http.base_url + '/linimasa/v1/kenalans', data, cb, errorCb)
  }
}
