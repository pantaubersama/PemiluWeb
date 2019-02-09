<template>
  <div>
    <card-question-layout>
      <img v-if="avatarURL" :src="avatarURL" slot="background">
      <meditation-illustration v-else slot="background"></meditation-illustration>
      <div slot="title" class="quiz-title">
        <h3>{{quiz.title}}</h3>
        <p>{{quiz.quiz_questions_count}} Pertanyaan</p>
      </div>

      <div slot="description" class="quiz-description">
        <p>{{quiz.description}}</p>
        <button
          type="button"
          class="btn btn-block btn-primary"
          @click.stop="$emit('onClickNextButton', showModal)"
          :disabled="!questionsValid"
        >{{ ($route.name === 'PendidikanPolitikQuizIkuti') ? 'Mulai' : 'Lanjut' }}</button>
      </div>
    </card-question-layout>

    <question-modal
      v-if="showModal"
      :quiz="quiz"
      :questions="questions"
      @onClickChoicesButton="$emit('onClickChoicesButton', $event)"
      @close="$emit('onClickNextButton', showModal)"
      @click.stop="$emit('onClickNextButton', showModal)"
    />
  </div>
</template>

<script>
import { MeditationIllustration } from '@/svg/illustrations'
import CardQuestionLayout from '@/layout/CardQuestion'
import QuestionModal from '@/components/pendidikan-politik/question-modal'

export default {
  name: 'QuizDetail',
  components: {
    MeditationIllustration,
    QuestionModal,
    CardQuestionLayout
  },
  props: {
    showModal: Boolean
  },
  created() {
    // get quiz detail or start participating
    this.$store
      .dispatch('getQuizDetail', {
        quizId: this.quizId
      })
      .then(quiz =>
        this.$store.dispatch('getQuizQuestions', {
          quiz,
          quizId: this.quizId
        })
      )
  },
  computed: {
    quizId() {
      return this.$route.params.id
    },
    quiz() {
      return this.$store.getters.quizzes.find(it => it.id === this.quizId) || {}
    },
    questions() {
      return this.$store.getters.questionsForQuizId(this.quizId)
    },
    questionsValid() {
      return this.$store.getters.questionsValid(this.quizId)
    },
    avatarURL() {
      if (!this.quiz || !this.quiz.image || !this.quiz.image.url) {
        return null
      }
      return this.quiz.image.url
    }
  }
}
</script>
