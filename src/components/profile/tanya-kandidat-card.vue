<template>
  <ul class="question-list">
    <ModalShare
      :id="shareId"
      v-if="isSharing"
      @close="isSharing = false"
      :url="shareURL"
      :title="shareTitle"
    />
    <div v-if="questions != ''">
    <li v-if="loading" :style="{'margin': '10px 0', 'border-width': 0}">
      <ContentLoader/>
    </li>
    <li v-for="question in questions" :key="question.id" v-else>
      <question-item
        :id="question.id"
        :title="question.user.about"
        :question="question.body"
        :time="question.created_at_in_word.id"
        :name="question.user.full_name"
        :avatar="question.user.avatar.thumbnail_square.url"
        :is-voted="question.is_liked"
        :count="question.like_count"
        @upvoted="onUpvote($event)"
        @removeVoted="onRemoveVote($event)"
        @onCopy="copyToClipboard(question.id, $event)"
        @onShare="modalShare(question.id, $event)"
        :isActive="isActive"
        @toggleDropdown="toggleDropdown(question.id, $event)"
        @onReport="handleReport(question.id, $event)"
      ></question-item>
    </li>
    <div class="load-more" @click="$emit('loadMorePenPol')" v-if="!paginationsPenPol.isLast && questions.length > 4">Tampilkan lebih banyak
        <div class="arrow-icon">
          <bottom-arrow/>
        </div>
      </div>
    </div>
    <LottieEmpty v-if="showLottieTanya" :message="'Belum pernah membuat pertanyaan'"/>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { utils } from '@/mixins/utils'
import { cleanURL } from '@/utils'
import { BottomArrow } from '@/svg/icons'
import LottieEmpty from '@/components/LottieEmpty'
import * as PenpolAPI from '@/services/api/modules/pendidikan-politik'
import ModalShare from '@/components/modal-share'
import ContentLoader from '@/components/Loading/ContentLoader'
import QuestionItem from '@/components/pendidikan-politik/question-item'
import ShareOptions from '@/mixins/share-options'
export default {
  name: 'TanyaKandidatCard',
  components: {
    QuestionItem,
    ContentLoader,
    ModalShare,
    LottieEmpty,
    BottomArrow
  },
  mixins: [utils, ShareOptions],
  props: {
    questions: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    paginationsPenPol: Object
  },
  data() {
    return {
      modal: false,
      isSubmitting: false,
      shareTitle: 'Kamu setuju pertanyaan ini? Upvote dulu, dong ⬆',
      isSharing: false,
      isActive: false,
      shareId: ''
    }
  },
  computed: {
    ...mapState({
      user: s => s.profile.user,
      isLoggedIn: s => s.profile.token != null,
      showLottieTanya: s => s.showLottie.showLottieTanya
    }),
    shareURL() {
      return `/pendidikan-politik/detail/`
    }
  },
  methods: {
    ...mapActions(['vote', 'unVote', 'postReport']),
    onUpvote(id) {
      this.vote(id).then(() => this.$store.commit('profile/setVoted', id))
    },
    onRemoveVote(id) {
      this.unVote(id).then(() => this.$store.commit('profile/removeVoted', id))
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
    copyToClipboard(id) {
      this.isActive = false
      const url = cleanURL(
        `${process.env.BASE_URL}/pendidikan-politik/detail/${id}`
      )
      this.$clipboard(url)
      this.$toaster.info('Berhasil menyalin teks.')
    },
    modalShare(id) {
      this.isActive = false
      this.shareId = id
      this.isSharing = true
    },
    modalCreate() {
      this.modal = 'modalCreate'
    },
    closeModal() {
      this.modal = false
    }
  }
}
</script>

<style lang="sass" scoped>
.question-list
  display: flex
  flex-direction: column
  li
    border-bottom: 1px solid #ececec
    border-left: 0
    border-right: 0
    &:last-child
      border-bottom: none
    *
      width: 100%

  button.add-question
    background: #fef8e3
    border: none
    display: flex
    flex-direction: column
    padding: 10px 25px 0
    text-align: left
    cursor: pointer

    .avatar-container
      .avatar
        display: inline-block
        height: 20px
        width: 20px
        overflow: hidden
        object-fit: cover
        border-radius: 50%
      .name
        font-family: Lato
        font-size: 11px
        font-weight: bold
        line-height: 1.18
        color: #212121
    .trigger
      font-family: Lato
      font-size: 14px
      font-weight: bold
      line-height: 1.22
      color: #4f4f4f
      padding: 5px 0
      @media (max-width: 575px)
        font-size: 14px

.empty-wrapper
  padding: 15px
  text-align: center
  p
    margin-bottom: 0

  .lottie-empty
    max-width: 200px
    height: 200px
    margin: 0 auto 10px
</style>
