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
        <a href="#" class="share">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { ShareIcon } from '@/svg/icons'
import { PurpleWaveBackground } from '@/svg/backgrounds'
import QuizModalJawaban from '@/components/pendidikan-politik/quiz-modal-jawaban'

export default {
  name: 'QuizResult',
  computed: {
    ...mapState({
      quizzesResult: state => state.pendidikanPolitik.quizzesResult
    }),
    choice() {
      return this.quizzesResult.teams.find(t => Math.max(t.percentage))
    }
  },
  components: {
    PurpleWaveBackground,
    ShareIcon,
    QuizModalJawaban
  },
  props: {
    showModal: Boolean
  },
  created() {
    const id = this.$route.params.id
    this.$store.dispatch('getQuizResult', id)
  }
}
</script>
