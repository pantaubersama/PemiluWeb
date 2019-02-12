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
      <search-cluster v-if="props.type === 'cluster'"
        :query="query"
        :filter="filterCluster"
      ></search-cluster>
    </template>
    <template slot="widget-wrapper" slot-scope="props">
      <search-people-widget v-if="props.type === 'people'"
        v-model="filterPeople"
      ></search-people-widget>
      <search-pilpres-widget v-if="props.type === 'pilpres'"
        v-model="filterPilpres"
      ></search-pilpres-widget>
      <search-cluster-widget v-if="props.type === 'cluster'"
        v-model="filterCluster"
      ></search-cluster-widget>
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
    SearchCluster: () => import('@/pages/search/cluster'),
    SearchClusterWidget: () => import('@/pages/search/cluster-widget')
  },
  data() {
    return {
      filterPeople: 'verified_all',
      filterPilpres: 'team_all',
      filterCluster: null
    }
  },
  computed: {
    query() {
      return this.$route.query.q
    }
  }
}
</script>
