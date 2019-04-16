<template>
  <Explore>
    <template slot="main-content" slot-scope="props">
      <explore-presiden v-if="props.type === 'presiden'" :query="query"></explore-presiden>
      <explore-dprd-kabupaten v-if="props.type === 'dprd-kabupaten'"></explore-dprd-kabupaten>
      <explore-dpd v-if="props.type === 'dpd'"></explore-dpd>
    </template>
  </Explore>
</template>

<script>
import Explore from '@/components/Merayakan/ExploreLayout'

export default {
  name: 'MerayakanExplore',
  components: {
    Explore,
    ExplorePresiden: () => import('@/components/Merayakan/Explore/presiden'),
    ExploreDprdKabupaten: () => import('@/components/Merayakan/Explore/explore-dprd-kabupaten'),
    ExploreDpd: () => import('@/components/Merayakan/Explore/explore-dpd'),
  },
  computed: {
    query() {
      return this.$route.query.d
    }
  }
}
</script>
