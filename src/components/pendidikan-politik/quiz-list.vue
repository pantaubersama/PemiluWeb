<template>
  <div class="quiz-list">
    <div class="total-kecenderungan">
      <div class="total-kecenderungan-bg">
        <img src="@/assets/image-banner-pendidikan-quiz-1.svg" alt>
      </div>
      <div class="total-kecenderungan-content">
        <div class="content-text">
          <p
            class="title"
          >Total Kecenderunganmu, {{totalKecenderungan.finishedQuiz}} Dari {{totalKecenderungan.totalQuiz}} Kuis:</p>
          <p class="total">{{totalKecenderungan.percentage}}% ({{totalKecenderungan.groupName}})</p>
        </div>
        <button class="share-btn">
          <i class="icon icon-share"></i>
        </button>
      </div>
    </div>
    <ul>
      <li class="quiz-item" v-for="quiz in quizzes" :key="quiz.id">
        <div class="artwork-container">
          <img :src="quiz.image.url">
        </div>
        <div class="info-container">
          <h3 class="title">{{quiz.title}}</h3>
          <span class="question-count">{{quiz.quiz_questions_count}} Pertanyaan</span>
          <div class="container-action">
            <a href="javascript:void(0)" class="share">
              <i class="icon icon-share"></i> Bagikan
            </a>
            <router-link
              v-if="quiz.participation_status === 'not_participating'"
              class="btn btn-primary orange"
              :to="{name: 'PendidikanPolitikQuizIkuti', params: { id: quiz.id }}"
            >Ikuti >></router-link>
            <router-link
              v-if="quiz.participation_status === 'in_progress'"
              class="btn btn-primary red"
              :to="{name: 'PendidikanPolitikQuizLanjut', params: { id: quiz.id }}"
            >Lanjut >></router-link>
            <router-link
              v-if="quiz.participation_status === 'finished'"
              class="btn btn-primary turquoise"
              :to="{name: 'PendidikanPolitikQuizHasil', params: { id: quiz.id }}"
            >Hasil >></router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'QuizList',
  computed: {
    ...mapGetters({
      quizzes: 'quizzes'
    }),
    ...mapState({
      totalKecenderungan: s => s.pendidikanPolitik.totalKecenderungan
    })
  },
  mounted() {
    this.$store.dispatch('listAllQuiz')
    this.$store.dispatch('getTotalKecenderungan')
  }
}
</script>
