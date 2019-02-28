<template>
  <div v-if="data">
    <ModalShare
      v-if="isSharing"
      @close="isSharing = false"
      :url="shareURL"
      :title="shareTitle"
      :id="data.id"
    ></ModalShare>
    <div class="page card pendidikan-politik">
      <div class="question-item">
        <button class="vote" :class="{ voted: data.is_liked }" @click="onUpvote()">
          <i v-show="!isAnimating" class="icon voteup" :class="{ voted: data.is_liked }"></i>
          <button-upvote
            v-show="isAnimating"
            :isAnimating="isAnimating"
            @animated="isAnimating == false"
          />
          <span class="vote-count">{{ data.like_count }}</span>
        </button>

        <div class="content">
          <div class="meta">
            <img
              :src="data.user.avatar.thumbnail_square.url"
              alt="avatar"
              class="avatar"
              v-if="data.user.avatar.thumbnail_square.url"
            >
            <img src="@/assets/user.svg" alt="avatar" class="avatar" v-else>
            <div class="title">
              <div class="name">{{data.user.username}}</div>
              <small class="question-title">{{data.user.about}}</small>
            </div>
            <small class="time">{{data.created_at_in_word.id}}</small>
          </div>
          <div class="question">{{data.body}}</div>
          <div class="button-list">
            <button class="share" @click.stop="onShare(data.id)">
              <img src="@/assets/icon_share.svg">
            </button>
            <button
              class="icon-setting"
              :class="{'is-active': isActive == data.id}"
              @click.stop="toggleDropdown(data.id, $event)"
            >
              <img src="@/assets/dots-icon.svg">
            </button>
            <div class="dropdown-content">
              <ul>
                <li>
                  <a href="javascript:void(0)" @click.stop="copyToClipboard(data.id)">
                    <link-icon/>Salin Tautan
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click.stop="onShare(data.id)">
                    <share-icon/>Bagikan
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click.stop="handleReport(data.id)">
                    <alert-icon/>Laporkan sebagai spam
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link v-if="user.id == data.user.id " class="card card-author" :to="{path: '/profile'}">
      <div class="author-thumb">
        <img
          :src="data.user.avatar.medium_square.url"
          v-if="data.user.avatar.medium_square.url"
          alt
        >
        <img src="@/assets/user.svg" alt v-else>
      </div>
      <div class="author-name">{{ data.user.full_name }}</div>
      <p>{{ data.user.about }}</p>
      <div class="time-posted">Posted {{ data.created_at_in_word.id }}</div>
    </router-link>
    <router-link v-else class="card card-author" :to="{path: '/profile/user', query: {id: data.user.id}}">
      <div class="author-thumb">
        <img
          :src="data.user.avatar.medium_square.url"
          v-if="data.user.avatar.medium_square.url"
          alt
        >
        <img src="@/assets/user.svg" alt v-else>
      </div>
      <div class="author-name">{{ data.user.full_name }}</div>
      <p>{{ data.user.about }}</p>
      <div class="time-posted">Posted {{ data.created_at_in_word.id }}</div>
    </router-link>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import lottie from 'lottie-web'
import { LinkIcon, AlertIcon, ShareIcon } from '@/svg/icons'
import ShareOptions from '@/mixins/share-options'
import { cleanURL } from '@/utils'
import ModalShare from '@/components/modal-share'
import ButtonUpvote from '@/components/pendidikan-politik/button-upvote'
export default {
  name: 'DetailPost',
  mixins: [ShareOptions],
  components: {
    LinkIcon,
    AlertIcon,
    ShareIcon,
    lottie,
    ModalShare,
    ButtonUpvote
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      upvoteDetail: null,
      isAnimating: false,
      shareTitle: 'Kamu setuju pertanyaan ini? Upvote dulu, dong ⬆',
      isSharing: false,
      shareId: ''
    }
  },

  computed: {
    ...mapState('profile', ['user']),
    shareURL() {
      return `/share/tanya/`
    }
  },
  methods: {
    ...mapActions(['postReport']),
    onUpvote() {
      const id = this.data.id
      const vote = this.data.is_liked

      this.isAnimating = !vote
      if (vote) {
        this.$emit('removeVoted', id)
      } else {
        this.$emit('upvoted', id)
      }
    },
    copyToClipboard(id) {
      const url = cleanURL(
        `${process.env.SHARE_DOMAIN}/share/tanya/${id}`
      )
      this.$clipboard(url)
      this.isActive = false
      this.$toaster.info('Berhasil menyalin teks.')
    },
    handleReport(id) {
      this.postReport(id)
        .then(response => {
          const { vote } = response
          if (vote && vote.status) {
            this.$toaster.success('Berhasil laporkan sebagai spam.')
          } else {
            this.$toaster.warning(vote.text)
          }
        })
        .catch(() => this.$toaster.error('Gagal laporkan sebagai spam.'))
      this.isActive = false
    },
    onShare(id) {
      this.isActive = false
      this.shareId = id
      this.isSharing = true
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

    &.is-active
      display: block
</style>
