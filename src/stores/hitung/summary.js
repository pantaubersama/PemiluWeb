import ApiHitungSummary from '@/services/api/hitung/summary'
export const namespaced = true
export const state = {
  president_summary:{},
  jokowi_percentage: null,
  prabowo_percentage: null,
  jokowi_total: null,
  prabowo_total: null,
  update_time: null,
  total: null,
}
export const actions = {
  summaryPresident({
    commit,
    state
  }, payload) {
    ApiHitungSummary.summaryPresident(result => {
      commit('getSummaryPresident', result.data.data)
    }),
    ApiHitungSummary.getTimeUpdate(result => {
      commit('getTimeUpdate', result.data.data)
    })
  },
}
export const mutations = {
  getSummaryPresident(state, data) {
    state.president_summary = data
    state.jokowi_percentage = data.percentage.candidates[0].percentage.toFixed(2)
    state.prabowo_percentage = data.percentage.candidates[1].percentage.toFixed(2)
    state.prabowo_total = String(data.percentage.candidates[1].total_vote).replace(/(.)(?=(\d{3})+$)/g,'$1.')
    state.jokowi_total = String(data.percentage.candidates[0].total_vote).replace(/(.)(?=(\d{3})+$)/g,'$1.')
  },
  getTimeUpdate(state, data) {
    state.update_time = data.last_update.created_at_in_word.id
    state.total = String(data.total).replace(/(.)(?=(\d{3})+$)/g,'$1.')
  }
}
export const getters = {

}
