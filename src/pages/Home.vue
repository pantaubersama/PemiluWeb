<template>
  <LayoutTimeline>
    <template slot="main-content">
      <CardPilpres></CardPilpres>
      <CardJP></CardJP>
      <CardTanya></CardTanya>
    </template>
    <template slot="widget-wrapper">
      <WidgetVerified></WidgetVerified>
      <CardWordStadium></CardWordStadium>
      <WidgetCluster></WidgetCluster>
      <CardQuiz></CardQuiz>
    </template>
  </LayoutTimeline>
</template>

<script>
import LayoutTimeline from '@/layout/timeline'
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
import CardJanjiPilpres from '@/components/CardJanjiPilpres'
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
    CardJanjiPilpres,
    WidgetVerified,
    CardPilpres,
    CardTanya,
    WidgetCluster,
    CardQuiz,
    CardWordStadium
  }
}
</script>
