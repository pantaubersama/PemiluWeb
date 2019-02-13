<template>
  <div class="card card-tabs">
    <question-list
      :questions="questions"
      :loading="isLoading"
      @upvoted="onUpvote($event)"
      @removeVoted="onRemoveVote($event)"
    ></question-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionList from '@/components/pendidikan-politik/question-list'

export default {
  name: 'SearchQuestion',
  components: { QuestionList },
  props: {
    query: {
      type: String
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
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
        this.isLoading = true
        this.$store.dispatch('search/questions', { q: query }).finally(() => {
          this.isLoading = false
        })
      }
    }
  },
  computed: {
    ...mapState({
      questions: s => s.search.questions
    })
  }
}
</script>
