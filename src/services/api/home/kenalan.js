import {
  http
} from '@/services/http'

export default {
  homeKenalan(cb, errorCb) {
    http.base_url = process.env.API_PEMILU_URL ? process.env.API_PEMILU_URL : 'https://staging-pemilu.pantaubersama.com/'
    http.api('get', http.base_url + 'linimasa/v1/kenalans', {}, cb, errorCb)
  }
}
