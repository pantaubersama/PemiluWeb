import NotificationAPI from '@/services/api/notification'

export const namespaced = true

export const state = {
  recentNotification: [],
  fullNotification: [],
  paginations: {
    fullNotification: {
      page: 1,
      perPage: 150,
      total: 0,
      isLast: false
    }
  },
  notif:[],
}

export const actions = {
  recentNotification({
      commit
    },
    page = 1,
    per_page = 5
  ) {
    NotificationAPI.getNotification(page, per_page, result => {
      commit('setRecentNotification', result.data.data)
      if (result.data.data.length <= 0) {
        commit('showLottie/showLottieNotif', {}, {
          root: true
        })
      }
    })
  },
  fullNotification({
    commit
  }) {
    commit('loadingLottie/playLoading', {}, {
      root: true
    })
    NotificationAPI.getNotification(state.paginations.fullNotification.page, state.paginations.fullNotification.perPage, result => {
      commit('setFullNotification', result.data.data)
      if (result.data.data.length <= 0) {
        commit('showLottie/showLottieNotif', {}, {
          root: true
        })
      }
      commit('loadingLottie/stopLoading', {}, {
        root: true
      })
    })
  },
  nextPageNotification({commit}) {
    commit('nextPageNotification')
  },
  updateFullNotification({commit}) {
    commit('loadingLottie/playLoading', {}, {
      root: true
    })
    NotificationAPI.getNotification(
      state.paginations.fullNotification.page,
      state.paginations.fullNotification.perPage, result => {
        commit('updateFullNotification', result.data.data)
        commit('loadingLottie/stopLoading', {}, {
          root: true
        })
      })
  },
}

export const mutations = {
  setRecentNotification(state, data) {
    state.recentNotification = data.notifications
  },
  setNotif(state, data) {
    state.notif = data
  },
  setFullNotification(state, data) {
    state.fullNotification = data.notifications
    state.paginations.fullNotification.total = data.meta.pages.total
  },
  nextPageNotification(state) {
    state.paginations.fullNotification.page++
  },
  updateFullNotification(state, data) {
    if (data.meta.pages.total == state.paginations.fullNotification.page) {
      state.paginations.fullNotification.isLast = true
    }
    state.fullNotification.push.apply(state.fullNotification, data.notifications)
  },
}
