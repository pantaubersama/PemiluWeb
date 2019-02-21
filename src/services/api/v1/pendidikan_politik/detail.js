import { http } from '@/services/http'

export default {
  getDetailTanya(id, cb, errorCb) {
    http.api('get', process.env.API_PEMILU_BASE_URL + '/pendidikan_politik/v1/questions/' + id, {}, cb, errorCb)
  }
}
