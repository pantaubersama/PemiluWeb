<template>
  <div v-if="isAnimating" class="loading-lottie" ref="loadingLottie"></div>
</template>

<script>
import { mapState } from 'vuex'
import lottie from 'lottie-web'
export default {
  name: 'LoadingLottie',
  components: {
    lottie
  },
  computed: {
    ...mapState('loadingLottie', ['isAnimating'])
  },
  mounted() {
    this.loadingLottie = lottie.loadAnimation({
      container: this.$refs.loadingLottie,
      path: '/lottie/loading-pantau.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
  },
  watch: {
    isAnimating(value) {
      if (value) return this.loadingLottie.play()
      return this.loadingLottie.stop()
    }
  },

  destroyed() {
    this.loadingLottie.destroy()
  }
}
</script>
