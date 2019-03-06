<template>
  <div class="header-notif">
    <h2 class="title">Notifikasi</h2>
    <div class="no-post" v-if="showLottieNotif">
      <LottieEmptyNotif :message="'Belum ada Notifikasi buat kamu'"/>
    </div>
    <NotifList :data="recentNotif"/>
    <router-link to="/notifikasi" class="btn btn-primary">Lihat Semua Notifikasi</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LottieEmptyNotif from '@/components/LottieEmptyNotif'
import NotifList from '@/components/Notif/NotifList'
  export default {
    name: 'HeaderNotif',
    components: {
      LottieEmptyNotif,
      NotifList
    },
    computed: {
    ...mapState({
        recentNotif: s => s.notification.recentNotification,
        showLottieNotif: s => s.showLottie.showLottieNotif
      })
    },
    mounted() {
      this.$store.dispatch('notification/recentNotification')
    }
  }
</script>

<style lang="sass" scoped>
.btn-primary
  justify-content: center
  border-radius: 0
  align-items: center
  padding: 10px 20px
  font-family: Lato
  font-size: 12px
  line-height: 1.25
  letter-spacing: 1.2px
  color: white
  height: 47px
</style>
