<template>
  <div class="idcard lottie-card" ref="idCard"></div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  name: 'KtpLottie',
  mounted() {
    this.idCardLottie = lottie.loadAnimation({
      container: this.$refs.idCard,
      path: '/lottie/memfoto-idcard.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
  },
  destroyed() {
    this.idCardLottie.destroy()
  }
}
</script>
