import {vueAuth} from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL = process.env.API_OPINIUM_URL || 'https://staging-service.opinium.social'
const token = process.env.OPINIUM_API_KEY || '016e8e818e415295076151ab4e6ff4eae94b1ab9947a671b3cba56e98a8506ac'
const api = Api(BASE_URL, () => vueAuth.getToken())

export const listTags = () => api
  .get('/opinium_service/v1/tags', {
    headers: {
      ApiKey: `Bearer ${token}`
    },
    params: {
      page: 1,
      q: '*',
      o: 'and',
      m: 'word_start',
      order_by: 'name',
      direction: 'asc'
    }
  })
  .then(res => res.data.data.tags)
