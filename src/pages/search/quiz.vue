<template>
  <div class="card card-tabs">
    <quiz-list :quizzes="quizzes" @onClickKecenderungan="openPageKecenderungan"></quiz-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import router from '@/router'
import QuizList from '@/components/pendidikan-politik/quiz-list'

export default {
  name: 'SearchQuiz',
  components: { QuizList },
  props: {
    query: {
      type: String
    }
  },
  methods: {
    openPageKecenderungan() {
      router.push({ name: 'PendidikanPolitikQuizKecenderungan' })
    }
  },
  watch: {
    query: {
      immediate: true,
      handler(query = '') {
        if (query == null) return
        if (query.length > 3) {
          this.$store.dispatch('search/quiz', { q: query })
        }
      }
    }
  },
  computed: {
    ...mapState({
      quizzes: s => s.search.quizzes
    })
  }
}
</script>
