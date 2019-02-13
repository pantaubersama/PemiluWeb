<template>
  <div class="card card-tabs">
    <quiz-list :quizzes="quizzes" @onClickKecenderungan="openPageKecenderungan"></quiz-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import QuizList from '@/components/pendidikan-politik/quiz-list'

export default {
  name: 'SearchQuiz',
  components: { QuizList },
  props: {
    query: {
      type: String
    },
    filter: String
  },
  methods: {
    ...mapActions({
      search: 'search/quiz'
    }),
    openPageKecenderungan() {
      router.push({ name: 'PendidikanPolitikQuizKecenderungan' })
    }
  },
  watch: {
    query: {
      immediate: true,
      handler(query = '') {
        if (query == null) return
        this.search({ q: this.query })
      }
    }
  },
  computed: {
    ...mapGetters({
      quizzesFilter: 'search/quizzesFilter'
    }),
    quizzes() {
      return this.quizzesFilter(this.filter)
    }
  }
}
</script>
