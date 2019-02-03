<template>
  <div id="app">
    <router-view/>
    <snackbar/>
  </div>
</template>

<script>
import snackbar from '@/components/snackbar'
import { vueAuth } from '@/services/symbolic'
import * as ProfileAPI from '@/services/api/profile'
export default {
  name: 'App',
  components: {
    snackbar
  },
  computed: {
    token() {
      return this.$store.getters['profile/token']
    }
  },
  watch: {
    token: {
      immediate: true,
      handler(val) {
        if (val == null) return
        ProfileAPI.setToken(val)
        this.$store.dispatch('profile/getMe')
      }
    }
  }
}
</script>
