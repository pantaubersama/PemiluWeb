<template>
  <layout-timeline>
    <template slot="main-content">
      <debat-detail
        title="Open Challenge"
        :debat="debat"
        :with-source="false"
        :with-opponent="false"
        :challenger="challenger"
        :opponent="null"
        banner-text1="Menunggu,"
        banner-text2="lawan menerima tantanganmu"
      >
      <template slot="debat-subcontent">
        <button type="button" class="promote-again">
          <button type="button" v-if="!isPromoting" @click.prevent.stop="promote()">Promosikan tantangan kamu sekali lagi >></button>
          <div v-else>Mempromosikan ...</div>
        </button>
      </template>
      </debat-detail>
    </template>
  </layout-timeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import DebatDetail from '@/components/debat-detail'
import * as WordstadiumAPI from '@/services/api/wordstadium'

export default {
  name: 'DebatDetailWaiting',
  props: ['debat'],
  components: {
    LayoutTimeline,
    DebatDetail
  },
  data() {
    return {
      isPromoting: false
    }
  },
  computed: {
    challenger() {
      return this.debat.audiences.find(it => it.role === 'challenger')
    }
  },
  methods: {
    promote() {
      this.isPromoting = true
      return WordstadiumAPI.promote(this.debat.id)
        .then(() => {
          this.isPromoting = false
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.debat-detail-container /deep/ .header
  background-image: url(~@/assets/bg-debat-detail-banner-challenge.svg)
.debat-detail-container /deep/ .debat-banner
  background-image: url(~@/assets/bg-debat-detail-waiting.svg)

.debat-subcontent
  margin-top: 20px
.promote-again
  font-size: 14px
  font-weight: bold
  line-height: 0.86
  text-align: left
  color: #f49422
  padding: 10px 0
  background: none
  border: none
  cursor: pointer
  button,
  div
    background: none
    border: none
    cursor: pointer
    color: inherit
</style>
