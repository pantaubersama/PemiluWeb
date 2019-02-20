<template>
  <timeline-layout>
    <div slot="main-content">
      <kecenderungan-result
        :totalKecenderungan="totalKecenderungan"
        @close="onClickCloseButton"
      />
    </div>
    <div slot="widget-wrapper">
    </div>
  </timeline-layout>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import TimelineLayout from '@/layout/Timeline'
  import KecenderunganResult from '@/components/pendidikan-politik/kecenderungan-result'

  export default {
    name: "ShareKecenderungan",

    data(){
      return {
        showModal: false,
      }
    },

    computed: {
      ...mapState({
        totalKecenderungan: state => state.PendidikanPolitikQuizParticipation.totalKecenderungan,
      })
    },

    created(){
      this.$store.dispatch('PendidikanPolitikQuizParticipation/getKecenderungan', {
        id: this.$route.params.id
      })
    },

    destroyed(){
      this.$store.dispatch('PendidikanPolitikQuizParticipation/emptyData')
    },

    components: {
      TimelineLayout,
      KecenderunganResult
    },

    methods: {
      onClickCloseButton() {
        this.showModal = false
      }
    }
  }
</script>

<style scoped>

</style>
