<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { vueAuth } from '@/services/symbolic'
export default {
  name: 'App',
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
