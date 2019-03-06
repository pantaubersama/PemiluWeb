<template>
  <div class="card card-tabs">
    <quiz-list v-if="quizzes != ''" :quizzes="quizzes" @onClickKecenderungan="openPageKecenderungan"></quiz-list>
    <LottieEmpty v-if="showLottie" :message="'Pencarian tidak ditemukan'"/>
  </div>
</template>

<script>
import { mapActions, mapGetters,mapState } from 'vuex'
import router from '@/router'
import QuizList from '@/components/pendidikan-politik/quiz-list'
import LottieEmpty from '@/components/LottieEmpty'
export default {
  name: 'SearchQuiz',
  components: { QuizList, LottieEmpty },
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
    },
    ...mapState({
      showLottie: s => s.showLottie.showLottie
    })
  },
}
</script>
