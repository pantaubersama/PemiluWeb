<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="logo">
        <logo-pantau/>
        <div class="lottie lottie-radar" ref="lottieRadar"></div>
      </div>
      <p>Pantau Bersama Pemilu 2019
        <br>Rayakan Partisipasi Pesta Demokrasi!
      </p>
      <div class="button-group">
        <div class="btn btn-primary" @click="auth('symbolic')">Mulai</div>
        <div class="btn" @click="$router.push('/')">Lewati</div>
      </div>
    </div>
    <div class="lottie-bottom">
      <div class="lottie lottie-wave" ref="lottieWave"></div>
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
import firebase from '@/mixins/firebase'
export default {
  name: 'Login',
  components: {
    lottie,
    LogoPantau
  },
  data() {
    return {
      lottieWave: null,
      lottieRadar: null
    }
  },
  mounted() {
    vueAuth.storage.removeItem(vueAuth.tokenName)
    if (vueAuth.isAuthenticated()) {
      this.$router.push({ path: '/' })
    }
    this.lottieWave = lottie.loadAnimation({
      container: this.$refs.lottieWave,
      path: '/lottie/wave-bottom-landing.json',
      autoplay: true,
      loop: false,
      renderer: 'svg'
    })
    this.lottieRadar = lottie.loadAnimation({
      container: this.$refs.lottieRadar,
      path: '/lottie/radar-logo.json',
      autoplay: true,
      loop: false,
      renderer: 'svg'
    })
  },
  destroyed() {
    this.lottieWave.destroy()
    this.lottieRadar.destroy()
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
