<template>
  <div class="profile-page user-page">
    <LayoutTimeline>
      <template slot="main-content">
         <div class="profil-list">
          <div class="card grey">
            <div class="profile" >
              <img v-if="avatarURL" :src="avatarURL">
              <img v-else src="~@/assets/user.svg" alt>
              <span>
                <h3>{{user.full_name}}, @{{user.username}}</h3>
                <div v-if="user.verified" class="line-verified">
                  <verified-icon-default/>Terverifikasi
                </div>
                <div v-else class="btn line">
                  <verified-icon-default/>Belum Verifikasi
                </div>
              </span>
            </div>
            <div class="user-about" v-if="user.about && user.about.length > 0">
              <p>{{user.about}}</p>
            </div>
          </div>
          <div class="card">
      <cluster-panel
        :user="user"
      />

      <div class="list-wrap">
        <h4 class="title">
          Biodata
        </h4>
        <div class="item">
          <img src="@/assets/icon_point.svg">
          <p v-if="user.location">{{user.location}}</p>
          <p v-else>-</p>
        </div>
        <div class="item">
          <img src="@/assets/icon_open_book.svg">
          <p v-if="user.education">{{user.education}}</p>
          <p v-else>-</p>
        </div>
        <div class="item">
          <img src="@/assets/icon_briefcase.svg">
          <p v-if="user.occupation">{{user.occupation}}</p>
          <p v-else>-</p>
        </div>
      </div>

      <div class="list-wrap">
        <h4 class="title">Badge
          <router-link class="badge-more" :to="{path:'/profile/badge',query: {id: user.id}}">Lihat lainnya</router-link>
        </h4>

        <div v-if="badges.length > 0">
          <div v-for="(badge, index) in badges" :key="index">
            <div v-if="index <= 2" class="item">
              <div class="item-thumb">
                <img v-if="badge.badge.image.url" :src="badge.badge.image.url">
                <img v-else src="@/assets/flag-star-1.png">
              </div>
              <span>
                <p :data-title="badge.name">{{badge.badge.name}}</p>
                <p class="sub-text" :data-text="badge.description">{{badge.badge.description || ''}}</p>
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
        </div>
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
import { mapState, mapActions } from 'vuex'
import { VerifiedIconDefault } from '@/svg/icons'
import ClusterPanel from '@/components/User/cluster-panel'
export default {
  name: 'ProfileUser',
  components: {
    LayoutTimeline,
    WidgetVerified,
    VerifiedIconDefault,
    ClusterPanel
  },
  mixins: [authLink],
  computed: {
    ...mapState({
      user: s => s.profile.profileUser,
      avatarURL: s => s.profile.profileAvatar,
      badges: s => s.profile.badges,
    })
  },
  methods: {
    imageLoadError () {
      this.imageLoad = false
    }
  },
  mounted() {
    // this.loader()

    this.$store.dispatch('profile/getUser', {
      id: this.$route.query.id
    }).then(async () => {
      // await this.$store.dispatch('profile/getLinimasaHistory', {
      //   id: this.$route.query.id
      // })
      await setTimeout(() => (this.isLoading = false), 1000)
      await this.$store.dispatch('profile/getBadges', {
          id: this.$route.query.id
        })
      // await this.$store.dispatch('profile/getQuestionHistory', {
      //   id: this.$route.query.id
      // })
    })
  },
  destroyed() {
    this.$store.commit('profile/emptyBadges')
  }
}
</script>
<style lang="sass" scoped>
.user-page
  .card
    padding-top: 20px
</style>
