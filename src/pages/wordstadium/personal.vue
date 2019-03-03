<template>
  <div>
    <div class="debat-list-container has--separator">
      <div class="debat-list-container">
        <div class="debat-list --challenge">
          <div class="meta">
            <i class="icon icon-outline-lawan"></i>
            <div class="title">Challenge in Progress</div>
          </div>
          <div class="lottie-card">
            <div class="lottie-content" ref="lottie1"></div>
            <span class="lottie-title">Belum ada apa-apa :(</span>
          </div>
        </div>
      </div>
    </div>
    <div class="debat-list-container has--separator">
      <div class="debat-list-container">
        <div class="debat-title">
          <h3 class="title">My Wordstadium</h3>
          <p
            class="description"
          >Daftar tantangan dan debat yang akan atau sudah kamu ikuti ditampilkan semua di sini.</p>
        </div>
        <div class="debat-list --coming-soon">
          <div class="meta">
            <i class="icon icon-debat-coming-soon"></i>
            <div class="title">My Debat Coming Soon</div>
          </div>
          <div class="lottie-card">
            <div class="lottie-content" ref="lottie2"></div>
            <span class="lottie-title">Belum ada apa-apa :(</span>
          </div>
        </div>
        <div class="debat-list --done">
          <div class="meta">
            <i class="icon icon-debat-coming-soon"></i>
            <div class="title">My Debat Done</div>
          </div>
          <div class="lottie-card">
            <div class="lottie-content" ref="lottie3"></div>
            <span class="lottie-title">Belum ada apa-apa :(</span>
          </div>
        </div>
      </div>
    </div>
    <div class="debat-list-container">
      <debat-list :debat="challenges" link="/wordstadium/challenge?type=personal">
        <template slot="meta">
          <i class="icon icon-debat-challenge"></i>
          <div class="title">My Challenge</div>
        </template>
        <template slot="debat-item" slot-scope="props">
          <panel-debat type="challenge" :debat="props.item"></panel-debat>
        </template>
      </debat-list>
    </div>
  </div>
</template>

<script>
import dummy from '@/pages/wordstadium/dummy-debat.json'
import Lottie from 'lottie-web'
import CardDebat from '@/components/wordstadium/card-debat'
import DebatList from '@/pages/wordstadium/debat-list'
import PanelDebat from '@/components/wordstadium/panel-debat'
export default {
  name: 'WordstadiumPersonal',
  components: {
    DebatList,
    CardDebat,
    PanelDebat
  },
  data() {
    return {
      dummy: dummy,
      lottie: { 1: null, 2: null, 3: null }
    }
  },
  computed: {
    ongoing() {
      return this.$store.getters['wordstadium/privateOngoing']()
    },
    challenges() {
      return this.ongoing
    },
    lives() {
      return []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        for (let i of [1,2,3]) {
          if (this.lottie[i] != null) this.lottie[i].play()
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('wordstadium/getOngoingPrivateChallenges')
    for (let i of [1, 2, 3]) {
      this.lottie[i] = Lottie.loadAnimation({
        container: this.$refs[`lottie${i}`],
        path: '/lottie/empty-status.json',
        loop: true,
        autoplay: true,
        renderer: 'svg'
      })
    }
  },
  destroyed() {
    for (let i of [1,2,3]) {
      if (this.lottie[i] != null) this.lottie[i].destroy()
    }
  },
  methods: {}
}
</script>

<style lang="sass" scoped>
a.see-more
  margin-top: 10px
  text-align: center
  margin-left: 50%
  transform: translateX(-50%)
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.86;
  letter-spacing: normal;
  text-align: center;
  color: #f49422;
.debat-list-container
  padding: 10px
.debat-title
  border-bottom: 1px solid #ececec
  padding-bottom: 16px
  .title
    font-size: 20px
    font-weight: 900
    line-height: 0.95
    color: #212121
    text-transform: uppercase
  .description
    font-size: 12px
    line-height: 1.17
    color: #7c7c7c
    margin: 0

.debat-item-list
  width: 100%
  li
    display: flex
    .panel-detail
      flex: 1
      padding: 10px
      margin-top: 10px
      margin-left: 10px
      padding-top: 0
      position: relative
      small
        border: 1px solid #f9d65c
        border-radius: 4px
        padding: 4px
      button.love-btn,
      button.menu-btn
        display: inline-flex
        position: absolute
        top: 0
        right: 0
        background: white
        border: none
        cursor: pointer
      button.love-btn
        right: 35px
        font-size: 12px
        font-weight: bold
        line-height: 1
        color: #111111
        align-items: center
      .description
        margin-top: 10px
        font-family: BwModelicaSS01, Lato, sans-serif
        font-size: 14px
        font-weight: 500
        font-stretch: condensed
        line-height: 1.21
        letter-spacing: 0.1px
        color: #212121

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

.debat-list
  margin-top: 16px
  display: flex
  justify-content: center
  align-items: flex-start
  flex-direction: column
  .meta
    display: flex
    align-items: center
  .title
    font-size: 20px
    font-weight: 900
    font-style: italic
    line-height: 0.95
    color: #212121
    margin-left: 8px

/deep/ .lottie-card
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  width: 100%
  padding: 32px 0 16px 0

  .lottie-content
    padding: 32px 0 16px 0
    margin-bottom: 16px

    .lottie-title
      display: block
      margin: 16px 0 67px
      height: 15px
      font-family: Lato
      font-size: 12px
      font-style: italic
      line-height: 1.17
      text-align: center
      color: #7c7c7c

    svg
      width: 80px !important
      height: 80px !important

.has--separator
  border-bottom: 5px solid #ececec
  margin-bottom: 6px

</style>
