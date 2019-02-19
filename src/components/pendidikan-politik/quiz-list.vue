<template>
  <div class="quiz-list">
    <div class="total-kecenderungan" v-if="totalKecenderungan">
      <div class="total-kecenderungan-bg">
        <!-- <img src="@/assets/image-banner-pendidikan-quiz-1.svg" alt="thumbnail"> -->
        <img :src="totalKecenderungan.groupAvatar" alt="thumbnail">
      </div>
      <div class="total-kecenderungan-content">
        <div class="content-text" @click.stop="$emit('onClickKecenderungan')">
          <p
            class="title"
          >Total Kecenderunganmu, {{totalKecenderungan.finishedQuiz}} Dari {{totalKecenderungan.totalQuiz}} Kuis:</p>
          <p class="total">{{totalKecenderungan.percentage}}% ({{totalKecenderungan.groupName}})</p>
        </div>
        <button
          class="share-btn"
          @click.prevent="share(`/share/kecenderungan/`,totalKecenderungan.userId, 'Hmm.. Ternyata begini kecenderunganku 👀')"
        >
          <i class="icon icon-share"></i>
        </button>
      </div>
    </div>
    <ul>
      <li class="quiz-item" v-for="quiz in quizzes" :key="quiz.id">
        <div class="artwork-container" v-if="quiz.image.url">
          <img :src="quiz.image.url">
        </div>
        <div class="info-container">
          <h3 class="title" v-html="trimCharacters(quiz.title, 35)"></h3>
          <span class="question-count">{{quiz.quiz_questions_count}} Pertanyaan</span>
          <div class="container-action">
            <a
              href="javascript:void(0)"
              class="share"
              @click.prevent="share('/share/kuis/', quiz.id, 'Iseng-iseng serius main Quiz ini dulu. Kira-kira masih cocok apa ternyata malah nggak cocok, yaa 😶')"
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
      v-if="isSharing"
      @close="isSharing = false"
      :url="shareURL"
      :id="shareId"
      :title="shareTitle"
    ></ModalShare>
  </div>
</template>

<script>
import ModalShare from '@/components/modal-share'
import { mapState } from 'vuex'
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
      required: false
    }
  },
  data() {
    return {
      shareURL: null,
      shareTitle: null,
      shareId: null,
      isSharing: false
    }
  },
  computed: {
    ...mapState({
      userId: s => s.profile.user.id
    })
  },
  methods: {
    share(url, id, title) {
      this.shareId = id
      this.shareTitle = title
      this.shareURL = url
      this.isSharing = true
    },
    trimCharacters(text, maxLength) {
      const dots = text.length > maxLength
      if (dots) {
        text = text.substr(0, maxLength)
        text = text.substr(0, Math.min(text.length, text.lastIndexOf(' ')))
      }
      return dots ? `${text}...` : text
    }
  }
}
</script>
