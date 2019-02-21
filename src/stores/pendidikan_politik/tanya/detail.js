import ApiV1PendidikanPolitikDetail from '@/services/api/v1/pendidikan_politik/detail'

// initial state
const state = {
  tanya: {},
  isLoadingTanya: true
}

// actions
const actions = {

  getDetailTanya({ commit }, payload) {
    ApiV1PendidikanPolitikDetail.getDetailTanya(payload.id, result => {
      commit('setDetailTanya', result.data)
    })
  },

  emptyDetail({ commit }) {
    commit('emptyDetail')
  },

  increaseVote({ commit }, id) {
    commit('increaseVote', id)
  },

  decreaseVote({ commit }, id) {
    commit('decreaseVote', id)
  }

}

// mutations
const mutations = {

  setDetailTanya(state, resp) {
    state.tanya = resp.data.question
    state.isLoadingTanya = false
  },

  emptyDetail(state) {
    state.tanya = {}
    state.isLoadingTanya = true
  },

  increaseVote(state, id) {
    if (state.tanya !== undefined && state.tanya.id === id) {
      state.tanya.is_liked = true
      state.tanya.like_count += 1
    }
  },

  decreaseVote(state, id) {
    if (state.tanya !== undefined && state.tanya.id === id) {
      state.tanya.is_liked = false
      state.tanya.like_count -= 1
    }
  }

}

// getters
const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
