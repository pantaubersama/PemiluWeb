<template>
  <LayoutTimeline>
    <template slot="main-content">
      <CardPilpres/>
      <CardJanjiPolitik/>
      <CardTanya/>
    </template>
    <template slot="widget-wrapper">
      <div class="d-none d-lg-block">
        <WidgetVerified v-if="isLoggedIn"/>
        <!-- <CardWordStadium/> -->
        <WidgetCluster v-if="hasCluster"/>
        <CardQuiz v-if="isLoggedIn"/>
      </div>
    </template>
  </LayoutTimeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import CardJanjiPolitik from '@/components/Home/CardJanjiPolitik'
import WidgetVerified from '@/components/WidgetVerified'
import CardPilpres from '@/components/Home/CardPilpres'
import CardTanya from '@/components/Home/CardTanya'
import WidgetCluster from '@/components/Home/WidgetCluster'
import CardQuiz from '@/components/Home/CardQuiz'
import CardWordStadium from '@/components/Home/CardWordStadium'
import { authLink } from '@/mixins/link'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    LayoutTimeline,
    CardJanjiPolitik,
    WidgetVerified,
    CardPilpres,
    CardTanya,
    WidgetCluster,
    CardQuiz,
    CardWordStadium
  },
  mixins: [authLink],
  computed: {
    ...mapState({
      cluster: s => s.profile.user.cluster,
      isLoggedIn: s => s.profile.token != null
    }),
    hasCluster() {
      return this.isLoggedIn && this.cluster != null
    }
  }
}
</script>
