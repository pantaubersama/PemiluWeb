<template>
  <div class="home-wrapper">
    <div class="container d-flex main-wrapper">
      <div class="col-md-3 sidebar">
        <NavSidebarTop></NavSidebarTop>
        <NavSidebarBottom></NavSidebarBottom>
      </div>
      <div class="col-md-6 offset-md-3 main-content">
        <CardPilpres></CardPilpres>
      </div>
      <div class="col-md-3 widget-wrapper">
        <WidgetJP></WidgetJP>
      </div>
    </div>
  </div>
</template>

<script>
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
import WidgetVerified from '@/components/WidgetVerified'
import CardPilpres from '@/components/CardPilpres'
import WidgetJP from '@/components/WidgetJP'

export default {
  name: 'Linimasa',
  components: {
    NavSidebarTop,
    NavSidebarBottom,
    WidgetVerified,
    CardPilpres,
    WidgetJP
  },
}
</script>
