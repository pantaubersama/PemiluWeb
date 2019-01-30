<template>
  <timeline-layout>
    <div slot="main-content" class="page">
      <CatatanResult
        :selected="user.vote_preference"
        :totalKecenderungan="totalKecenderungan"
        @onSelected="selectCalon($event)"
      />
      <CatatanPartai
        :selected="user.political_party || {}"
        :politicalParties="politicalParties"
        @onSelected="selectPartai($event)"
      />
    </div>
    <div slot="widget-wrapper"></div>
  </timeline-layout>
</template>

<script>
import { mapState } from 'vuex'

import TimelineLayout from '@/layout/Timeline'

import CatatanResult from '@/components/CatatanPilihan/CatatanResult'
import CatatanPartai from '@/components/CatatanPilihan/CatatanPartai'

export default {
  name: 'CatatanPilihan',
  components: {
    TimelineLayout,
    CatatanResult,
    CatatanPartai
  },
  computed: {
    ...mapState({
      user: state => state.profile.user,
      totalKecenderungan: state => state.pendidikanPolitik.totalKecenderungan,
      politicalParties: state => state.profile.politicalParties
    })
  },
  data() {
    return {}
  },
  methods: {
    selectCalon(id) {
      return this.$store.dispatch('profile/selectCalon', { id })
    },
    selectPartai(id) {
      return this.$store.dispatch('profile/selectPartai', { id })
    },
    getPoliticalParties() {
      return this.$store.dispatch('profile/getPoliticalParties')
    }
  },
  mounted() {
    this.getPoliticalParties()
  }
}
</script>
