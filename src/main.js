// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import SocialSharing from 'vue-social-sharing'
import Clipboard from 'v-clipboard'
import Autocomplete from 'v-autocomplete'
import Toaster from 'v-toaster'
import VueTagsInput from '@voerro/vue-tagsinput'

import App from './components/App'
import router from './router'
import { http } from './services/http'
import store from '@/stores'

Vue.config.productionTip = false

Vue.use(SocialSharing)
Vue.use(Clipboard)
Vue.use(Autocomplete)
Vue.use(Toaster)
Vue.component('tags-input', VueTagsInput)

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
