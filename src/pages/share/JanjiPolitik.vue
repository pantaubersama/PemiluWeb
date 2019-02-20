<template>
  <timeline-layout>
    <div slot="main-content" v-if="isLoadingJanjiPolitik">
      <!-- loading state -->
    </div>
    <div slot="main-content" v-else>
      <DetailPost :data="janji_politik" :userAuth="userAuth" :user="user"/>
    </div>
    <div slot="widget-wrapper">
    </div>
  </timeline-layout>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import TimelineLayout from '@/layout/Timeline'
  import DetailPost from '@/components/Linimasa/DetailPost'


  export default {
    name: "ShareJanjiPolitik",

    components: {
      TimelineLayout,
      DetailPost
    },

    data() {
      return {
      }
    },

    computed: {
      ...mapState({
        janji_politik: state => state.LiniMasaDetail.janji_politik,
        user: state => state.profile.user,
        userAuth: state => state.meLogout.userLogin,
        isLoadingJanjiPolitik: state => state.LiniMasaDetail.isLoadingJanjiPolitik
      })
    },

    created(){
      this.$store.dispatch('LiniMasaDetail/getDetailJanjiPolitik', { id: this.$route.params.id } )
    },

    destroyed(){
      this.$store.dispatch('LiniMasaDetail/emptyDetail')
    }
  }
</script>

<style scoped>

</style>
