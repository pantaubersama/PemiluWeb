import ApiHomePilpres from '@/services/api/home/pilpres'
// initial state
const state = {
  paginations: {
    page: 1,
    perPage: 5,
    total: 0,
    isLast: false
  },
  feedsPilpres: []
}

// actions
const actions = {
  homePilpres({
    commit,
    state
  }, payload) {
    commit('loadingLottie/playLoading', {}, {
      root: true
    })
    ApiHomePilpres.homePilpres(state.paginations.page, state.paginations.perPage, result => {
      commit('getHomePilpres', result.data.data)
      commit('loadingLottie/stopLoading', {}, {
        root: true
      })
    })
  },

  nextPage({
    commit
  }) {
    commit('nextPage')
  },

  updateHomePilpres({
    commit,
    state
  }, id) {
    commit('loadingLottie/playLoading', {}, {
      root: true
    })
    ApiHomePilpres.homePilpres(state.paginations.page, state.paginations.perPage, result => {
      commit('loadingLottie/stopLoading', {}, {
        root: true
      })
      commit('updateHomePilpres', result.data.data)
    })
  }
}

// mutations
const mutations = {
  getHomePilpres(state, data) {
    state.feedsPilpres = data.feeds
    state.paginations.total = data.meta.pages.total
  },

  nextPage(state) {
    state.paginations.page++
  },
  updateHomePilpres(state, data) {
    if (data.meta.pages.total == state.paginations.page) {
      state.paginations.isLast = true
    }
    state.feedsPilpres.push.apply(state.feedsPilpres, data.feeds)
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
