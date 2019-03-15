<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { vueAuth } from '@/services/symbolic'
import { authLink } from '@/mixins/link'
import firebase from '@/mixins/firebase'
export default {
  name: 'App',
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} - Pantau Bersama` : 'Pantau Bersama'
    }
  },
  mixins: [authLink],
  data() {
    return {
      token: null
      // test: null,
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        const token = vueAuth.getToken()
        if (this.token !== token) {
          this.token = token
        }
      }
    },
    token: {
      immediate: true,
      handler(token) {
        if (token == null) return
        this.$store.dispatch('profile/setToken', this.token)
        this.$store.dispatch('profile/getMe')
        const messaging = firebase.messaging()
        messaging
          .requestPermission()
          .then(() => {
            console.log('Notification permission granted.')
            // get the token in the form of promise
            return messaging.getToken()
          })
          .then(firebaseToken => {
            console.log(firebaseToken)
            this.$store.commit('profile/setFirebaseKey', firebaseToken)
            this.$store.dispatch('profile/setNotification')
          })
          .catch(err => {
            console.log('Unable to get permission to notify.', err)
          })
        messaging.onMessage(payload => {
          console.log('on Message', payload.data.payload)
        })
      }
    }
  }
}
</script>
