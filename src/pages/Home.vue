<template>
  <div class="home-wrapper">
    <div class="container d-flex main-wrapper">
      <div class="col-md-3 sidebar">
        <NavSidebarTop></NavSidebarTop>
        <NavSidebarBottom></NavSidebarBottom>
      </div>
      <div class="col-md-6 offset-md-3 main-content">
        <CardPilpres></CardPilpres>
        <CardJP></CardJP>
        <CardTanya></CardTanya>
      </div>
      <div class="col-md-3 widget-wrapper">
        <WidgetVerified></WidgetVerified>
        <CardQuiz></CardQuiz>
      </div>
    </div>
  </div>
</template>

<script>
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
import CardJP from '@/components/CardJP'
import WidgetVerified from '@/components/WidgetVerified'
import CardPilpres from '@/components/CardPilpres'
import CardTanya from '@/components/CardTanya'
import CardQuiz from '@/components/CardQuiz'

export default {
  name: 'Home',
  components: {
    NavSidebarTop,
    NavSidebarBottom,
    CardJP,
    WidgetVerified,
    CardPilpres,
    CardTanya,
    CardQuiz
  }
}
</script>
