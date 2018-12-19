<template>
  <div class="header position-fixed">
    <div class="container d-flex">
    <router-link exact to="/">LOGO</router-link>
    <div class="ml-auto navbar-right d-flex align-item-center">
      <router-link to="/another-page" style="margin-right: 20px">Another Page</router-link>
      <a href="" v-if="isProtected()">LOGOUT</a>
      <a href="" v-else @click.prevent="auth('symbolic')">LOGIN</a>
    </div>
    </div>
  </div>
</template>

<script>
import { http } from '@/services/http'
import { vueAuth } from '@/services/symbolic'
import { authLink } from '@/mixins/link'
export default {
  name: 'Header',
  mixins: [authLink],
  mounted () {
    var this_ = this
    // vueAuth.storage.removeItem(vueAuth.tokenName)
    if (vueAuth.isAuthenticated()) {
      this_.$router.push({ path: '/' })
    }
  },
  methods: {
    auth: function (provider) {
      this.response = null
      var this_ = this

      vueAuth.authenticate(provider).then(function (authResponse) {
        // Execute application logic after successful symbolic authentication
        http.api('get', 'v1/callback', { provider_token: vueAuth.getToken() }, ({ data }) => {
          vueAuth.setToken(data)
          var successUrl = this_.$route.query.redirect ? this_.$route.query.redirect : '/'
          this_.$router.push(successUrl)
        })
      }).catch(function (err) {
        this_.response = err
        console.log(err)
      })
    }
  }
}
</script>
