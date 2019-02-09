<template>
  <div class="login-wrapper">
    <div class="login-background" ref="loginBackground"></div>
    <div class="login-content">
      <div class="logo">
        <logo-pantau/>
      </div>
      <p>Pantau Bersama Pemilu 2019
        <br>Rayakan Partisipasi Pesta Demokrasi!
      </p>
      <div class="button-group">
        <div class="btn btn-primary" @click="auth('symbolic')">Mulai</div>
        <div class="btn" @click="$router.push('/')">Lewati</div>
      </div>
    </div>
  </div>
</template>

<script>
import { LogoPantau } from '@/svg/icons'
import lottie from 'lottie-web'
import { http } from '@/services/http'
import { vueAuth } from '@/services/symbolic'
import * as ProfileAPI from '@/services/api/profile'
import * as LinimasaAPI from '@/services/api/modules/lini-masa'
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
    vueAuth.storage.removeItem(vueAuth.tokenName)
    if (vueAuth.isAuthenticated()) {
      this.$router.push({ path: '/' })
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

      vueAuth
        .authenticate(provider)
        .then(authResponse => {
          // Execute application logic after successful symbolic authentication
          http.api(
            'get',
            'v1/callback',
            { provider_token: vueAuth.getToken() },
            async resp => {
              vueAuth.setToken(resp.data)
              const token = resp.data.data.access_token

              this.$store.commit('meLogout/userLogin')
              this.$store.dispatch('profile/setToken', token)
              const user = await ProfileAPI.getMe()
              const shouldUpdateProfile =
                user.location == null ||
                user.education == null ||
                user.occupation == null ||
                user.about == null
              const url = shouldUpdateProfile
                ? '/profile?edit-profile=1'
                : this.$route.query.redirect || '/'

              this.$router.push(url)
            }
          )
        })
        .catch(function(err) {
          this.response = err
          console.log(err)
        })
    }
  }
}
</script>
