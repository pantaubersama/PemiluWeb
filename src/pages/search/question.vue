<template>
  <div class="card card-tabs">
    <question-list
      v-if="questions != ''"
      :questions="questions"
      :loading="isLoading"
      @upvoted="onUpvote($event)"
      @removeVoted="onRemoveVote($event)"
    ></question-list>
    <LottieEmpty v-if="showLottie"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import QuestionList from '@/components/pendidikan-politik/question-list'
import LottieEmpty from '@/components/LottieEmpty'
export default {
  name: 'SearchQuestion',
  components: { QuestionList, LottieEmpty },
  props: {
    query: {
      type: String
    },
    filter: Object
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      search: 'search/questions'
    }),
    onUpvote(id) {
      this.$store.dispatch('vote', id)
    },
    onRemoveVote(id) {
      this.$store.dispatch('unVote', id)
    }
  },
  watch: {
    query: {
      immediate: true,
      handler(query = '') {
        if (query == null) return
        const { user, sorting } = this.filter
        this.isLoading = true
        this.search({
          q: this.query,
          filter_by: user,
          order_by: sorting
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    filter(value) {
      const { user, sorting } = value
      this.search({
        q: this.query,
        filter_by: user,
        order_by: sorting
      })
    }
  },
  computed: {
    ...mapState({
      questions: s => s.search.questions,
      showLottie: s => s.showLottie.showLottie
    })
  }
}
</script>
