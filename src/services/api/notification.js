import { http } from '@/services/http'

export default {
  getNotification(page, perPage, cb, errorCb) {
    http.api('get', process.env.API_NOTIFICATION_URL + '/dashboard/v1/notifications', {
      page: page,
      per_page: perPage
    }, cb, errorCb)
  }
}
