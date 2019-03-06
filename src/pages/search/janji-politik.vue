<template>
  <div class="card card-tabs">
    <janji-politik-list :user="user" :data="janjiPolitiks" :loading="isLoading"/>
    <LottieEmpty v-if="showLottie" :message="'Oops.. data kosong'"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import JanjiPolitikList from '@/components/Linimasa/JanjiPolitikList'
import LottieEmpty from '@/components/LottieEmpty'
export default {
  name: 'SearchJanjiPolitik',
  components: { JanjiPolitikList, LottieEmpty },
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
      janjiPolitiks: s => s.search.janjiPolitiks,
      user: state => state.profile.user,
      showLottie: s => s.showLottie.showLottie
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
