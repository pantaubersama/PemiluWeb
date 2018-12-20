<template>
  <div class="login-wrapper">
    <div class="container">
      <h1>Kamu Harus Login</h1>
      <div class="btn btn-outline btn-primary" @click="$router.go(-1)">Kembali</div>
      <div class="btn btn-primary" @click="auth('symbolic')">masuk</div>
    </div>
    </div>
</template>

<script>
import { http } from '@/services/http'
import { vueAuth } from '@/services/symbolic'
export default {
  name: 'Login',
  mounted () {
    var this_ = this
    vueAuth.storage.removeItem(vueAuth.tokenName)
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
          this_.$store.commit('meLogout/userLogin')
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
