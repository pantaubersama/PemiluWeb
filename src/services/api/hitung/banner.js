import {
  http
} from '@/services/http'

export default {
  hitungBanner(cb, errorCb) {
    http.base_url = process.env.API_PEMILU_BASE_URL ? process.env.API_PEMILU_BASE_URL : 'https://staging-pemilu.pantaubersama.com'
    http.api('get', http.base_url + '/linimasa/v1/banner_infos/show?page_name=perhitungan', {}, cb, errorCb)
  }
}
