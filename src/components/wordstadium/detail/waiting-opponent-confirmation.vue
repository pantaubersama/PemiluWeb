<template>
  <layout-timeline>
    <template slot="main-content">
      <debat-detail
        title="Direct Challenge"
        :debat="debat"
        :with-source="true"
        :with-opponent="true"
        :challenger="challenger"
        :opponent="opponent"
        banner-text1="Menunggu,"
        :banner-text2="`${opponent.full_name} mengkonfirmasi tantangan`"
      >
      <template slot="debat-subcontent">
      </template>
      </debat-detail>
    </template>
  </layout-timeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import DebatDetail from '@/components/debat-detail'
import dummyDebat from '@/pages/wordstadium/dummy-debat.json'

export default {
  name: 'WaitingOpponentConfirmation',
  props: ['debat'],
  components: {
    LayoutTimeline,
    DebatDetail
  },
  computed: {
    challenger() {
      return this.debat.audiences.find(it => it.role === 'challenger')
    },
    opponent() {
      return this.debat.audiences.find(it => it.role.indexOf('opponent') > -1)
    }
  }
}
</script>

<style lang="sass" scoped>
.debat-detail-container /deep/ .header
  background-image: url(~@/assets/bg-debat-detail-banner-challenge.svg)
.debat-detail-container /deep/ .debat-banner
  background-image: url(~@/assets/bg-debat-detail-expired.svg)
.debat-detail-container /deep/ .debat-banner .banner-text-2
    color: #bd081c
</style>
