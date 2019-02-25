<template>
  <div class="profile-page user-page">
    <LayoutTimeline>
      <template slot="main-content">
         <div class="profil-list">
          <div class="card grey">
            <!-- {{user}} -->
            <!-- <span class="edit-icon">
              <a href="#" @click.prevent="() => modal = 'ModalEditProfile'">
                <img src="@/assets/icon_edit.svg">
              </a>
            </span> -->
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
export default {
  name: 'ProfileUser',
  components: {
    LayoutTimeline,
    WidgetVerified,
    VerifiedIconDefault
  },
  mixins: [authLink],
  computed: {
    ...mapState({
      user: s => s.profile.profileUser,
      avatarURL: s => s.profile.profileAvatar
      // badges: s => s.profile.badges,
      // feedLinimasa: s => s.profile.historyLinimasa,
      // feedPenpol: s => s.profile.historyPendidikanPolitik,
      // paginationsLinimasa: s => s.profile.paginations.historyLinimasa,
      // paginationsPenPol: s => s.profile.paginations.historyPenPol,
      // userSteps: s => s.profile.stepVerificationUser
    }),
    // sortedBadges() {
    //   return this.badges.slice().sort((a, b) => a.position - b.position)
    // }
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
    })
    // this.$store.dispatch('profile/getMe').then(async () => {
    //   await this.$store.dispatch('profile/getStepVerification')
    //   await this.$store.dispatch('profile/getLinimasaHistory', {
    //     id: this.user.id
    //   })
    //   await setTimeout(() => (this.isLoading = false), 1000)
    //   await this.$store.dispatch('profile/getBadges', {
    //       id: this.user.id
    //     })
    //   await this.$store.dispatch('profile/getQuestionHistory', {
    //     id: this.user.id
    //   })
    // })

    // window.addEventListener('click', this.removeDropdown)
  },
}
</script>
<style lang="sass" scoped>
.user-page
  .card
    padding-top: 20px
</style>
