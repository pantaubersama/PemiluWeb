<template>
  <div class="profile-page user-page">
    <LayoutTimeline>
      <template slot="main-content">
        <div class="profil-list">
          <div class="card grey">
            <div class="profile">
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
            <cluster-panel :user="user"/>

            <div class="list-wrap">
              <h4 class="title">Biodata</h4>
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
                <router-link
                  class="badge-more"
                  :to="{path:'/profile/badge',query: {id: user.id}}"
                >Lihat lainnya</router-link>
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
                      <p
                        class="sub-text"
                        :data-text="badge.description"
                      >{{badge.badge.description || ''}}</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card tabs">
            <div class="nav-tabs">
              <ul>
                <li>
                  <router-link class="tab-nav" :to="{ path: '/profile/user', query: { id: this.$route.query.id }}">
                    <i class="icon icon-book"></i>
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="tab-nav"
                    :to="{ path: '/profile/user', query: { id: this.$route.query.id, history: 'penpol' }}"
                  >
                    <i class="icon icon-education"></i>
                  </router-link>
                </li>
              </ul>
            </div>

            <janji-politik-card
              v-if="$route.query.history == null"
              :data="feedLinimasa"
              :loading="isLoading"
              :paginationsLinimasa="paginationsLinimasa"
              @loadMoreLinimasa="loadMoreLinimasa"
            />

            <tanya-kandidat-card
              v-if="$route.query.history === 'penpol'"
              :questions="feedPenpol"
              :paginationsPenPol="paginationsPenPol"
              :loading="isLoading"
              @loadMorePenPol="loadMorePenPol"
            />
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
import JanjiPolitikCard from '@/components/profile/janji-politik-card'
import TanyaKandidatCard from '@/components/profile/tanya-kandidat-card'
export default {
  name: 'ProfileUser',
  components: {
    LayoutTimeline,
    WidgetVerified,
    VerifiedIconDefault,
    JanjiPolitikCard,
    TanyaKandidatCard,
    ClusterPanel
  },
  mixins: [authLink],
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      user: s => s.profile.profileUser,
      avatarURL: s => s.profile.profileAvatar,
      feedLinimasa: s => s.profile.historyLinimasa,
      feedPenpol: s => s.profile.historyPendidikanPolitik,
      paginationsLinimasa: s => s.profile.paginations.historyLinimasa,
      paginationsPenPol: s => s.profile.paginations.historyPenPol,
      badges: s => s.profile.badges
    })
  },
  methods: {
    imageLoadError() {
      this.imageLoad = false
    },
    loadMoreLinimasa() {
      if (this.paginationsLinimasa.isLast === false) {
        this.$store.dispatch('profile/nextPageLinimasaHistory')
        this.$store.dispatch('profile/updateLinimasaHistory', {
          id: this.$route.query.id
        })
      }
    },
    loadMorePenPol() {
      if (this.paginationsPenPol.isLast === false) {
        this.$store.dispatch('profile/nextPageQuestionHistory')
        this.$store.dispatch('profile/updateQuestionHistory', {
          id: this.$route.query.id
        })
      }
    }
  },
  mounted() {
    this.$store
      .dispatch('profile/getUser', {
        id: this.$route.query.id
      })
      .then(async () => {
        await this.$store.dispatch('profile/getLinimasaHistory', {
          id: this.$route.query.id
        }).then(() => {
          if(this.feedLinimasa.length <= 0){
            this.$store.commit('showLottie/showLottieJp')
          }
        })
        await setTimeout(() => (this.isLoading = false), 1000)
        await this.$store.dispatch('profile/getBadges', {
          id: this.$route.query.id
        })
        await this.$store.dispatch('profile/getQuestionHistory', {
          id: this.$route.query.id
        }).then(() => {
          if(this.feedPenpol.length <= 0){
            this.$store.commit('showLottie/showLottieTanya')
          }
        })
      })
  },
  destroyed() {
    this.$store.commit('profile/emptyBadges')
    this.$store.commit('showLottie/hideLottieUser')
  }
}
</script>
<style lang="sass" scoped>
a.router-link-exact-active i.icon
  background-color: #bd081c
i.icon
  display: block
  height: 25px
  width: 25px
  background: #4f4f4f
  margin: auto

  &.icon-book
    -webkit-mask: url(~@/assets/icon_book.svg)
  &.icon-education
    -webkit-mask: url(~@/assets/icon_education.svg)
  &.icon-record
    -webkit-mask: url(~@/assets/icon_record.svg)
  &.icon-report
    -webkit-mask: url(~@/assets/icon_report.svg)
  &.icon-date
    -webkit-mask: url(~@/assets/icon_date.svg)
span.icon
  position: relative
button.request-cluster
  background: none
  border: none
  cursor: pointer
  &.is-active + .dropdown-content
    display: block
button.create-cluster
  background: none
  border: none
  font-size: 12px
  font-weight: bold
  line-height: 1.33
  text-align: left
  color: #f2771d
  cursor: pointer
</style>
