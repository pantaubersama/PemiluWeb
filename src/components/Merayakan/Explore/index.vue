<template>
  <Explore>
    <template slot="main-content" slot-scope="props">
      <sample v-if="props.type === 'custom'" :query="query"></sample>
      <explore-presiden v-if="props.type === 'presiden'"></explore-presiden>
      <explore-dprd-kabupaten v-if="props.type === 'dprd-kabupaten'"></explore-dprd-kabupaten>
      <explore-dpd v-if="props.type === 'dpd'"></explore-dpd>
      <explore-dpr v-if="props.type === 'dpr'"></explore-dpr>
    </template>
  </Explore>
</template>

<script>
import Explore from '@/components/Merayakan/ExploreLayout'

export default {
  name: 'MerayakanExplore',
  components: {
    Explore,
    Sample: () => import('@/components/Merayakan/Explore/presiden'),
    ExplorePresiden: () => import('@/components/Merayakan/Explore/explore-presiden'),
    ExploreDprdKabupaten: () => import('@/components/Merayakan/Explore/explore-dprd-kabupaten'),
    ExploreDpd: () => import('@/components/Merayakan/Explore/explore-dpd'),
    ExploreDpr: () => import('@/components/Merayakan/Explore/explore-dpr'),
  },
  computed: {
    query() {
      return this.$route.query.d
    }
  }
}
</script>
