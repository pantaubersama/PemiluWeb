
import ApiV2MeLogout from '@/services/api/me/logout'
import router from '@/router'
import {
  vueAuth
} from '@/services/symbolic'

export const namespaced = true
export const state = {
  userLogin: false
}


export const actions = {
  logout(ctx) {
    ApiV2MeLogout.logout(result => {
      vueAuth.storage.removeItem(vueAuth.tokenName)
      ctx.commit('userLogout')
      ctx.commit('profile/removeProfileData',null,{
        root: true
      })
      ctx.dispatch('profile/setToken', null, {
        root: true
      })
      ctx.commit('profile/clearFirebaseKey', null, {
        root: true
      })
      router.replace('/')
    })
  }
}


export const mutations = {
  userLogin(state) {
    state.userLogin = true
  },
  userLogout(state) {
    state.userLogin = false
  }
}
