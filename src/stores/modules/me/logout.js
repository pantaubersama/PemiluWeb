// import Vue from 'vue'
import ApiV2MeLogout from '@/services/api/me/logout'
import router from '@/router'
import {
  vueAuth
} from '@/services/symbolic'

// initial state
const state = {
  userLogin: false
}

// actions
const actions = {
  logout(ctx) {
    ApiV2MeLogout.logout(result => {
      vueAuth.storage.removeItem(vueAuth.tokenName)
      ctx.commit('userLogout')
      ctx.dispatch('profile/setToken', null, {
        root: true
      })
      router.replace('/')
    })
  }
}

// mutations
const mutations = {
  userLogin(state) {
    state.userLogin = true
  },
  userLogout(state) {
    state.userLogin = false
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
