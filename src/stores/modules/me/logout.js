// import Vue from 'vue'
import ApiV2MeLogout from '@/services/api/me/logout'
import router from '@/router'
import { vueAuth } from '@/services/symbolic'

// initial state
const state = {
  userLogin: false
}

// actions
const actions = {
  logout ({ commit }) {
    ApiV2MeLogout.logout(result => {
      vueAuth.storage.removeItem(vueAuth.tokenName)
      commit('userLogout')
      router.replace('/')
    })
  }
}

// mutations
const mutations = {
  userLogin (state) {
    state.userLogin = true
  },
  userLogout (state) {
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
