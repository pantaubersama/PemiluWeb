import { vueAuth } from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL = process.env.API_PEMILU_BASE_URL
  ? process.env.API_PEMILU_BASE_URL
  : 'https://staging-pemilu.pantaubersama.com'

const api = Api(`${BASE_URL}/hitung`, () => vueAuth.getToken())

export const getProvinces = () => api
  .get('/v1/provinces')
  .then(resp => resp.data.data)
export const getRegencies = (province_code) => api
  .get('/v1/regencies', { params: { province_code } })
  .then(resp => resp.data.data)
export const getDistricts = (regency_code) => api
  .get('/v1/districts', { params: { regency_code } })
  .then(resp => resp.data.data)
export const getVillages = (district_code) => api
  .get('/v1/villages', { params: { district_code }})
  .then(resp => resp.data.data)

export const getDapils = (province_code, regency_code, tingkat='kabupaten') => api
  .get('/v1/dapils', { params: { province_code, regency_code, tingkat } })
  .then(resp => resp.data.data)

export const getCandidates = (dapil_id, tingkat = 'kabupaten') => api
  .get('/v1/candidates', { params: { dapil_id, tingkat } })
  .then(resp => resp.data.data)
