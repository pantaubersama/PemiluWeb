import { http } from '@/services/http'

export default {
  getNotification(page, perPage, cb, errorCb) {
    http.base_url = process.env.API_NOTIFICATION_URL ? process.env.API_NOTIFICATION_URL : 'https://staging-notification.pantaubersama.com'
    http.api('get', http.base_url + '/dashboard/v1/notifications', {
      page: page,
      per_page: perPage
    }, cb, errorCb)
  }
}
