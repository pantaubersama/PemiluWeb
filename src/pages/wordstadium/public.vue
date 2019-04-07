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
          <panel-debat type="coming-soon"
            :debat="props.item"
            @click="$router.push(`/wordstadium/challenges/${props.item.id}`)">
            <template slot="debat-card-footer">
              {{props.item.footer}}
            </template>
          </panel-debat>
        </template>
      </debat-list>

      <debat-list :debat="done" link="/wordstadium/done">
        <template slot="meta">
          <i class="icon icon-debat-done"></i>
          <div class="title">Debat: Done</div>
        </template>
        <template slot="debat-item" slot-scope="props">
          <panel-debat type="done"
            :debat="props.item"
            @click="$router.push(`/wordstadium/challenges/${props.item.id}`)">
            <div slot="debat-card-footer" class="footer-done">
              <div class="clap clap-1">
                <i class="icon icon-clap"></i> {{props.item.audiences[0].clap_count}}
              </div>
              <div class="clap-text">Clap</div>
              <div class="clap clap-2">
                <i class="icon icon-clap"></i> {{props.item.audiences[1].clap_count}}
              </div>
            </div>
          </panel-debat>
        </template>
      </debat-list>

      <debat-list :debat="challenges" link="/wordstadium/challenge">
        <template slot="meta">
          <i class="icon icon-debat-challenge"></i>
          <div class="title">Challenge</div>
        </template>
        <template slot="debat-item" slot-scope="props">
          <panel-debat type="challenge"
            :debat="props.item"
            @click="$router.push(`/wordstadium/challenges/${props.item.id}`)">
            <template slot="debat-card-footer">
              {{props.item.footer}}
            </template>
          </panel-debat>
        </template>
      </debat-list>
    </div>
  </div>
</template>

<script>
import datefns from 'date-fns'
import WordstadiumLiveList from '@/components/wordstadium/live-list'
import CardDebat from '@/components/wordstadium/card-debat'
import PanelDebat from '@/components/wordstadium/panel-debat'
import DebatList from '@/pages/wordstadium/debat-list'
export default {
  name: 'WordstadiumPublic',
  components: {
    DebatList,
    CardDebat,
    PanelDebat,
    WordstadiumLiveList
  },
  computed: {
    comingSoon() {
      const comingSoon = this.$store.getters['wordstadium/comingSoon'] || []
      return comingSoon
        .slice(0, 5) // Limit to only 5 first
        .map((data) => ({
          ...data,
          footer: this.$getShowTime(data.show_time_at, data.time_limit)
        }))
    },
    challenges() {
      const challenges = this.$store.getters['wordstadium/challenges'] || []
      return challenges
        .slice(0, 5)
        .map((data) => ({
          ...data,
          footer: data.progress.split('_').map(it => it.charAt(0).toUpperCase() + it.substring(1)).join(' ')
        }))
    },
    lives() {
      const lives = this.$store.getters['wordstadium/lives'] || []
      return lives
        .slice(0, 5)
        .map((data) => ({
          ...data,
          show_time_at: this.$getShowTime(data.show_time_at, data.time_limit)
        }))
    },
    done() {
      const done = this.$store.getters['wordstadium/done'] || []
      return done
        .slice(0, 5)
        .map((data) => ({
          ...data,
          footer: `Clap ${data.clap_count}`
        }))
    }
  },
  mounted() {
    this.$store.dispatch('wordstadium/getAllChallenges')
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
  &.icon-clap
    background-image: url(~@/assets/ic-clap.svg)
    background-size: 20px
.footer-done
  flex: 1
  display: flex
  justify-content: space-between
  align-items: center
  .clap
    display: flex
    align-items: center

</style>
