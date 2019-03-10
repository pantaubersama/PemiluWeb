<template>
<timeline-layout>
    <div slot="main-content">
      <div class="notifikasi">
        <div class="card card-pilpres">
          <h4 class="title">Notifikasi</h4>
          <div class="no-post" v-if="showLottieNotif">
            <LottieEmptyNotif :message="'Belum ada Notifikasi buat kamu'"/>
          </div>

          <NotifList :data="fullNotif"/>
         <div style="border-top: 1px solid rgba(0, 0, 0, 0.125)" v-if="loadingAnimating">
            <NotifLoader/>
          </div>
          <div class="load-more" @click="loadMoreNotif" v-if="!paginationsNotification.isLast">Tampilkan lebih banyak
            <div class="arrow-icon">
              <bottom-arrow/>
            </div>
          </div>

        </div>
      </div>
    </div>
    <template slot="widget-wrapper">
      <div class="d-none d-lg-block">&nbsp;</div>
    </template>
</timeline-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NotifList from '@/components/Notif/NotifList'
import TimelineLayout from '@/layout/Timeline'
import LottieEmptyNotif from '@/components/LottieEmptyNotif'
import NotifLoader from '@/components/Loading/NotifLoader'
import { BottomArrow } from '@/svg/icons'
export default {
  name: 'Notifikasi',
  components: {
    TimelineLayout,
    NotifList,
    LottieEmptyNotif,
    BottomArrow,
    NotifLoader
  },
  computed: {
    ...mapState({
        fullNotif: s => s.notification.fullNotification,
        showLottieNotif: s => s.showLottie.showLottieNotif,
        paginationsNotification: s => s.notification.paginations.fullNotification,
        loadingAnimating: s => s.loadingLottie.loadingAnimating
      })
    },
    mounted() {
      this.$store.dispatch('notification/fullNotification')
    },
    methods: {
      loadMoreNotif(){
        if (this.paginationsNotification.isLast === false) {
          this.$store.dispatch('notification/nextPageNotification')
          this.$store.dispatch('notification/updateFullNotification')
        }
      }
    }
}
</script>

<style scoped>
</style>
