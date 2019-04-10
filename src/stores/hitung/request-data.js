import ApiRequestData from '@/services/api/hitung/request-data'

export const namespaced = true
export const state = {

}
export const actions = {
  requestData({
    commit,
    state
  }, payload) {
    ApiRequestData.requestData(
      payload.name,
      payload.organization,
      payload.email,
      payload.phone,
      payload.necessity
    )
  },
}
export const mutations = {
}
export const getters = {

}
