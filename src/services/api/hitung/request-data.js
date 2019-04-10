import {
  http
} from '@/services/http'

export default {
  requestData(name, organization, email, phone, necessity, cb, errorCb) {
    http.base_url = process.env.API_PEMILU_BASE_URL ? process.env.API_PEMILU_BASE_URL : 'https://staging-pemilu.pantaubersama.com'
    http.api('post', http.base_url + '/hitung/v1/unduh_data/request', {
      name: name,
      organization: organization,
      email: email,
      phone: phone,
      necessity: necessity
    }, cb, errorCb)
  }
}
