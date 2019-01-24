<template>
  <div class="card card-quiz-result">
    <div class="quiz-content">
      <div class="quiz-description">
        <h5 class="title">RESULT</h5>
        <p>
          Dari hasil pilihan Quiz minggu pertama,
          <strong>Allan Wahyu</strong> lebih suka Paslon 01
        </p>
      </div>
      <div class="quiz-description--curve">&nbsp;</div>
      <div class="quiz-description--content">
        <img class="thumbnail rounded-circle" src="@/assets/dildo.jpg" alt="paslon">
        <h6 class="percentage">70%</h6>
        <span class="subtitle">Nurhadi - Aldo</span>
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
import { PurpleWaveBackground } from '@/svg/backgrounds'
import { ShareIcon } from '@/svg/icons'
import QuizModalJawaban from '@/components/pendidikan-politik/quiz-modal-jawaban'

export default {
  name: 'QuizResult',
  components: {
    PurpleWaveBackground,
    ShareIcon,
    QuizModalJawaban
  },
  props: {
    showModal: Boolean
  }
}
</script>
