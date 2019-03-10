<template>
  <div class="empty-wrapper">
    <div class="lottie-empty" ref="emptyNotif"></div>
    <p>{{message}}</p>
  </div>
</template>

<script>
import { mapState,  mapActions } from 'vuex'
import lottie from 'lottie-web'
export default {
  name: 'LottieEmptyNotif',
  props: {
    message: String
  },
  mounted() {
    this.emptyLottie = lottie.loadAnimation({
      container: this.$refs.emptyNotif,
      path: '/lottie/empty-notif.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
  },
  destroyed() {
    this.emptyLottie.destroy()
    this.$store.commit('showLottie/hideLottieNotif')
  },
}
</script>

<style lang="sass" scoped>
.empty-wrapper
  padding: 15px
  text-align: center
  p
    margin-bottom: 0

  .lottie-empty
    max-width: 200px
    height: 200px
    margin: 0 auto 10px
</style>
