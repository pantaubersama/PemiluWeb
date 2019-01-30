<template>
  <div class="share">
    <a href="https://pantaubersama.com">
      <logo-product/>
    </a>
    <a href="https://play.google.com/store/apps/details?id=com.pantaubersama" target="_blank">
      <img src="@/assets/download-google-play-store-logo.png" alt>
    </a>
  </div>
</template>

<script>
import { LogoProduct } from '@/svg/products'
export default {
  name: 'Share',
  components: {
    LogoProduct
  }
}
</script>
<style lang="sass" scoped>
.share
  height: 100vh
  width: 100vw
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  a
    max-width: 320px
    padding: 15px
    img
      max-width: 200px
    svg
      width: 100%
</style>

