<template>
  <div class="card card-tabs">
    <janji-politik-list :data="janjiPolitiks" :loading="isLoading"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JanjiPolitikList from '@/components/Linimasa/JanjiPolitikList'

export default {
  name: 'SearchJanjiPolitik',
  components: { JanjiPolitikList },
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
  watch: {
    query: {
      immediate: true,
      handler(query = '') {
        if (query == null) return
        this.isLoading = true
        this.$store
          .dispatch('search/janjiPolitiks', { q: query })
          .finally(() => {
            this.isLoading = false
          })
      }
    }
  },
  computed: {
    ...mapState({
      janjiPolitiks: s => s.search.janjiPolitiks
    })
  }
}
</script>
