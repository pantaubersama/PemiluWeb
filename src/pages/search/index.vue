<template>
  <SearchLayout>
    <template slot="main-content" slot-scope="props">
      <search-people v-if="props.type === 'people'"
        :query="query"
        :filter="filterPeople"
      ></search-people>
      <search-pilpres v-if="props.type === 'pilpres'"
        :query="query"
        :filter="filterPilpres"
      ></search-pilpres>
    </template>
    <template slot="widget-wrapper" slot-scope="props">
      <search-people-widget v-if="props.type === 'people'"
        v-model="filterPeople"
      ></search-people-widget>
      <search-pilpres-widget v-if="props.type === 'pilpres'"
        v-model="filterPilpres"
      ></search-pilpres-widget>
    </template>
  </SearchLayout>
</template>

<script>
import SearchLayout from '@/layout/Search'
export default {
  name: 'SearchHome',
  components: {
    SearchLayout,
    SearchPeople: () => import('@/pages/search/people'),
    SearchPeopleWidget: () => import('@/pages/search/people-widget'),
    SearchPilpres: () => import('@/pages/search/pilpres'),
    SearchPilpresWidget: () => import('@/pages/search/pilpres-widget'),
  },
  data() {
    return {
      filterPeople: 'verified_all',
      filterPilpres: 'team_all',
    }
  },
  computed: {
    query() {
      return this.$route.query.q
    }
  }
}
</script>
