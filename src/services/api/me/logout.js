import { http } from '@/services/http'
import { vueAuth } from '@/services/symbolic'

export default {
  logout (cb, errorCb) {
    http.api('post', '/oauth/revoke', {token: vueAuth.getToken(), client_id: ''}, cb, errorCb)
  }
}
