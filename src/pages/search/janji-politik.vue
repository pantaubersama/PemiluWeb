<template>
  <div class="card card-tabs">
    <janji-politik-list :data="janjiPolitiks" :loading="isLoading"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import JanjiPolitikList from '@/components/Linimasa/JanjiPolitikList'

export default {
  name: 'SearchJanjiPolitik',
  components: { JanjiPolitikList },
  props: { query: String, filter: Object },
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
        const { filter, cluster } = this.filter
        this.search({ q: this.query, filter_by: filter, cluster_id: cluster })
          .then(() => {
            this.getClusterList()
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    filter(value) {
      const { filter, cluster } = value
      this.search({ q: this.query, filter_by: filter, cluster_id: cluster })
    }
  },
  computed: {
    ...mapState({
      janjiPolitiks: s => s.search.janjiPolitiks
    })
  },
  methods: {
    ...mapActions({
      search: 'search/janjiPolitiks',
      getClusterList: 'profile/getClusterList'
    })
  }
}
</script>
