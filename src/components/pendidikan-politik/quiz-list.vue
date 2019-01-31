<template>
  <div class="quiz-list">
    <div class="total-kecenderungan">
      <div class="total-kecenderungan-bg">
        <img src="@/assets/image-banner-pendidikan-quiz-1.svg" alt="thumbnail">
      </div>
      <div class="total-kecenderungan-content">
        <div class="content-text">
          <p
            class="title"
          >Total Kecenderunganmu, {{totalKecenderungan.finishedQuiz}} Dari {{totalKecenderungan.totalQuiz}} Kuis:</p>
          <p class="total">{{totalKecenderungan.percentage}}% ({{totalKecenderungan.groupName}})</p>
        </div>
        <button class="share-btn" @click.stop="shareKecenderungan()">
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
            <a
              href="javascript:void(0)"
              class="share"
              @click.stop="shareQuiz(quiz.participation_status, quiz.id)"
            >
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

    <ModalShare
      v-if="isSharing === 'kuis'"
      @close="isSharing = false"
      :url="shareURL"
      title="Iseng-iseng serius main Quiz ini dulu. Kira-kira masih cocok apa ternyata malah nggak cocok, yaa 😶"
      quote="Iseng-iseng serius main Quiz ini dulu. Kira-kira masih cocok apa ternyata malah nggak cocok, yaa 😶"
    />
    <ModalShare
      v-if="isSharing === 'kecenderungan'"
      @close="isSharing = false"
      title="Hmm.. Ternyata begini kecenderunganku 👀"
      quote="Hmm.. Ternyata begini kecenderunganku 👀"
      :url="shareURL"
    />
  </div>
</template>

<script>
import ModalShare from '@/components/modal-share'

export default {
  name: 'QuizList',
  components: { ModalShare },
  props: {
    quizzes: {
      type: Array,
      required: true
    },
    totalKecenderungan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      shareURL: null,
      isSharing: false
    }
  },
  methods: {
    shareKecenderungan() {
      const url = '/share/kecenderungan'
      this.shareURL = url
      this.isSharing = 'kecenderungan'
    },
    shareQuiz(type, quizId) {
      const url = `/share/${type}/${quizId}`
      this.shareURL = url
      this.isSharing = 'kuis'
    }
  }
}
</script>
