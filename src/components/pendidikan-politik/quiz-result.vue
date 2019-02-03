<template>
  <div class="card card-quiz-result">
    <div class="quiz-content">
      <div class="quiz-description">
        <h5 class="title">RESULT</h5>
        <p>
          Dari hasil pilihan {{ title }}
          <br>
          <strong>{{ fullName }}</strong>
          lebih suka jawaban dari
          <br>
          {{ teamName }}
        </p>
      </div>
      <div class="quiz-description--curve">&nbsp;</div>
      <div class="quiz-description--content">
        <img class="thumbnail rounded-circle" :src="teamAvatar" :alt="teamName" v-if="teamAvatar">
        <img class="thumbnail rounded-circle" src="@/assets/user.svg" alt="paslon" v-else>
        <h6 class="percentage">{{ choice.percentage }}%</h6>
        <span class="subtitle">{{ teamName }}</span>
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

import { meta } from '@/utils'
import { ShareIcon } from '@/svg/icons'
import { PurpleWaveBackground } from '@/svg/backgrounds'
import QuizModalJawaban from '@/components/pendidikan-politik/quiz-modal-jawaban'
import ModalShare from '@/components/modal-share'

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
  beforeCreate() {
    const id = this.$route.params.id
    this.$store.dispatch('getQuizResult', id)
  },
  computed: {
    ...mapState({
      quizzesResult: state => state.pendidikanPolitik.quizzesResult
    }),
    choice() {
      if (!this.quizzesResult || !this.quizzesResult.teams) return {}
      return this.quizzesResult.teams.find(t => Math.max(t.percentage))
    },
    title() {
      if (!this.quizzesResult || !this.quizzesResult.quiz) return ''
      return this.quizzesResult.quiz.title
    },
    fullName() {
      if (!this.quizzesResult || !this.quizzesResult.user) return ''
      return this.quizzesResult.user.full_name
    },
    teamName() {
      if (!this.choice || !this.choice.team) return ''
      return this.choice.team.title
    },
    teamAvatar() {
      if (!this.choice || !this.choice.team) return null
      return this.choice.team.avatar
    },
    imageThumbnail() {
      if (
        !this.quizzesResult ||
        !this.quizzesResult.quiz_participation ||
        !this.quizzesResult.quiz_participation.image_result
      ) {
        return null
      }
      return this.quizzesResult.quiz_participation.image_result.url
    },
    fullURL() {
      const baseURL = process.env.BASE_URL
      if (!this.$route.path) return baseURL
      return `${baseURL}${this.$route.path}`
    }
  },
  metaInfo() {
    return {
      ...meta({
        title: `Hasil Kuis ${this.title}`,
        content: 'Kamu sudah ikut? Aku sudah dapat hasilnya 😎',
        description: `Dari hasil pilihan ${this.title} ${this.fullName}
          lebih suka jawaban dari ${this.teamName}`,
        image: this.imageThumbnail,
        url: this.fullURL
      })
    }
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
