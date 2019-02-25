<template>
  <div class="profile-page">
    <LayoutTimeline>
      <template slot="main-content">
        <CardProfile v-if="isProtected()"/>
      </template>
      <template slot="widget-wrapper">
        <div class="d-none d-lg-block">
          <WidgetVerified v-if="isProtected()"/>
        </div>
      </template>
    </LayoutTimeline>
  </div>
</template>

<script>
import { authLink } from '@/mixins/link'
import LayoutTimeline from '@/layout/Timeline'
import WidgetVerified from '@/components/WidgetVerified'
import CardProfile from '@/components/CardProfile'

export default {
  name: 'Profile',
  components: {
    LayoutTimeline,
    WidgetVerified,
    CardProfile
  },
  mixins: [authLink],
}
</script>
