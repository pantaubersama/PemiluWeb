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
export default {
  name: 'Notifikasi',
  components: {
    TimelineLayout,
    NotifList,
    LottieEmptyNotif
  },
  computed: {
    ...mapState({
        fullNotif: s => s.notification.fullNotification,
        showLottieNotif: s => s.showLottie.showLottieNotif
      })
    },
    mounted() {
      this.$store.dispatch('notification/fullNotification')
    }
}
</script>

<style scoped>
</style>
