<template>
  <div id="app">
    <router-view/>
    <snackbar/>
  </div>
</template>

<script>
import snackbar from '@/components/snackbar'
export default {
  name: 'App',
  components: {
    snackbar
  }
}
</script>
