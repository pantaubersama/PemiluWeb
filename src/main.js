// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
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

Vue.config.productionTip = false


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
