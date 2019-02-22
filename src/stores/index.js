import Vue from 'vue'
import Vuex from 'vuex'

// modules
import * as  meLogout from '@/stores/modules/me/logout'
import liniMasa from '@/stores/modules/lini-masa'
import * as profile from '@/stores/modules/profile'
import * as pendidikanPolitik from '@/stores/modules/pendidikan-politik'
import * as homePilpres from '@/stores/modules/home/pilpres'
import * as homeJanjiPolitik from '@/stores/modules/home/janji-politik'
import * as homeQuestions from '@/stores/modules/home/questions'
import * as homeQuiz from '@/stores/modules/home/quiz'
import * as homeCluster from '@/stores/modules/home/cluster'
import * as homeKenalan from '@/stores/modules/home/kenalan'
import * as dashboard from '@/stores/modules/dashboard'
import * as loadingLottie from '@/stores/modules/loading-lottie'
import * as showLottie from '@/stores/modules/empty-lottie'
import * as search from '@/stores/modules/search'

// Lini Masa
import LiniMasaDetail from '@/stores/linimasa/janjipolitik/detail'
import PendidikanPolitikDetail from '@/stores/pendidikan_politik/tanya/detail'
import PendidikanPolitikQuizParticipation from '@/stores/pendidikan_politik/quiz_participations/kecenderungan'

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
    liniMasa,
    profile,
    pendidikanPolitik,
    homePilpres,
    homeJanjiPolitik,
    dashboard,
    homeQuestions,
    homeQuiz,
    homeCluster,
    homeKenalan,
    search,
    showLottie,
    LiniMasaDetail,
    PendidikanPolitikDetail,
    PendidikanPolitikQuizParticipation
  },
  strict: debug,
  plugins: [beforeAction]
})
