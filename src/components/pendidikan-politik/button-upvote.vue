<template>
  <div class="upvote-lottie icon vote-up" ref="upvote"></div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  name: 'ButtonUpvote',
  props: {
    isAnimating: Boolean
  },
  data() {
    return {
      upvoteDetail: null
    }
  },
  mounted() {
    this.upvoteDetail = lottie.loadAnimation({
      container: this.$refs.upvote,
      path: '/lottie/upvote.json',
      autoplay: false,
      renderer: 'svg'
    })

    this.upvoteDetail.addEventListener('complete', (...args) => {
      this.$emit('animated')
    })
  },
  watch: {
    isAnimating(value) {
      if (value) return this.upvoteDetail.play()
      return this.upvoteDetail.stop()
    }
  }
}
</script>
