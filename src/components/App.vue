<template>
  <div id="app">
    <router-view/>
    <snackbar/>
  </div>
</template>

<script>
import snackbar from '@/components/snackbar'
import { vueAuth } from '@/services/symbolic'
export default {
  name: 'App',
  components: {
    snackbar
  },
  computed: {
    token() {
      return vueAuth.getToken()
    }
  },
  watch: {
    token: {
      immediate: true,
      handler(val) {
        if (val == null) return
        this.$store.dispatch('profile/getMe')
      }
    }
  }
}
</script>
