import ApiHomeQuize from '@/services/api/home/quiz'
export const namespaced = true
export const state = {
  paginations: {
    page: 1,
    perPage: 1,
  },
  feedsQuiz: []
}

export const actions = {
  homeQuiz({
    commit,
    state
  }, payload) {
    ApiHomeQuize.homeQuiz(state.paginations.page, state.paginations.perPage, result => {
      commit('getHomeJanjiPolitik', result.data.data)
    })
  },
}

export const mutations = {
  getHomeJanjiPolitik(state, data) {
    state.feedsQuiz = data.quizzes
  }
}
