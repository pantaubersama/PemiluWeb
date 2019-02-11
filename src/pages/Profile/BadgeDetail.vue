<template>
  <div class="profile-page">
    <modal-share
      v-if="isModalOpened"
      :url="modalShareURL"
      :id="modalShareId"
      title="Yeay! I got the badge 🤘"
      @close="isModalOpened = false"
    ></modal-share>
    <LayoutTimeline>
      <template slot="main-content">
        <div class="detail-badge">
          <div class="detail-content" v-if="badgeDetail.user">
            <div class="profile-desc">
              <div class="thumb">
                <img v-if="badgeDetail.user.avatar.url" :src="badgeDetail.user.avatar.url" alt>
                <img v-else src="~@/assets/user.svg" alt>
              </div>
              <p>{{badgeDetail.user.full_name}}</p>
              <span>{{badgeDetail.user.about}}</span>
              <div class="profile-description--curve">&nbsp;</div>
            </div>
            <div class="profile-description--content">
              <img
                v-if="badgeDetail.badge.image.url"
                class="thumbnail"
                :src="badgeDetail.badge.image.url"
              >
              <img v-else class="thumbnail" src="~@/assets/flag-star-1.png">
              <h4>{{badgeDetail.badge.name}}</h4>
              <span class="subtitle">{{badgeDetail.badge.description}}</span>
            </div>
          </div>
          <div class="profile-background">
            <a
              href
              class="btn btn-outline-primary btn-share"
              @click.prevent="share(`/profile/badge/`, badgeDetail.achieved_id)"
            >
              <icon-share/>Bagikan
            </a>
            <profile-illustration/>
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
import { ProfileIllustration } from '@/svg/illustrations'
import LayoutTimeline from '@/layout/Timeline'
import ModalShare from '@/components/modal-share'
import { IconShare } from '@/svg/icons'
export default {
  name: 'ProfileBadgeDetail',
  components: {
    LayoutTimeline,
    ProfileIllustration,
    ModalShare,
    IconShare
  },
  data() {
    return {
      isModalOpened: false,
      modalShareURL: null,
      modalShareId: null
    }
  },
  computed: {
    ...mapState({
      badgeDetail: s => s.profile.badgeDetail
    })
  },
  mounted() {
    this.$store.dispatch('profile/getBadgeDetail', {
      id: this.$route.params.badgeId
    })
  },
  destroyed() {
    this.$store.commit('profile/emptyBadgeDetail')
  },
  methods: {
    share(url, id) {
      this.modalShareURL = url
      this.modalShareId = id
      this.isModalOpened = true
    }
  }
}
</script>
