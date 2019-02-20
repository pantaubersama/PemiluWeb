<template>
  <div class="empty-post">
    <div class="lottie-empty" ref="empty"></div>
    <p>Pencarian tidak ditemukan</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import lottie from 'lottie-web'
export default {
  name: 'LottieEmpty',
  mounted() {
    this.emptyLottie = lottie.loadAnimation({
      container: this.$refs.empty,
      path: '/lottie/empty-status.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
  },
  destroyed() {
    this.emptyLottie.destroy()
  },
}
</script>

<style lang="sass" scoped>
.empty-post
  padding: 15px
  text-align: center
  p
    margin-bottom: 0

  .lottie-empty
    max-width: 200px
    height: 200px
    margin: 0 auto 10px
</style>
