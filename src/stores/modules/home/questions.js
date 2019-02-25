import ApiHomeQuestions from '@/services/api/home/questions'

export const namespaced = true
export const state = {
  paginations: {
    page: 1,
    perPage: 5,
    total: 0,
    isLast: false
  },
  feedsQuestions: []
}


export const actions = {
  homeQuestions({ commit, state }, payload) {
    commit(
      'loadingLottie/playLoading',
      {},
      {
        root: true
      }
    )
    ApiHomeQuestions.homeQuestions(
      state.paginations.page,
      state.paginations.perPage,
      result => {
        commit(
          'loadingLottie/stopLoading',
          {},
          {
            root: true
          }
        )
        commit('getHomeQuestions', result.data.data)
      }
    )
  },

  nextPage({ commit }) {
    commit('nextPage')
  },

  updateHomeQuestions({ commit, state }, id) {
    commit(
      'loadingLottie/playLoading',
      {},
      {
        root: true
      }
    )
    ApiHomeQuestions.homeQuestions(
      state.paginations.page,
      state.paginations.perPage,
      result => {
        commit('updateHomeQuestions', result.data.data)
        commit(
          'loadingLottie/stopLoading',
          {},
          {
            root: true
          }
        )
      }
    )
  }
}


export const mutations = {
  getHomeQuestions(state, data) {
    state.feedsQuestions = data.questions.sort(function (a, b) {
      return b.like_count - a.like_count
    })
    state.paginations.total = data.meta.pages.total
  },

  nextPage(state) {
    state.paginations.page++
  },
  updateHomeQuestions(state, data) {
    if (data.meta.pages.total === state.paginations.page) {
      state.paginations.isLast = true
    }
    state.feedsQuestions.push.apply(state.feedsQuestions, data.questions)
  },
  setVoted(state, id) {
    const index = state.feedsQuestions.findIndex(question => question.id === id)
    let question = state.feedsQuestions.find(question => question.id === id)
    question.is_liked = true
    question.like_count += 1

    state.feedsQuestions[index] = question
  },
  removeVoted(state, id) {
    const index = state.feedsQuestions.findIndex(question => question.id === id)
    let question = state.feedsQuestions.find(question => question.id === id)
    question.is_liked = false
    question.like_count -= 1

    state.feedsQuestions[index] = question
  }
}
