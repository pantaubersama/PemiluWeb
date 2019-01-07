<template>
  <LayoutTimeline>
    <template slot="main-content">
      <div class="detail-badge">
        <div class="detail-content">
          <div class="profile-desc">
            <div class="thumb">
              <img src="@/assets/trump.jpg" alt>
            </div>
            <p>Aniah Muanjani</p>
            <span>Berjuang bersama untuk Indonesia</span>
            <div class="profile-description--curve">&nbsp;</div>
          </div>
          <div class="profile-description--content">
            <img class="thumbnail" src="@/assets/flag-star-1.png">
            <h4>Kadet</h4>
            <span class="subtitle">Ikut Kuis Pendidikan Pertama Kali</span>
          </div>
        </div>
        <div class="profile-background">
          <profile-illustration/>
        </div>
      </div>
    </template>
    <template slot="widget-wrapper">&nbsp;</template>
  </LayoutTimeline>
</template>

<script>
import { ProfileIllustration } from '@/svg/illustrations'
import LayoutTimeline from '@/layout/Timeline'
export default {
  name: 'ProfileBadgeDetail',
  components: {
    LayoutTimeline,
    ProfileIllustration
  }
}
</script>
