<template>
  <div class="card card-quiz-detail">
    <div class="quiz-content">
      <div class="quiz-background">
        <slot name="background"></slot>
      </div>
      <div class="quiz-panel">
        <slot name="title">
          <h3>Quiz Minggu ke-2</h3>
          <p>7 Pertanyaan</p>
        </slot>
        <slot name="description">
          <p>Pilihlah salah satu jawaban yang paling kamu sukai dari 2 pilihan yang ada. Ikuti kuis hingga selesai dan tunggu kejutan hasilnya</p>
          <button type="button" class="btn btn-block btn-primary">LANJUT</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardQuestionLayout'
}
</script>
