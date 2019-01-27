<template>
  <div class="quiz-list">
    <div class="total-kecenderungan">
      <div class="total-kecenderungan-bg">
        <img src="@/assets/image-banner-pendidikan-quiz-1.svg" alt>
      </div>
      <div class="total-kecenderungan-content">
        <div class="content-text">
          <p class="title">Total Kecenderunganmu, 4 Dari 6 Kuis:</p>
          <p class="total">70% (Jokowi-Ma'ruf)</p>
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
              class="btn btn-primary torquoise"
              :to="{name: 'PendidikanPolitikQuizHasil', params: { id: quiz.id }}"
            >Hasil >></router-link>
          </div>
        </div>
      </li>
      <!-- <li class="quiz-item">
        <div class="artwork-container">
          <img src="@/assets/image-quiz-1.svg" class="quiz-artwork">
        </div>
        <div class="info-container">
          <h3 class="title">Quiz Minggu ke-3</h3>
          <span class="question-count">7 Pertanyaan</span>
          <div class="container-action">
            <a href="#" class="share">
              <i class="icon icon-share"></i> Bagikan
            </a>
            <router-link
              class="btn btn-primary orange"
              :to="{name: 'PendidikanPolitikQuizIkuti'}"
            >Ikuti >></router-link>
          </div>
        </div>
      </li>
      <li class="quiz-item">
        <div class="artwork-container">
          <img
            src="@/assets/image-quiz-2.png"
            srcset="@/assets/image-quiz-2@2x.png 2x, @/assets/image-quiz-2@3x.png 3x"
            class="quiz-artwork"
          >
        </div>
        <div class="info-container">
          <h3 class="title">Quiz Minggu ke-2</h3>
          <span class="question-count">5 Pertanyaan</span>
          <div class="container-action">
            <a href="#" class="share">
              <i class="icon icon-share"></i> Bagikan
            </a>
            <router-link
              class="btn btn-primary red"
              :to="{name: 'PendidikanPolitikQuizLanjut'}"
            >Lanjut >></router-link>
          </div>
        </div>
      </li>
      <li class="quiz-item">
        <div class="artwork-container">
          <img src="@/assets/image-quiz-3.svg" class="quiz-artwork">
        </div>
        <div class="info-container">
          <h3 class="title">Quiz Minggu ke-2</h3>
          <span class="question-count">5 Pertanyaan</span>
          <div class="container-action">
            <a href="#" class="share">
              <i class="icon icon-share"></i> Bagikan
            </a>
            <router-link
              class="btn btn-primary torquoise"
              :to="{name: 'PendidikanPolitikQuizHasil'}"
            >Hasil >></router-link>
          </div>
        </div>
      </li>-->
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'QuizList',
  computed: {
    ...mapGetters({
      quizzes: 'quizzes'
    })
  },
  mounted() {
    this.$store.dispatch('listAllQuiz')
  }
}
</script>
