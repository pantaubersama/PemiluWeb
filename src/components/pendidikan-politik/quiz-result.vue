<template>
  <div class="card card-quiz-result">
    <Headful
      type="hasil_kuis"
      :image="imageThumbnail"
      :url="fullURL"
    />
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
        <h6 class="percentage">{{ Math.ceil(choice.percentage) }}%</h6>
        <span class="subtitle">{{ teamName }}</span>
        <a
          href="javascript:void(0)"
          class="share"
          @click.prevent="share('/share/hasilkuis/',quizzesResult.quiz_participation.id, 'Kamu sudah ikut? Aku sudah dapat hasilnya 😎')"
        >
          <share-icon></share-icon>BAGIKAN
        </a>
        <div class="block-bottom">
          <a v-if="this.showKunciJawaban()"
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
    <ModalShare
      v-if="isSharing"
      :url="shareURL"
      :title="shareTitle"
      :id="shareId"
      @close="isSharing = false"
    ></ModalShare>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Headful from '@/components/Wrapper/Headful'

import { ShareIcon } from '@/svg/icons'
import { PurpleWaveBackground } from '@/svg/backgrounds'
import QuizModalJawaban from '@/components/pendidikan-politik/quiz-modal-jawaban'
import ModalShare from '@/components/modal-share'

export default {
  name: 'QuizResult',
  components: {
    Headful,
    PurpleWaveBackground,
    ShareIcon,
    QuizModalJawaban,
    ModalShare
  },
  props: {
    showModal: Boolean,
    hideKunciJawaban: Boolean,
    isPublic: Boolean
  },
  data() {
    return {
      isSharing: false,
      shareURL: null,
      shareTitle: null
    }
  },
  created() {
    const id = this.$route.params.id
    if(this.isPublic){
      this.$store.dispatch('getQuizResultDetail', id)
    }else{
      this.$store.dispatch('getQuizResult', id)
    }
  },
  computed: {
    ...mapState({
      quizzesResult: state => state.pendidikanPolitik.quizzesResult
    }),
    choice() {
      var selectedData = null
      if (!this.quizzesResult || !this.quizzesResult.teams) return {}
        if (this.quizzesResult.teams[0].percentage === 50.0) {
          selectedData = this.quizzesResult.teams[Math.floor(this.quizzesResult.teams.length * Math.random())]
        } else {
          selectedData = this.quizzesResult.teams.find(item => item.percentage === Math.max(...this.quizzesResult.teams.map(function(d) { return d.percentage })))
        }
      return selectedData
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
  methods: {
    share(url, id, title) {
      this.shareURL = url
      this.shareTitle = title
      this.shareId = id
      this.isSharing = true
    },

    showKunciJawaban(){
      return !this.hideKunciJawaban
    }
  }
}
</script>
