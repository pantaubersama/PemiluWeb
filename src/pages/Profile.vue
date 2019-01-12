<template>
  <div class="profile-page">
    <LayoutTimeline>
      <template slot="main-content">
        <CardProfile></CardProfile>
      </template>
      <template slot="widget-wrapper">
        <div class="d-none d-lg-block">
          <WidgetVerified></WidgetVerified>
        </div>
      </template>
    </LayoutTimeline>
  </div>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import WidgetVerified from '@/components/WidgetVerified'
import CardProfile from '@/components/CardProfile'

export default {
  name: 'Profile',
  components: {
    LayoutTimeline,
    WidgetVerified,
    CardProfile
  }
}
</script>
