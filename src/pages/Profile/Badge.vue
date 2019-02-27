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
                <img v-else src="@/assets/flag-star-1.png">
              </div>
              <div class="list-content-desc">
                <div class="list-desc">
                  <p>{{badge.badge.name}}</p>
                  <div class="sub-text">{{badge.badge.description || ''}}</div>
                </div>
                <router-link
                  href="javascript:void(0)"
                  class="icon-share"
                  :to="{name: 'ProfileBadgeDetail', params: {badgeId: badge.achieved_id}}"
                >
                  <icon-share/>
                </router-link>
              </div>
            </div>
            <div
              class="list-item list-item-grey"
              v-for="listbadge in listBadges"
              :key="listbadge.id"
            >
              <div class="item-thumb">
                <img
                  v-if="listbadge.image_gray.thumbnail_square.url"
                  :src="listbadge.image_gray.thumbnail_square.url"
                >
                <img v-else src="@/assets/flag-star-1-grey.png">
              </div>
              <div class="list-content-desc">
                <div class="list-desc">
                  <p>{{listbadge.name}}</p>
                  <div class="sub-text">{{listbadge.description || ''}}</div>
                </div>
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
  computed: {
    ...mapState({
      badges: s => s.profile.badges,
      listBadges: s => s.profile.listBadges
    })
  },
  mounted() {
    this.$store.dispatch('profile/getBadges', {
      id: this.$route.query.id
    }).then(async () => {
      await this.$store.dispatch('profile/listBadges')
    })
  },
  destroyed() {
    this.$store.commit('profile/emptyListBadges')
  }

}
</script>
