import {
  http
} from '@/services/http'

export default {
  summaryPresident(cb, errorCb) {
    http.base_url = process.env.API_PEMILU_BASE_URL ? process.env.API_PEMILU_BASE_URL : 'https://staging-pemilu.pantaubersama.com'
    http.api('get', http.base_url + '/hitung/v1/summary/president/show?level=0', {}, cb, errorCb)
  },
  getTimeUpdate(cb, errorCb) {
    http.base_url = process.env.API_PEMILU_BASE_URL ? process.env.API_PEMILU_BASE_URL : 'https://staging-pemilu.pantaubersama.com'
    http.api('get', http.base_url + '/hitung/v1/summary/contribution', {}, cb, errorCb)
  }
}
