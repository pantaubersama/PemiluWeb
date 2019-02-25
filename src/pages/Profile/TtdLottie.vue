<template>
  <div class="upload-ttd lottie-card" ref="uploadTtd"></div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  name: 'TtdLottie',
  mounted() {
    this.uploadLottie = lottie.loadAnimation({
      container: this.$refs.uploadTtd,
      path: '/lottie/upload-ttd.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
  },
  destroyed() {
    this.uploadLottie.destroy()
  }
}
</script>
