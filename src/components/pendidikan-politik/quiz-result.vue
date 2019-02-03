<template>
  <div class="card card-quiz-result">
    <div class="quiz-content">
      <div class="quiz-description">
        <h5 class="title">RESULT</h5>
        <p>
          Dari hasil pilihan Quiz minggu pertama,
          <strong>{{quizzesResult.user.full_name}}</strong>
          lebih suka Paslon {{ choice.team.id }}
        </p>
      </div>
      <div class="quiz-description--curve">&nbsp;</div>
      <div class="quiz-description--content">
        <img
          class="thumbnail rounded-circle"
          :src="choice.team.avatar"
          :alt="choice.team.title"
          v-if="choice.team.avatar"
        >
        <img class="thumbnail rounded-circle" src="@/assets/dildo.jpg" alt="paslon" v-else>
        <h6 class="percentage">{{ choice.percentage }}%</h6>
        <span class="subtitle">{{ choice.team.title }}</span>
        <a
          href="javascript:void(0)"
          class="share"
          @click.prevent="share(`/share/hasilkuis/${quizzesResult.quiz_participation.id}`, 'Kamu sudah ikut? Aku sudah dapat hasilnya 😎')"
        >
          <share-icon></share-icon>BAGIKAN
        </a>
        <div class="block-bottom">
          <a
            class="block-bottom--title"
            @click="$emit('onClickAnswerButton')"
          >Lihat kunci jawaban >>></a>
        </div>
      </div>
    </div>
    <div class="quiz-background">
      <purple-wave-background></purple-wave-background>
    </div>

    <quiz-modal-jawaban
      v-if="showModal"
      @close="$emit('onClickNextButton', showModal)"
      @click.stop="$emit('onClickNextButton', showModal)"
    />
    <ModalShare v-if="isSharing" :url="shareURL" :title="shareTitle" @close="isSharing = false"></ModalShare>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ModalShare from '@/components/modal-share'
import { ShareIcon } from '@/svg/icons'
import { PurpleWaveBackground } from '@/svg/backgrounds'
import QuizModalJawaban from '@/components/pendidikan-politik/quiz-modal-jawaban'

export default {
  name: 'QuizResult',
  components: {
    PurpleWaveBackground,
    ShareIcon,
    QuizModalJawaban,
    ModalShare
  },
  props: {
    showModal: Boolean
  },
  data() {
    return {
      isSharing: false,
      shareURL: null,
      shareTitle: null
    }
  },
  computed: {
    ...mapState({
      quizzesResult: state => state.pendidikanPolitik.quizzesResult
    }),
    choice() {
      return this.quizzesResult.teams.find(t => Math.max(t.percentage))
    }
  },
  created() {
    const id = this.$route.params.id
    this.$store.dispatch('getQuizResult', id)
  },
  methods: {
    share(url, title) {
      this.shareURL = url
      this.shareTitle = title
      this.isSharing = true
    }
  }
}
</script>
