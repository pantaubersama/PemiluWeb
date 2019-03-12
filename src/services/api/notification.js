import { http } from '@/services/http'

export default {
  getNotification(page, perPage, cb, errorCb) {
    // TODO: Add fallback incase of env API_NOTIFICATION_URL are undefined
    http.api('get', process.env.API_NOTIFICATION_URL + '/dashboard/v1/notifications', {
      page: page,
      per_page: perPage
    }, cb, errorCb)
  }
}
