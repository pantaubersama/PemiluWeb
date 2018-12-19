// import Vue from 'vue'
import ApiV2MeLogout from '@/services/api/me/logout'
import router from '@/router'
import { vueAuth } from '@/services/symbolic'

// initial state
const state = {
}

// actions
const actions = {
  logout ({ commit }) {
    ApiV2MeLogout.logout(result => {
      vueAuth.storage.removeItem(vueAuth.tokenName)
      // commit('snackbar/setSnack', Vue.i18n.translate('logoutSuccess'), { root: true })
      router.replace('/')
    })
  }
}

// mutations
const mutations = {

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
