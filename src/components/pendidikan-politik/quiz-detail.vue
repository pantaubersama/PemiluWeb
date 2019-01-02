<template>
  <div class="card card-quiz-detail">
    <div class="quiz-content">
      <div class="quiz-background">
        <img src="@/assets/card-quiz.svg" alt="">
      </div>
      <div class="quiz-panel">
        <div class="quiz-title">
          <h3>Quiz Minggu ke-2</h3>
          <p>7 Pertanyaan</p>
        </div>
        <div class="quiz-description">
          <p>Pilihlah salah satu jawaban yang paling kamu sukai dari 2 pilihan yang ada. Ikuti kuis hingga selesai dan tunggu kejutan hasilnya</p>
          <button type="button" class="btn btn-block btn-primary"
            @click.stop="$emit('onClickNextButton', showModal)"
          >LANJUT</button>
        </div>
      </div>
    </div>
    <question-modal
      v-if="showModal"
      @onClickChoicesButton="(choice) => $emit('onClickChoicesButton', choice)"
      v-on:close="$emit('onClickNextButton', showModal)"
      @click.stop="$emit('onClickNextButton', showModal)"
    />
  </div>
</template>

<script>
import QuestionModal from '@/components/pendidikan-politik/question-modal'

export default {
  name: 'PendidikanPolitikQuiz',
  components: { QuestionModal },
  props: { showModal: Boolean }
}
</script>
