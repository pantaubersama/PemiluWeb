<template>
  <div class="question-item">
    <button class="vote" :class="{ voted: isVoted }" @click="onUpvote(isVoted)">
      <i v-show="!isAnimating" class="icon voteup" :class="{ voted: isVoted }"></i>
      <div v-show="isAnimating" class="upvote-lottie icon vote-up" ref="upvote"></div>
      <span class="vote-count">{{ count }}</span>
    </button>
    <div class="content">
      <div class="meta">
        <router-link class="avatar-wrapper" :to="{path: '/profile/user', query: {id: userId}}">
        <img :src="avatar" alt="avatar" class="avatar" v-if="avatar">
        <img src="@/assets/user.svg" alt="avatar" class="avatar" v-else>
        <div class="title">
          <div class="name">{{name}}</div>
          <small class="question-title">{{title}}</small>
        </div>
        </router-link>
        <small class="time">{{time}}</small>
      </div>
      <router-link :to="{name: 'PendidikanPolitikDetail', params: {id: id}}">
        <div class="question">{{question}}</div>
      </router-link>
      <div class="button-list">
        <button class="share" @click.stop="$emit('onShare', id)">
          <img src="@/assets/icon_share.svg">
        </button>
        <button
          class="icon-setting"
          :class="{'is-active': isActive == id}"
          @click.prevent="$emit('toggleDropdown', $event)"
        >
          <img src="@/assets/dots-icon.svg">
        </button>
        <div class="dropdown-content">
          <ul>
            <li>
              <a href="javascript:void(0)" @click.stop="$emit('onCopy', id)">
                <link-icon/>Salin Tautan
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click.stop="$emit('onShare', id)">
                <share-icon/>Bagikan
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                @click.stop="() => {
                  $emit('onReport', id);
                }"
              >
                <alert-icon/>Laporkan sebagai spam
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import { LinkIcon, AlertIcon, ShareIcon } from '@/svg/icons'

export default {
  name: 'QuestionItem',
  components: {
    LinkIcon,
    AlertIcon,
    ShareIcon
  },
  props: {
    id: String,
    name: String,
    avatar: String,
    title: String,
    time: String,
    userId: String,
    question: String,
    isVoted: Boolean,
    count: Number,
    isActive: [Boolean, String]
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
    onUpvote(vote) {
      this.isAnimating = !vote
      if (vote) {
        this.$emit('removeVoted', this.id)
      } else {
        this.$emit('upvoted', this.id)
      }
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
  // &.voted
  //   cursor: default
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
  overflow: hidden
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
    &.is-active
      + .dropdown-content
        display: block

  .dropdown-content
    padding: 10px
    border-radius: 2px
    min-width: 175px
    top: auto
    bottom: auto
    margin-top: 24px
    margin-right: 20px

    a
      text-align: left
      font-size: 12px

    svg
      width: 25px
      height: 16px
      padding-right: 5px
      align-self: center

</style>
