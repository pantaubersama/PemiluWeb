<template>
  <div class="debat-list-container">
    <wordstadium-live-list :lives="lives"></wordstadium-live-list>
    <div class="debat-list-container">
      <div class="debat-title">
        <h3 class="title">Linimasa Debat</h3>
        <p class="description">
          Daftar challenge dan debat yang akan atau sudah berlangsung ditampilkan
          semua disini.
        </p>
      </div>

      <debat-list :debat="comingSoon" link="/wordstadium/coming-soon">
        <template slot="meta">
          <i class="icon icon-debat-coming-soon"></i>
          <div class="title">Debat: Coming Soon</div>
        </template>
        <template slot="debat-item" slot-scope="props">
          <panel-debat type="coming-soon" :debat="props.item">
            <template slot="debat-card-footer">
              12 Maret 2019 &bull; 13:20 - 14:30
            </template>
          </panel-debat>
        </template>
      </debat-list>

      <debat-list :debat="challenges" link="/wordstadium/challenge">
        <template slot="meta">
          <i class="icon icon-debat-challenge"></i>
          <div class="title">Challenge</div>
        </template>
        <template slot="debat-item" slot-scope="props">
          <panel-debat-challenge :debat="props.item"></panel-debat-challenge>
        </template>
      </debat-list>
    </div>
  </div>
</template>

<script>
import dummy from '@/pages/wordstadium/dummy-debat.json'
import WordstadiumLiveList from '@/components/wordstadium/live-list'
import CardDebat from '@/components/wordstadium/card-debat'
import PanelDebat from '@/components/wordstadium/panel-debat'
import PanelDebatComingSoon from '@/components/wordstadium/panel-debat-coming-soon'
import PanelDebatChallenge from '@/components/wordstadium/panel-debat-challenge'
import DebatList from '@/pages/wordstadium/debat-list'
export default {
  name: 'WordstadiumPublic',
  components: {
    DebatList,
    CardDebat,
    PanelDebat,
    WordstadiumLiveList,
    PanelDebatComingSoon,
    PanelDebatChallenge
  },
  computed: {
    ongoing() {
      return this.$store.getters['wordstadium/ongoing']
    },
    challenges() {
      return this.ongoing
    },
    lives() {
      return Array.from(Array(5).keys())
        .map((id) => ({ ...dummy, id: id }))
    },
    comingSoon() {
      return Array.from(Array(5).keys())
        .map((id) => ({ ...dummy, id: id }))
    }
  },
  mounted() {
    this.$store.dispatch('wordstadium/getOngoingChallenges')
  },
  methods: {}
}
</script>

<style lang="sass" scoped>
.icon
  display: inline-block
  height: 24px
  width: 24px
  background-repeat: no-repeat
  background-position: center
  background-size: contain
  &.icon-debat-coming-soon
    background-image: url(~@/assets/ic-debat-coming-soon.svg)
  &.icon-debat-done
    background-image: url(~@/assets/ic-debat-done.svg)
  &.icon-debat-challenge
    background-image: url(~@/assets/ic-debat-challenge.svg)
  &.icon-outline-lawan
    background-image: url(~@/assets/ic-outline-lawan.svg)
  &.icon-menu
    -webkit-mask: url(~@/assets/icon_more_vertical.svg)
    transform: rotate(90deg)
    background-color: #333
  &.icon-love
    background-image: url(~@/assets/ic-love.svg)

</style>
