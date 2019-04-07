<template>
  <Explore>
    <template slot="main-content" slot-scope="props">
      <!-- <explore-presiden v-if="this.$route.params.type === 'presiden'" ></explore-presiden> -->
      <explore-presiden v-if="props.type === 'presiden'" :query="query"></explore-presiden>
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
  },
  computed: {
    query() {
      return this.$route.query.d
    }
  }
}
</script>
