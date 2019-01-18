import Vue from 'vue'
import Vuex from 'vuex'

// modules
import meLogout from '@/stores/modules/me/logout'
import imagesUpload from '@/stores/modules/images/upload'
import liniMasa from '@/stores/modules/lini-masa'
import * as profile from '@/stores/modules/profile'
import pendidikanPolitik from '@/stores/modules/pendidikan-politik'
import homePilpres from '@/stores/modules/home/pilpres'
import homeJanjiPolitik from '@/stores/modules/home/janji-politik'
import homeQuestions from '@/stores/modules/home/questions'
import loadingLottie from '@/stores/modules/loading-lottie'

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
    loadingLottie,
    meLogout,
    imagesUpload,
    liniMasa,
    profile,
    pendidikanPolitik,
    homePilpres,
    homeJanjiPolitik,
    homeQuestions
  },
  strict: debug,
  plugins: [beforeAction]
})
