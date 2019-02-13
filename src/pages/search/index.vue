<template>
  <SearchLayout>
    <template slot="main-content" slot-scope="props">
      <search-janji v-if="props.type === 'janji-politik'" :query="query" :filter="filterJanji"></search-janji>
      <search-question v-if="props.type === 'tanya'" :query="query"></search-question>
      <search-quiz v-if="props.type === 'quiz'" :query="query"></search-quiz>
      <search-people v-if="props.type === 'people'" :query="query" :filter="filterPeople"></search-people>
      <search-pilpres v-if="props.type === 'pilpres'" :query="query" :filter="filterPilpres"></search-pilpres>
      <search-cluster v-if="props.type === 'cluster'" :query="query" :filter="filterCluster"></search-cluster>
    </template>
    <template slot="widget-wrapper" slot-scope="props">
      <search-people-widget v-if="props.type === 'people'" v-model="filterPeople"></search-people-widget>
      <search-pilpres-widget v-if="props.type === 'pilpres'" v-model="filterPilpres"></search-pilpres-widget>
      <search-cluster-widget v-if="props.type === 'cluster'" v-model="filterCluster"></search-cluster-widget>
      <search-janji-widget v-if="props.type === 'janji-politik'" v-model="filterJanji"></search-janji-widget>
    </template>
  </SearchLayout>
</template>

<script>
import SearchLayout from '@/layout/Search'

export default {
  name: 'SearchHome',
  components: {
    SearchLayout,
    SearchJanji: () => import('@/pages/search/janji-politik'),
    SearchQuestion: () => import('@/pages/search/question'),
    SearchQuiz: () => import('@/pages/search/quiz'),
    SearchPeople: () => import('@/pages/search/people'),
    SearchPilpres: () => import('@/pages/search/pilpres'),
    SearchCluster: () => import('@/pages/search/cluster'),
    SearchPeopleWidget: () => import('@/pages/search/widget/people'),
    SearchPilpresWidget: () => import('@/pages/search/widget/pilpres'),
    SearchClusterWidget: () => import('@/pages/search/widget/cluster'),
    SearchJanjiWidget: () => import('@/pages/search/widget/janji-politik')
  },
  data() {
    return {
      filterPeople: 'verified_all',
      filterPilpres: 'team_all',
      filterCluster: null,
      filterJanji: {
        cluster: null,
        filter: 'user_verified_all'
      }
    }
  },
  computed: {
    query() {
      return this.$route.query.q
    }
  }
}
</script>
