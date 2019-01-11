<template>
  <LayoutTimeline>
    <template slot="main-content">
      <CardPilpres></CardPilpres>
      <CardJanjiPolitik></CardJanjiPolitik>
      <CardTanya></CardTanya>
    </template>
    <template slot="widget-wrapper">
      <div class="d-none d-lg-block">
        <WidgetVerified></WidgetVerified>
        <CardWordStadium></CardWordStadium>
        <WidgetCluster></WidgetCluster>
        <CardQuiz></CardQuiz>
      </div>
    </template>
  </LayoutTimeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
import CardJanjiPolitik from '@/components/CardJanjiPolitik'
import WidgetVerified from '@/components/WidgetVerified'
import CardPilpres from '@/components/CardPilpres'
import CardTanya from '@/components/CardTanya'
import WidgetCluster from '@/components/WidgetCluster'
import CardQuiz from '@/components/CardQuiz'
import CardWordStadium from '@/components/CardWordStadium'

export default {
  name: 'Home',
  components: {
    LayoutTimeline,
    NavSidebarTop,
    NavSidebarBottom,
    CardJanjiPolitik,
    WidgetVerified,
    CardPilpres,
    CardTanya,
    WidgetCluster,
    CardQuiz,
    CardWordStadium
  }
}
</script>
