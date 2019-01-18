<template>
  <div class="card card-tanya">
    <h4 class="title">Tanya</h4>
    <div class="tanya-content">
      <div class="card-list" v-for="questions in feedsQuestions" :key="questions.id">
        <div class="group-content">
          <div class="content-count">
            <button class="vote" @click="onUpvote()">
              <i class="icon voteup" :class="{ voted: isVoted }"></i>
              <!-- <div v-show="isAnimating" class="upvote-lottie icon vote-up" ref="upvote"></div>-->
              <div class="total-count">{{questions.like_count}}</div>
            </button>
          </div>
          <div class="content-desc">
            <div class="title-desc">
              <div class="title-thumb">
                <img
                  v-if="questions.user.avatar.url != null"
                  :src="questions.user.avatar.url"
                  :alt="questions.user.title"
                >
                <img src="@/assets/user.svg">
              </div>
              <div class="title-center">
                <h5>{{questions.user.full_name}},</h5>
                <p>{{questions.user.about}}</p>
              </div>
              <div class="title-right">{{questions.created_at_in_word.id}}</div>
            </div>
            <div class="desc-text">
              <p v-html="trimCharacters(questions.body, 150)"></p>
            </div>
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
      <loading-lottie v-if="loadingAnimating"/>
      <div class="load-more" @click="loadMore" v-if="!paginations.isLast">Tampilkan lebih banyak
        <div class="arrow-icon">
          <bottom-arrow/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BottomArrow, IconDots } from '@/svg/icons'
import { mapState, mapActions } from 'vuex'
import LoadingLottie from '@/components/LoadingLottie'
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
    IconDots,
    LoadingLottie
  },
  computed: {
    ...mapState('homeQuestions', ['feedsQuestions', 'paginations']),
    ...mapState('loadingLottie', ['loadingAnimating'])
  },
  created() {
    this.$store.dispatch('homeQuestions/homeQuestions')
  },
  // mounted() {
  //   this.upvoteLottie = lottie.loadAnimation({
  //     container: this.$refs.upvote,
  //     path: '/lottie/upvote.json',
  //     autoplay: false,
  //     renderer: 'svg'
  //   })
  //   this.upvoteLottie.addEventListener('complete', (...args) => {
  //     this.isAnimating = false
  //   })
  // },
  // destroyed() {
  //   this.upvoteLottie.destroy()
  // },
  // watch: {
  //   isAnimating(value) {
  //     if (value) return this.upvoteLottie.play()
  //     return this.upvoteLottie.stop()
  //   }
  // },
  methods: {
    // onUpvote() {
    //   this.isAnimating = true
    //   this.isVoted = true
    // },
    loadMore() {
      if (this.paginations.isLast === false) {
        this.$store.dispatch('homeQuestions/nextPage')
        this.$store.dispatch('homeQuestions/updateHomeQuestions')
      }
    },
    trimCharacters(text, maxLength = 350) {
      const dots = text.length > maxLength
      if (dots) {
        text = text.substr(0, maxLength)
        text = text.substr(0, Math.min(text.length, text.lastIndexOf(' ')))
      }
      return dots ? `${text}...` : text
    }
  }
}
</script>
