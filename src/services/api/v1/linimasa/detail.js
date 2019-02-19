import { http } from '@/services/http'
http.setBaseUrl(process.env.API_PEMILU_BASE_URL)

export default {
  getDetailJanjiPolitik(id, cb, errorCb) {
    http.api('get', '/linimasa/v1/janji_politiks/' + id, {}, cb, errorCb)
  }
}
