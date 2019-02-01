import {
  http
} from '@/services/http'

export default {
  homeCluster(page, perPage, cb, errorCb) {
    http.api('get', 'v1/clusters', {
      page: page,
      per_page: perPage
    }, cb, errorCb)
  }
}
