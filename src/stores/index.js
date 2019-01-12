import Vue from 'vue'
import Vuex from 'vuex'

// modules
import meLogout from '@/stores/modules/me/logout'
import imagesUpload from '@/stores/modules/images/upload'
import liniMasa from '@/stores/modules/lini-masa'

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
    meLogout,
    imagesUpload,
    liniMasa
  },
  strict: debug,
  plugins: [beforeAction]
})
