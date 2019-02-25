<template>
  <div class="question-item">
    <button class="vote" :class="{ voted: isVoted }" @click="onUpvote(isVoted)">
      <i v-show="!isAnimating" class="icon voteup" :class="{ voted: isVoted }"></i>
      <div v-show="isAnimating" class="upvote-lottie icon vote-up" ref="upvote"></div>
      <div class="total-count">{{count}}</div>
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
      <router-link :to="{name: 'PendidikanPolitikDetail', params: {id:id}}">
        <div class="question" v-html="trimCharacters(question, 150)"></div>
      </router-link>
      <div class="icon-right">
        <a href class="icon-share" @click.prevent="$emit('onShare', id)">
          <img src="@/assets/icon_share.svg">
        </a>
        <a
          href
          class="icon-setting"
          :class="{'is-active': isActive == id}"
          @click.prevent="$emit('toggleDropdown', $event)"
        >
          <img class="icon-dots" src="@/assets/dots-icon.svg" alt>
        </a>
        <div class="dropdown-content">
          <ul>
            <!-- TODO: tampilkan button hapus jika user sdh login, dan ini adalah postingannya -->
            <!-- <li v-if="userAuth">
              <a href="javascript:void(0)">
                <close-icon/>Hapus
              </a>
            </li>-->
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
              <a href="javascript:void(0)" @click.stop="$emit('onReport', id)">
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
import {
  IconDots,
  LinkIcon,
  AlertIcon,
  ShareIcon,
  CloseIcon
} from '@/svg/icons'
import lottie from 'lottie-web'
export default {
  name: 'CardTanyaItem',
  components: {
    IconDots,
    LinkIcon,
    AlertIcon,
    ShareIcon,
    CloseIcon
  },
  props: {
    id: String,
    name: String,
    avatar: String,
    title: String,
    time: String,
    question: String,
    userId: String,
    isVoted: Boolean,
    count: Number,
    isActive: [Boolean, String]
  },
  data() {
    return {
      upvoteLottie: null,
      isAnimating: false
      // isActive: false
    }
  },
  created() {
    window.addEventListener('click', this.removeDropdown)
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
    },
    trimCharacters(text, maxLength) {
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
<style lang="sass" scoped>
.question-item
  border-top: 1px solid #ececec
  margin-top: -1px
</style>
