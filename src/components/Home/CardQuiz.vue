<template>
  <div class="card card-quiz" v-if="feedsQuiz != ''">
    <h4 class="title">Pendidikan Politik</h4>
    <div class="quiz-content" v-for="quiz in feedsQuiz" :key="quiz.id">
      <img :src="quiz.image.url" alt="thumbnail">
      <div class="quiz-desc">
        <h3 v-html="trimCharacters(quiz.title, 30)"></h3>
        <p>{{ quiz.quiz_questions_count }} Pertanyaan</p>
        <div v-if="quiz.participation_status == 'not_participating'">
          <router-link
            class="btn btn-warning"
            :to="{name: 'PendidikanPolitikQuizIkuti', params: { id: quiz.id }}"
          >Ikuti</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CardQuiz',
  computed: {
    ...mapState('homeQuiz', ['feedsQuiz'])
  },
  created() {
    this.$store.dispatch('homeQuiz/homeQuiz')
  },
  methods: {
    trimCharacters(text, maxLength) {
      const dots = text.length > maxLength
      if (dots) {
        text = text.substr(0, maxLength)
        text = text.substr(0, Math.min(text.length, text.lastIndexOf(' ')))
      }
      return dots ? `${text}` : text
    }
  }
}
</script>
