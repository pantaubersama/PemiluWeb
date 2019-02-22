<template>
  <div class="selfie-idcard lottie-card" ref="selfieIdcard"></div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  name: 'SelfieLottie',
  mounted() {
    this.selfieLottie = lottie.loadAnimation({
      container: this.$refs.selfieIdcard,
      path: '/lottie/selfie-id-card.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
  },
  destroyed() {
    this.selfieLottie.destroy()
  }
}
</script>
