import { http } from '@/services/http'
http.setBaseUrl(process.env.API_PEMILU_BASE_URL)

export default {
  getDetailTanya(id, cb, errorCb) {
    http.api('get', '/pendidikan_politik/v1/questions/' + id, {}, cb, errorCb)
  }
}
