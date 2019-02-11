<template>
  <div class="profile-page">
    <LayoutTimeline>
      <template slot="main-content">
        <div class="list-badge">
          <div class="title">List Badge</div>
          <div class="list-content">
            <div class="list-item" v-for="(badge, index) in badges" :key="index">
              <div class="item-thumb">
                <img v-if="badge.badge.image.url" :src="badge.badge.image.url">
              </div>
              <div class="list-content-desc">
                <div class="list-desc">
                  <p>{{badge.badge.name}}</p>
                  <div class="sub-text">{{badge.badge.description || '-'}}</div>
                </div>
                <router-link
                  href="javascript:void(0)"
                  class="icon-share"
                  :to="{name: 'ProfileBadgeDetail', params: {badgeId: badge.achieved_id}}"
                >
                  <!-- @click="share(`/profile/badge-detail/`, badge.id)" -->
                  <icon-share/>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="widget-wrapper">
        <div class="d-none d-lg-block">&nbsp;</div>
      </template>
    </LayoutTimeline>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { IconShare } from '@/svg/icons'
import LayoutTimeline from '@/layout/Timeline'
export default {
  name: 'ProfileBadge',
  components: {
    LayoutTimeline,
    IconShare
  },
  data() {
    return {
      // isModalOpened: false,
      // modalShareURL: null,
      // modalShareId: null
    }
  },
  computed: {
    ...mapState({
      user: s => s.profile.user,
      badges: s => s.profile.badges
    })
  },
  mounted() {
    this.$store.dispatch('profile/getMe').then(async () => {
      this.$store.dispatch('profile/getBadges', {
        id: this.user.id
      })
    })
  },
  // mounted() {
  //   this.$store.dispatch('profile/listBadges')
  // },
  methods: {
    // share(url, id) {
    //   this.modalShareURL = url
    //   this.modalShareId = id
    //   this.isModalOpened = true
    // }
  }
}
</script>
