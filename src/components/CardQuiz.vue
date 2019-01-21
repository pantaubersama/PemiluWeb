<template>
  <div class="card card-quiz">
    <h4 class="title">Pendidikan Politik</h4>
    <div class="quiz-content" v-for="quiz in feedsQuiz" :key="quiz.id">
      <img :src="quiz.image.url">
      <div class="quiz-desc">
        <h3>{{quiz.title}}</h3>
        <p>{{quiz.quiz_questions_count}} Pertanyaan</p>
        <div v-if="quiz.participation_status == 'not_participating'">
          <button type="button" class="btn btn-warning">Ikuti</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'CardQuiz',
  computed: {
    ...mapState('homeQuiz', ['feedsQuiz'])
  },
  created() {
    this.$store.dispatch('homeQuiz/homeQuiz')
  }
}
</script>
