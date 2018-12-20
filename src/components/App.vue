<template>
  <div id="app">
    <div v-if="this.$route.name !== 'Login'">
      <Header/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
