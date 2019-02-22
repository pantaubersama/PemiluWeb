<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { vueAuth } from '@/services/symbolic'
export default {
  name: 'App',
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} - Pantau Bersama` : 'Pantau Bersama'
    }
  },
  data() {
    return {
      token: null
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
      }
    }
  }
}
</script>
