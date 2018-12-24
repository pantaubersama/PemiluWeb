<template>
  <div class="home-wrapper">
    <div class="container d-flex main-wrapper">
      <div class="col-md-3 sidebar">
        <NavSidebarTop></NavSidebarTop>
        <NavSidebarBottom></NavSidebarBottom>
      </div>
      <div class="col-md-6 offset-md-3 main-content">
        <CardProfile></CardProfile>
      </div>
      <div class="col-md-3 widget-wrapper">
        <WidgetVerified></WidgetVerified>
      </div>
    </div>
  </div>
</template>

<script>
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
import WidgetVerified from '@/components/WidgetVerified'
import CardProfile from '@/components/CardProfile'

export default {
  name: 'Profile',
  components: {
    NavSidebarTop,
    NavSidebarBottom,
    WidgetVerified,
    CardProfile
  }
}
</script>
