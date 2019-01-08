<template>
  <div class="login-wrapper">
    <div class="login-background" ref="loginBackground"></div>
    <div class="login-content">
      <div class="logo">
        <logo-pantau/>
      </div>
      <p>Pantau Bersama untuk Indonesia
        <br>yang lebih baik
      </p>
      <div class="button-group">
        <div class="btn btn-primary" @click="auth('symbolic')">Mulai</div>
        <div class="btn" @click="$router.go(-1)">Lewati</div>
      </div>
    </div>
  </div>
</template>

<script>
import { LogoPantau } from '@/svg/icons'
import lottie from 'lottie-web'
import { http } from '@/services/http'
import { vueAuth } from '@/services/symbolic'
export default {
  name: 'Login',
  components: {
    lottie,
    LogoPantau
  },
  data() {
    return {
      loginBackground: null
    }
  },
  mounted() {
    var this_ = this
    vueAuth.storage.removeItem(vueAuth.tokenName)
    if (vueAuth.isAuthenticated()) {
      this_.$router.push({ path: '/' })
    }
    this.loginBackground = lottie.loadAnimation({
      container: this.$refs.loginBackground,
      path: '/lottie/landing-page-backround.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
  },
  destroyed() {
    this.loginBackground.destroy()
  },
  methods: {
    auth: function(provider) {
      this.response = null
      var this_ = this

      vueAuth
        .authenticate(provider)
        .then(function(authResponse) {
          // Execute application logic after successful symbolic authentication
          http.api(
            'get',
            'v1/callback',
            { provider_token: vueAuth.getToken() },
            ({ data }) => {
              vueAuth.setToken(data)
              this_.$store.commit('meLogout/userLogin')
              var successUrl = this_.$route.query.redirect
                ? this_.$route.query.redirect
                : '/'
              this_.$router.push(successUrl)
            }
          )
        })
        .catch(function(err) {
          this_.response = err
          console.log(err)
        })
    }
  }
}
</script>
