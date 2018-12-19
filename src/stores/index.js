import Vue from 'vue'
import Vuex from 'vuex'

// modules
import meLogout from '@/stores/modules/me/logout'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const beforeAction = store => {
  store.subscribeAction((action, state) => {
    // console.log("Action Type: ", action.type)
    // console.log("Action Payload: ", action.payload)
    // console.log("Current State: ", state)
  })
}

export default new Vuex.Store({
  modules: {
    meLogout
  },
  strict: debug,
  plugins: [beforeAction]
})
