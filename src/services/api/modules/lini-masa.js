import axios from 'axios'
import { vueAuth } from '@/services/symbolic'

const PREFIX = 'linimasa'

const fetchBannerInfo = (page_name = 'pilpres') => {
  return axios
    .get(`${PREFIX}/v1/banner_infos`, {
      params: {
        page_name,
        token: vueAuth.getToken(),
        client_id: ''
      }
    })
    .then(response => response.data.data)
    .catch(error => error)
}

const fetchJanjiPolitik = ({
  query,
  clusterId,
  filterBy = 'user_verified_all',
  page = 1,
  perPage = 20
}) => {
  return axios
    .get(`${PREFIX}/v1/janji_politiks`, {
      params: {
        page,
        q: query,
        per_page: perPage,
        cluster_id: clusterId,
        filter_by: filterBy,
        client_id: '',
        token: vueAuth.getToken()
      }
    })
    .then(response => response.data.data)
    .catch(error => error)
}

const services = {
  fetchBannerInfo,
  fetchJanjiPolitik
}

export default services
