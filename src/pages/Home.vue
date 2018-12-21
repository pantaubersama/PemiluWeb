<template>
  <div class="home-wrapper">
    <div class="container d-flex">
      <div class="col-md-2 sidebar">
        <NavSidebarTop></NavSidebarTop>
        <NavSidebarBottom></NavSidebarBottom>
      </div>
      <div class="col-md-6 offset-md-3 main-content">
        <CardJP></CardJP>
      </div>
      <div class="col-md-3 widget-wrapper">
        <h1>Widget</h1>
      </div>
    </div>
  </div>
</template>

<script>
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
import CardJP from '@/components/CardJP'

export default {
  name: 'Home',
  components: {
    NavSidebarTop,
    NavSidebarBottom,
    CardJP
  }
}
</script>
