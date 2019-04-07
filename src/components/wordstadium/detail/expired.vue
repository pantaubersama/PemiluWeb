<template>
  <layout-timeline>
    <template slot="main-content">
      <debat-detail
        title="Open Challenge"
        :debat="debat"
        :with-source="false"
        :with-opponent="true"
        :challenger="challenger"
        :opponent="opponent"
        banner-text1="Tantangan tidak valid!"
        banner-text2="Tantangan melebihi batas waktu :("
      >
      <template slot="debat-subcontent">
          <confirmation-panel with-button disabled
            v-for="user in opponents"
            :key="user.id"
            :user="user"
          ></confirmation-panel>
      </template>
      </debat-detail>
    </template>
  </layout-timeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import DebatDetail from '@/components/debat-detail'
import ConfirmationPanel from '@/components/wordstadium/confirmation-panel'

export default {
  name: 'DebatDetailExpired',
  props: ['debat'],
  components: {
    LayoutTimeline,
    DebatDetail,
    ConfirmationPanel
  },
  computed: {
    challenger() { return this.debat.audiences.find(it => it.role === 'challenger') },
    opponent() { return this.debat.audiences.find(it => it.role.indexOf('opponent') > -1 ) },
    opponents() { return this.debat.audiences.filter(it => it.role.indexOf('opponent') > -1 ) }
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

.debat-subcontent .confirmation-panel
  margin-top: 20px
</style>
