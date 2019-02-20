import { http } from '@/services/http'

export default {
  getDetailJanjiPolitik(id, cb, errorCb) {
    http.api('get', process.env.API_PEMILU_BASE_URL + '/linimasa/v1/janji_politiks/' + id, {}, cb, errorCb, {})
  }
}
