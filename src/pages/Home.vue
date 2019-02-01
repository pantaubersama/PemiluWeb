<template>
  <LayoutTimeline>
    <template slot="main-content">
      <CardPilpres/>
      <CardJanjiPolitik/>
      <CardTanya/>
    </template>
    <template slot="widget-wrapper">
      <div class="d-none d-lg-block">
        <div v-if="isProtected()">
          <WidgetVerified/>
        </div>
        <!-- <CardWordStadium/> -->
        <WidgetCluster/>
        <CardQuiz/>
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
  mixins: [authLink]
}
</script>
