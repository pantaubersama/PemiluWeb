import { http } from '@/services/http'

export default {
  getKecenderungan(id, cb, errorCb) {
    http.api('get', process.env.API_PEMILU_BASE_URL + '/pendidikan_politik/v1/quiz_participations/quizzes', { user_id: id }, cb, errorCb)
  }
}
