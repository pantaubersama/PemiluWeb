<template>
  <SearchLayout>
    <template slot="main-content" slot-scope="props">
      <search-janji v-if="props.type === 'janji-politik'" :query="query" :filter="filterJanji"></search-janji>
      <search-question v-if="props.type === 'tanya'" :query="query" :filter="filterQuestion"></search-question>
      <search-quiz v-if="props.type === 'quiz'" :query="query" :filter="filterQuiz"></search-quiz>
      <search-people v-if="props.type === 'people'" :query="query" :filter="filterPeople"></search-people>
      <search-pilpres v-if="props.type === 'pilpres'" :query="query" :filter="filterPilpres"></search-pilpres>
      <search-cluster v-if="props.type === 'cluster'" :query="query" :filter="filterCluster"></search-cluster>
    </template>
    <template slot="widget-wrapper" slot-scope="props">
      <search-people-widget v-if="props.type === 'people'" v-model="filterPeople"></search-people-widget>
      <search-pilpres-widget v-if="props.type === 'pilpres'" v-model="filterPilpres"></search-pilpres-widget>
      <search-cluster-widget v-if="props.type === 'cluster'" v-model="filterCluster"></search-cluster-widget>
      <search-janji-widget v-if="props.type === 'janji-politik'" v-model="filterJanji"></search-janji-widget>
      <search-question-widget v-if="props.type === 'tanya'" v-model="filterQuestion"></search-question-widget>
      <search-quiz-widget v-if="props.type === 'quiz'" v-model="filterQuiz"></search-quiz-widget>
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
    SearchJanjiWidget: () => import('@/pages/search/widget/janji-politik'),
    SearchQuestionWidget: () => import('@/pages/search/widget/question'),
    SearchQuizWidget: () => import('@/pages/search/widget/quiz')
  },
  data() {
    return {
      filterPeople: 'verified_all',
      filterPilpres: 'team_all',
      filterCluster: null,
      filterJanji: {
        cluster: null,
        filter: 'user_verified_all'
      },
      filterQuestion: {
        user: 'user_verified_all',
        sorting: 'created_at'
      },
      filterQuiz: null
    }
  },
  computed: {
    query() {
      return this.$route.query.q
    }
  }
}
</script>
