<template>
  <div>
    <card-question-layout>
      <meditation-illustration slot="background"></meditation-illustration>
      <div slot="title" class="quiz-title">
        <div class="quiz-title">
          <h3>Quiz Minggu ke-2</h3>
          <p>7 Pertanyaan</p>
        </div>
      </div>

      <div slot="description" class="quiz-description">
        <p>Pilihlah salah satu jawaban yang paling kamu sukai dari 2 pilihan yang ada. Ikuti kuis hingga selesai dan tunggu kejutan hasilnya</p>
        <button
          type="button"
          class="btn btn-block btn-primary"
          @click.stop="$emit('onClickNextButton', showModal)"
        >LANJUT</button>
      </div>
    </card-question-layout>

    <question-modal
      v-if="showModal"
      @onClickChoicesButton="(choice) => $emit('onClickChoicesButton', choice)"
      v-on:close="$emit('onClickNextButton', showModal)"
      @click.stop="$emit('onClickNextButton', showModal)"
    />
  </div>
</template>

<script>
import { MeditationIllustration } from '@/svg/illustrations'
import CardQuestionLayout from '@/layout/CardQuestion'
import QuestionModal from '@/components/pendidikan-politik/question-modal'

export default {
  name: 'QuizDetail',
  components: {
    MeditationIllustration,
    QuestionModal,
    CardQuestionLayout
  },
  props: {
    showModal: Boolean
  }
}
</script>
