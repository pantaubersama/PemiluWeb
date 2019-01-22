<template>
  <div>
    <button class="vote" :class="{ voted: isVoted }" @click="onUpvote()">
      <i v-show="!isAnimating" class="icon voteup" :class="{ voted: isVoted }"></i>
      <div v-show="isAnimating" class="upvote-lottie icon vote-up" ref="upvote"></div>
      <div class="total-count">{{count}}</div>
    </button>
  </div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  name: 'CardTanyaButton',
  props: {
    id: String,
    question: String,
    isVoted: Boolean,
    count: Number
  },
  data() {
    return {
      upvoteLottie: null,
      isAnimating: false
    }
  },
  mounted() {
    this.upvoteLottie = lottie.loadAnimation({
      container: this.$refs.upvote,
      path: '/lottie/upvote.json',
      autoplay: false,
      renderer: 'svg'
    })
    this.upvoteLottie.addEventListener('complete', (...args) => {
      this.isAnimating = false
    })
  },
  destroyed() {
    this.upvoteLottie.destroy()
  },
  watch: {
    isAnimating(value) {
      if (value) return this.upvoteLottie.play()
      return this.upvoteLottie.stop()
    }
  },
  methods: {
    onUpvote() {
      if (this.isVoted) return
      this.isAnimating = true
      this.$emit('upvoted', this.id)
    }
  }
}
</script>
