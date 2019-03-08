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

        <li v-if="feedsQuestions" >
          <div v-for="(question, index) in feedsQuestions" :key="index">
            <tanya-item
              v-if="index <= 4"
              :id="question.id"
              :me="me.id"
              :title="question.user.about"
              :question="question.body"
              :time="question.created_at_in_word.id"
              :name="question.user.full_name"
              :userId="question.user.id"
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
          </div>
        </li>
        <li v-if="loadingAnimating">
          <TanyaLoader/>
        </li>
        <router-link
          to="/pendidikan-politik"
          class="load-more"

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
import { mapState, mapActions, mapGetters } from 'vuex'
import TanyaItem from '@/components/Home/CardTanyaItem'
import TanyaLoader from '@/components/Loading/TanyaLoader'
import ShareOptions from '@/mixins/share-options'
import ModalShare from '@/components/modal-share'
export default {
  name: 'CardTanya',
  components: {
    BottomArrow,
    IconDots,
    TanyaItem,
    TanyaLoader,
    ModalShare
  },
  mixins: [ShareOptions],
  data() {
    return {
      shareTitle: 'Kamu setuju pertanyaan ini? Upvote dulu, dong ⬆',
      isSharing: false,
      shareId: '',
      loadingAnimating: true
    }
  },
  computed: {
    ...mapState({
      feedsQuestions: state => state.pendidikanPolitik.questions,
      me: state => state.profile.user
    }),
    shareURL() {
      return `/share/tanya/`
    }
  },
  created() {
    this.fetchDataQuestions()
  },
  methods: {
    ...mapActions(['fetchQuestions','vote', 'unVote', 'postReport']),
    fetchDataQuestions() {
      const payload = {
        page: 1,
        perPage: 150,
        query: '',
        operator: 'and',
        match: 'word_start',
        orderBy: this.filterUrutan,
        direction: 'desc',
        filter: this.filterUser
      }
      this.fetchQuestions(payload).then(async () => {
      await setTimeout(() => (this.loadingAnimating = false), 1000)
    })
    },
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
        `${process.env.SHARE_DOMAIN}/share/tanya/${id}`
      )
      this.$clipboard(url)
      this.$toaster.info('Berhasil menyalin teks.')
    }
  }
}
</script>
