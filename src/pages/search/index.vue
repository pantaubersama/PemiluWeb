<template>
  <SearchLayout>
    <template slot="main-content" slot-scope="props">
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
  </SearchLayout>
</template>

<script>
import SearchLayout from '@/layout/Search'
export default {
  name: 'SearchHome',
  components: {
    SearchLayout,
    SearchPeople: () => import('@/pages/search/people'),
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
