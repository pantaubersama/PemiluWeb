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

const services = {
  fetchBannerInfo
}

export default services
