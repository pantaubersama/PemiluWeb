import axios from 'axios'
import router from '@/router'

export default function Api(baseURL, getToken) {
  const instance = axios.create({
    baseURL
  })
  instance.interceptors.request.use((config) => {
    const token = getToken()
    if (token != null) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  })
  instance.interceptors.response.use(resp => resp, (error) => {
    if (error.response.status === 401) {
      router.replace({
        path: '/login',
        query: {
          redirect: location.pathname
        }
      })
    }
  })
  return instance
}
