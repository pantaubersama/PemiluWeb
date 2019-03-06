import NotificationAPI from '@/services/api/notification'

export const namespaced = true

export const state = {
  recentNotification: [],
  fullNotification: []
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
      if(result.data.data.length <= 0){
        ctx.commit('showLottie/showLottieNotif',{},{
          root: true
        })
      }
    })
  },
  fullNotification({
    commit
  },
  page = 1,
  per_page = 100
) {
  NotificationAPI.getNotification(page, per_page, result => {
    commit('setFullNotification', result.data.data)
    if(result.data.data.length <= 0){
      ctx.commit('showLottie/showLottieNotif',{},{
        root: true
      })
    }
  })
}
}

export const mutations = {
  setRecentNotification(state, data) {
    state.recentNotification = data.notifications
  },
  setFullNotification(state, data) {
    state.fullNotification = data.notifications
  },
}
