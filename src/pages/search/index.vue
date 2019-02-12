<template>
  <SearchLayout>
    <template slot="main-content" slot-scope="props">
      <SearchJanjiPolitik v-if="props.type === 'janji-politik'" :query="query"></SearchJanjiPolitik>
      <SearchQuestion v-if="props.type === 'tanya'" :query="query"></SearchQuestion>
      <SearchPeople v-if="props.type === 'people'"
        :query="query"
        :filter="filterPeople"
      ></SearchPeople>
    </template>
    <template slot="widget-wrapper" slot-scope="props">
      <SearchPeopleWidget v-if="props.type === 'people'"
        v-model="filterPeople"
      ></SearchPeopleWidget>
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
    SearchQuestion: () => import('@/pages/search/question'),
    SearchPeopleWidget: () => import('@/pages/search/people-widget')
  },
  data() {
    return {
      filterPeople: 'verified_all'
    }
  },
  computed: {
    query() {
      return this.$route.query.q
    }
  }
}
</script>
