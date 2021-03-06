<template>
  <modal-question-layout>
    <template slot="header">
      <h6 class="modal-title">Pertanyaan {{questionNumber}} dari {{totalQuestions}}</h6>
      <button class="close-icon" @click="$emit('close')">
        <close-icon></close-icon>
      </button>
    </template>
    <template slot="title">{{currentQuestion.content}}</template>
    <template slot="content">
      <div class="question-title">
        <h2>{{currentQuestion.content}}</h2>
      </div>
      <div class="row row-question">
        <div class="col" v-for="(answer, index) in currentQuestion.answers" :key="answer.id">
          <div class="col-question">
            <div class="question-text" v-html="answer.content"></div>
            <button
              class="btn btn-primary"
              :disabled="answer.answered"
              @click.stop="$emit('onClickChoicesButton', {id: answer.id, next: isNextModal(answer.id)})"
              @click.prevent.stop="answerQuestion(answer.id)"
            >{{index === 0 ? 'A' : 'B'}}</button>
          </div>
        </div>
      </div>
    </template>
  </modal-question-layout>
</template>

<script>
import { CloseIcon } from '@/svg/icons'
import ModalQuestionLayout from '@/layout/ModalQuestion'

export default {
  name: 'QuestionModal',
  components: {
    CloseIcon,
    ModalQuestionLayout
  },
  props: ['quiz', 'questions'],
  computed: {
    sortedQuestions() {
      if (!this.questions || this.questions.length === 0) {
        return []
      }
      return this.questions.slice().sort((a, b) => b.answered - a.answered)
    },
    questionNumber() {
      if (!this.sortedQuestions || this.sortedQuestions.length === 0) {
        return 0
      }
      return this.sortedQuestions.filter(it => it.answered).length + 1
    },
    questionIndex() {
      if (!this.sortedQuestions || this.sortedQuestions.length === 0) {
        return 0
      }
      return this.sortedQuestions.findIndex(it => it.answered === false)
    },
    currentQuestion() {
      if (!this.sortedQuestions || this.sortedQuestions.length === 0) {
        return {
          content: '',
          answers: []
        }
      }
      return this.sortedQuestions[this.questionIndex]
    },
    totalQuestions() {
      if (!this.quiz) return 0
      return this.quiz.quiz_questions_count
    }
  },
  methods: {
    isNextModal(answerId) {
      return this.questionNumber < this.totalQuestions
    },
    answerQuestion(answerId) {
      this.$store
        .dispatch('answerQuestion', {
          quizId: this.quiz.id,
          questionId: this.currentQuestion.id,
          answerId,
          status: this.quiz.participation_status,
          isLast: this.questionNumber === this.totalQuestions
        })
        .then(() => {
          this.$toaster.success('Berhasil menjawab pertanyaan.')
        })
        .catch(() => this.$toaster.error('Gagal mengirim jawaban.'))
    }
  }
}
</script>
