<template>
  <div class="card card-tanya">
    <h4 class="title">Tanya</h4>
    <div class="tanya-content">
      <div class="card-list">
        <div class="group-content">
          <div class="content-count">
            <button class="vote" @click="onUpvote()">
              <i v-show="!isAnimating" class="icon voteup" :class="{ voted: isVoted }"></i>
              <div v-show="isAnimating" class="upvote-lottie icon vote-up" ref="upvote"></div>
              <div class="total-count">100</div>
            </button>
          </div>
          <div class="content-desc">
            <div class="title-desc">
              <div class="title-thumb">
                <img src="@/assets/trump.jpg" alt>
              </div>
              <div class="title-center">
                <h5>Ariel Tatum Similikiti,</h5>
                <p>Kapan Kemana Indonesia?</p>
              </div>
              <div class="title-right">8 days ago</div>
            </div>
            <div
              class="desc-text"
            >Kapan realisasi penghapusan system tenaga kerja alih daya diterapkan seutuhnya? Kita ini insan bukan seekor sapi!</div>
            <div class="desc-icon">
              <a href>
                <img src="@/assets/icon_share.svg">
              </a>
              <a href class="icon-setting">
                <icon-dots/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="load-more">Tampilkan lebih banyak
        <div class="arrow-icon">
          <bottom-arrow/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BottomArrow, IconDots } from '@/svg/icons'
import lottie from 'lottie-web'
export default {
  name: 'CardTanya',
  data() {
    return {
      upvoteLottie: null,
      isAnimating: false,
      isVoted: false
    }
  },
  components: {
    BottomArrow,
    IconDots
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
      this.isAnimating = true
      this.isVoted = true
    }
  }
}
</script>
