import Vue from 'vue'
import Vuex from 'vuex'

// modules
import snackbar from '@/stores/modules/snackbar'
import meLogout from '@/stores/modules/me/logout'
import imagesUpload from '@/stores/modules/images/upload'
import liniMasa from '@/stores/modules/lini-masa'
import * as profile from '@/stores/modules/profile'
import * as pendidikanPolitik from '@/stores/modules/pendidikan-politik'
import homePilpres from '@/stores/modules/home/pilpres'
import homeJanjiPolitik from '@/stores/modules/home/janji-politik'
import homeQuestions from '@/stores/modules/home/questions'
import homeQuiz from '@/stores/modules/home/quiz'
import homeCluster from '@/stores/modules/home/cluster'
import homeKenalan from '@/stores/modules/home/kenalan'
import dashboard from '@/stores/modules/dashboard'
import loadingLottie from '@/stores/modules/loading-lottie'
import * as search from '@/stores/modules/search'

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
    dashboard,
    homeQuestions,
    homeQuiz,
    homeCluster,
    snackbar,
    homeKenalan,
    search
  },
  strict: debug,
  plugins: [beforeAction]
})
