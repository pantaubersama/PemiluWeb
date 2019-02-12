<template>
  <SearchLayout>
    <template slot="main-content" slot-scope="props">
      <SearchPeople v-if="props.type === 'people'" :query="query"></SearchPeople>
      <SearchJanjiPolitik v-if="props.type === 'janji-politik'" :query="query"></SearchJanjiPolitik>
      <SearchQuestion v-if="props.type === 'tanya'" :query="query"></SearchQuestion>
    </template>
    <template slot="widget-wrapper">&nbsp;</template>
  </SearchLayout>
</template>

<script>
import SearchLayout from '@/layout/Search'
export default {
  name: 'SearchHome',
  components: {
    SearchLayout,
    SearchPeople: () => import('@/pages/search/people'),
    SearchJanjiPolitik: () => import('@/pages/search/janji-politik'),
    SearchQuestion: () => import('@/pages/search/question')
  },
  computed: {
    query() {
      return this.$route.query.q
    }
  }
}
</script>
