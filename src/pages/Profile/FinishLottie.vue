<template>
  <div class="finish-lottie lottie-card" ref="finishLottie"></div>
</template>

<script>
import lottie from 'lottie-web'
  export default {
    name: 'FinishLottie',
    mounted() {
    this.finishLottie = lottie.loadAnimation({
      container: this.$refs.finishLottie,
      path: '/lottie/validation-success.json',
      autoplay: true,
      loop: false,
      renderer: 'svg'
    })
  },
  destroyed() {
    this.finishLottie.destroy()
  }
  }
</script>
