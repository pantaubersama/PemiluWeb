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

export const getCandidatesSummary = ({ dapil_id, hitung_real_count_id, level = 2 }) => api
  .get('/v1/summary/candidates/show', { params: { dapil_id, hitung_real_count_id, level } })
  .then(resp => resp.data.data)

export const getPresidentSummary = (region, level = 0) => api
  .get('/v1/summary/president/list', { params: { region, level }})
  .then(resp => resp.data.data)
export const getPresident = ({ region, tps, realCountId, level = 6 }) => api
  .get('/v1/summary/president/show', { params: { region, level, tps, hitung_real_count_id: realCountId }})
  .then(resp => resp.data.data)

export const getRealCounts = ({ user_id = null, village_code = null, dapil_id = null, page = 1, per_page = 100 } = {}) => api
  .get('/v1/real_counts', { params: { user_id, village_code, dapil_id, page, per_page }})
  .then(resp => resp.data.data)

export const getFormC1 = ({ realCountId, type = 'president' }) => api
  .get('/v1/form_c1', { params: { hitung_real_count_id: realCountId, form_c1_type: type } })
  .then(resp => resp.data.data)
