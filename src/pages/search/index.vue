<template>
  <SearchLayout>
    <template slot="main-content" slot-scope="props">
      <SearchPeople v-if="props.type === 'people'" :query="query"></SearchPeople>
    </template>
  </SearchLayout>
</template>

<script>
import SearchLayout from '@/layout/Search'
export default {
  name: 'SearchHome',
  components: {
    SearchLayout,
    SearchPeople: () => import('@/pages/search/people')
  },
  computed: {
    query() {
      return this.$route.query.q
    }
  }
}
</script>
