// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import datefns from 'date-fns'
import localeId from 'date-fns/locale/id'
import SocialSharing from 'vue-social-sharing'
import Clipboard from 'v-clipboard'
import Autocomplete from 'v-autocomplete'
import Toaster from 'v-toaster'
import VueHeadful from 'vue-headful'

import App from './components/App'
import router from './router'
import {
  http
} from './services/http'
import store from '@/stores'
import VeeValidate from 'vee-validate'
import firebase from '@/mixins/firebase'
Vue.config.productionTip = false

Vue.prototype.$datefns = datefns
Vue.prototype.$getChallengeTitle = (title) => title.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
Vue.prototype.$getShowTime = (time, saldo = 0) => {
  const current = datefns.format(time, 'DD MMMM YYYY • HH:mm')
  let finish = datefns.addMinutes(time, saldo).toISOString()
  finish = datefns.format(finish, 'HH:mm')
  return `${current} - ${finish}`
}

Vue.filter('dateFormat', (value, format) => {
  if (!value) return ''
  return datefns.format(value, format, { locale: localeId })
})
Vue.filter('dateDistance', (value) => {
  if (!value) return ''
  return datefns.distanceInWords(value,  new Date(), { locale: localeId })
})
Vue.filter('dateDistanceFromNow', (value) => {
  if (!value) return ''
  return datefns.distanceInWordsToNow(value, { locale: localeId })
})

Vue.use(firebase)
Vue.use(SocialSharing)
Vue.use(Clipboard)
Vue.use(Autocomplete)
Vue.use(Toaster)
Vue.component('vue-headful', VueHeadful)

Vue.use(VeeValidate, {
  dictionary: {
    en: {
      messages: {
        required: (field) => `* Wajib Diisi.`,
        email: (field) => `Format email yang kamu masukkan salah`,
        regex: (field) => `Format nomor KTP tidak valid`,
        min: (field, [length]) => `Minimal ${length} karakter.`
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created() {
    http.init()
  }
})
