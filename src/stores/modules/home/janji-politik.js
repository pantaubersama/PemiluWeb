import ApiHomeJanjiPolitik from '@/services/api/home/janji-politik'

export const namespaced = true
export const state = {
  paginations: {
    page: 1,
    perPage: 5,
    total: 0,
    isLast: false
  },
  feedsJanjiPolitik: []
}

export const actions = {
  homeJanjiPolitik({
    commit,
    state
  }, payload) {
    commit('loadingLottie/playLoading', {}, {
      root: true
    })
    ApiHomeJanjiPolitik.homeJanjiPolitik(state.paginations.page, state.paginations.perPage, result => {
      commit('loadingLottie/stopLoading', {}, {
        root: true
      })
      commit('getHomeJanjiPolitik', result.data.data)
    })
  },

  nextPage({
    commit
  }) {
    commit('nextPage')
  },

  updateJanjiPolitik({
    commit,
    state
  }, payload) {
    commit('loadingLottie/playLoading', {}, {
      root: true
    })
    ApiHomeJanjiPolitik.homeJanjiPolitik(state.paginations.page, state.paginations.perPage, result => {
      commit('updateJanjiPolitik', result.data.data)
      commit('loadingLottie/stopLoading', {}, {
        root: true
      })
    })
  }
}


export const mutations = {
  getHomeJanjiPolitik(state, data) {
    state.feedsJanjiPolitik = data.janji_politiks
    state.paginations.total = data.meta.pages.total
  },

  nextPage(state) {
    state.paginations.page++
  },
  updateJanjiPolitik(state, data) {
    if (data.meta.pages.total == state.paginations.page) {
      state.paginations.isLast = true
    }
    state.feedsJanjiPolitik.push.apply(state.feedsJanjiPolitik, data.janji_politiks)
  }
}
