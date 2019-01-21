import ApiHomeQuize from '@/services/api/home/quiz'
// initial state
const state = {
  paginations: {
    page: 1,
    perPage: 1,
  },
  feedsQuiz: []
}

// actions
const actions = {
  homeQuiz({
    commit,
    state
  }, payload) {
    ApiHomeQuize.homeQuiz(state.paginations.page, state.paginations.perPage, result => {
      commit('getHomeJanjiPolitik', result.data.data)
    })
  },
}

// mutations
const mutations = {
  getHomeJanjiPolitik(state, data) {
    state.feedsQuiz = data.quizzes
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
