<template>
  <modal-layout>
    <div slot="modal-content" class="modal-jawaban">
      <button class="close-icon" @click="$emit('close')">
        <close-icon></close-icon>
      </button>
      <div class="quiz-container">
        <div
          class="quiz-container--row"
          v-for="(question, index) in quiz.questions"
          :key="question.id"
        >
          <div class="quiz-info">
            <h6 class="quiz-number">Pertanyaan {{ pembilang(index + 1, 'Ke') }}</h6>
            <p class="quiz-section" v-html="question.content"></p>
          </div>
          <div class="quiz-content answer">
            <div
              class="quiz-content--description"
              v-for="answer in question.answers"
              :key="answer.id"
            >
              <h5 class="quiz-title">{{ answer.team.title }}</h5>
              <p class="quiz-question" v-html="answer.content"></p>
            </div>
          </div>
          <div class="quiz-content--result">
            <p>
              Jawabanmu:
              <span>{{ question.answered.team.title}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </modal-layout>
</template>

<script>
import { mapState } from 'vuex'
import { pembilang } from '@/utils'

import { CloseIcon } from '@/svg/icons'
import ModalLayout from '@/layout/Modal'

export default {
  name: 'QuizModalJawaban',
  components: {
    CloseIcon,
    ModalLayout
  },
  computed: {
    ...mapState({
      quiz: state => state.pendidikanPolitik.quizSummary
    })
  },
  created() {
    const id = this.$route.params.id
    document.documentElement.className = 'overflow-y-hidden'
    this.$store.dispatch('getQuizSummary', id)
  },
  destroyed() {
    document.documentElement.className = ''
  },
  methods: {
    pembilang
  }
}
</script>
