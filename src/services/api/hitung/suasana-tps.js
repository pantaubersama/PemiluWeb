import {
  http
} from '@/services/http'

export default {
  suasanaTps(page, perPage, cb, errorCb) {
    http.base_url = process.env.API_PEMILU_BASE_URL ? process.env.API_PEMILU_BASE_URL : 'https://staging-pemilu.pantaubersama.com'
    http.api('get', http.base_url + '/hitung/v1/images?image_type=suasana_tps', {
      page: page,
      per_page: perPage
    }, cb, errorCb)
  }
}
