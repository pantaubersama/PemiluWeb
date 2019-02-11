<template>
  <div class="card card-tanya">
    <h4 class="title">Tanya Kandidat</h4>
    <div class="tanya-content">
      <ModalShare
        :id="shareId"
        v-if="isSharing"
        @close="isSharing = false"
        :url="shareURL"
        :title="shareTitle"
      />
      <ul class="question-list">
        <li class="card-list" v-for="question in feedsQuestions" :key="question.id">
          <tanya-item
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
          ></tanya-item>
        </li>
        <li v-if="loadingAnimating">
          <ContentLoader/>
        </li>
        <router-link
          to="/pendidikan-politik"
          class="load-more"
          v-if="!paginations.isLast"
        >Tampilkan lebih banyak
          <div class="arrow-icon">
            <bottom-arrow/>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import * as PenpolAPI from '@/services/api/modules/pendidikan-politik'
import { cleanURL } from '@/utils'
import { BottomArrow, IconDots } from '@/svg/icons'
import { mapState, mapActions } from 'vuex'
import LoadingLottie from '@/components/LoadingLottie'
import TanyaItem from '@/components/Home/CardTanyaItem'
import ContentLoader from '@/components/Loading/ContentLoader'
import ShareOptions from '@/mixins/share-options'
import ModalShare from '@/components/modal-share'
export default {
  name: 'CardTanya',
  components: {
    BottomArrow,
    IconDots,
    LoadingLottie,
    TanyaItem,
    ContentLoader,
    ModalShare
  },
  mixins: [ShareOptions],
  data() {
    return {
      shareTitle: 'Kamu setuju pertanyaan ini? Upvote dulu, dong ⬆',
      isSharing: false,
      shareId: ''
    }
  },
  computed: {
    ...mapState('homeQuestions', ['feedsQuestions', 'paginations']),
    ...mapState('loadingLottie', ['loadingAnimating']),
    shareURL() {
      return `/pendidikan-politik/detail/`
    }
  },
  created() {
    this.$store.dispatch('homeQuestions/homeQuestions')
  },
  methods: {
    ...mapActions(['vote', 'unVote', 'postReport']),
    loadMore() {
      if (this.paginations.isLast === false) {
        this.$store.dispatch('homeQuestions/nextPage')
        this.$store.dispatch('homeQuestions/updateHomeQuestions')
      }
    },
    onUpvote(id) {
      this.vote(id).then(() => this.$store.commit('homeQuestions/setVoted', id))
    },
    onRemoveVote(id) {
      this.unVote(id).then(() =>
        this.$store.commit('homeQuestions/removeVoted', id)
      )
    },
    modalShare(id) {
      this.isActive = false
      this.shareId = id
      this.isSharing = true
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
    }
  }
}
</script>
