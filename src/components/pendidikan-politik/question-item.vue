<template>
  <div class="question-item">
    <button class="vote" @click="onUpvote()">
      <!-- <img v-show="!isAnimating" src="@/assets/icon-upvote.svg" alt="vote" class="icon vote-up"> -->
      <i v-show="!isAnimating" class="icon voteup" :class="{ voted: isVoted }"></i>
      <div v-show="isAnimating" class="upvote-lottie icon vote-up" ref="upvote"></div>
      <span class="vote-count">1k</span>
    </button>
    <div class="content">
      <div class="meta">
        <img :src="avatar" alt="avatar" class="avatar" v-if="avatar">
        <img src="@/assets/user.svg" alt="avatar" class="avatar" v-else>
        <div class="title">
          <div class="name">{{name}}</div>
          <small class="question-title">{{title}}</small>
        </div>
        <small class="time">{{time}}</small>
      </div>
      <div class="question">{{question}}</div>
      <div class="button-list">
        <button class="share">
          <img src="@/assets/icon_share.svg">
        </button>
        <button class="menu">
          <img src="@/assets/dots-icon.svg">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  name: 'QuestionItem',
  props: {
    id: String,
    name: String,
    avatar: String,
    title: String,
    time: String,
    question: String,
    isVoted: Boolean
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
      this.isAnimating = true
      this.$emit('upvoted', this.id)
    }
  }
}
</script>
<style lang="sass" scoped>
.question-item
  display: flex
  width: 100%

button.vote
  flex-basis: 50px
  width: 50px
  height: 81px
  background: white
  border: 1px solid #ececec
  border-left: 0
  border-top: 0
  cursor: pointer
  @media (max-width: 991px)
    height: auto
    border-bottom: none
    background-color: #f9f9f9
  .vote-count
    color: #727272
    font-size: 14px
  .icon.voteup
    background-color: #727272
    height: 35px
    width: 35px
    display: block;
    mask-image: url('~@/assets/icon-upvote.svg')
    &.voted
      background-color: #9b0012
  .icon.vote-up.upvote-lottie
    transform: scale(1.8) translateY(-7px)

.content
  flex: 1
  margin: 20px
  margin-top: 16.5px
  @media (max-width: 575px)
    margin: 15px
  .meta
    display: flex
    align-items: center
    .avatar
      flex: 0
      flex-basis: 32px
      height: 32px
      width: 32px
      border-radius: 50%
      overflow: hidden
      object-fit: cover
      @media (max-width: 575px)
        flex-basis: 28px
        height: 28px
        width: 28px
    .title
      flex: 2
      display: flex
      flex-direction: column
      margin-left: 5px
      .name
        font-size: 12px
        font-weight: bold
        line-height: 1.25
        text-align: left
        color: #212121
      .question-title
        font-size: 11px
        line-height: 1.18
        text-align: left
        color: #4f4f4f
    .time
      flex: 1
      text-align: right
      font-size: 11px
      line-height: 1.18
      color: #7c7c7c
      @media (max-width: 575px)
        font-size: 10px

  .question
    font-family: BwModelicaSS01, Lato
    font-size: 16px
    font-weight: bold
    font-stretch: condensed
    line-height: 1.38
    text-align: left
    color: #393939
    padding: 10px 0
    @media (max-width: 575px)
      font-size: 14px
      line-height: 19px

.button-list
  display: flex
  justify-content: flex-end

  button
    padding: 0
    width: 25px
    height: 25px
    display: inline-flex
    justify-content: center
    flex-direction: row
    margin-left: 5px
    cursor: pointer
    border: none
    background: none

    img
      object-fit: contain
      width: 18px
      height: 18px
</style>
