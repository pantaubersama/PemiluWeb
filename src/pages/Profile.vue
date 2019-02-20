<template>
  <div class="profile-page">
    <LayoutTimeline>
      <template slot="main-content">
        <CardProfile v-if="isProtected()"/>
        <UserProfile v-else/>
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
import UserProfile from '@/components/UserProfile'

export default {
  name: 'Profile',
  components: {
    LayoutTimeline,
    WidgetVerified,
    CardProfile,
    UserProfile
  },
  mixins: [authLink],
}
</script>
