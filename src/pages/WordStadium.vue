<template>
  <LayoutTimeline>
    <template slot="main-content">
      <div class="card card-tabs">
        <div class="title-tabs">
          <router-link to="/wordstadium">Publik</router-link>
          <router-link to="/wordstadium?type=personal">Personal</router-link>
        </div>

        <div v-if="$route.query.type === 'personal'">
          <div class="debat-list-container has--separator">
            <div class="debat-list-container">
              <div class="debat-list --challenge">
                <div class="meta">
                  <i class="icon icon-outline-lawan"></i>
                  <div class="title">Challenge in Progress</div>
                </div>
                <div class="lottie-card">
                  <div class="lottie-content" ref="comingsoonLottie"></div>
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
                  <div class="lottie-content" ref="comingsoon2Lottie"></div>
                  <span class="lottie-title">Belum ada apa-apa :(</span>
                </div>
              </div>
              <div class="debat-list --done">
                <div class="meta">
                  <i class="icon icon-debat-coming-soon"></i>
                  <div class="title">My Debat Done</div>
                </div>
                <div class="lottie-card">
                  <div class="lottie-content" ref="comingsoon3Lottie"></div>
                  <span class="lottie-title">Belum ada apa-apa :(</span>
                </div>
              </div>
            </div>
          </div>
          <div class="debat-list-container">
            <div class="debat-list --challenge">
              <div class="meta">
                <i class="icon icon-debat-challenge"></i>
                <div class="title">My Challenge</div>
              </div>
              <ul class="debat-item-list">
                <li>
                  <panel-debat-challenge></panel-debat-challenge>
                </li>
                <li>
                  <panel-debat-challenge></panel-debat-challenge>
                </li>
                <li>
                  <panel-debat-challenge></panel-debat-challenge>
                </li>
              </ul>
              <router-link class="see-more" to="/wordstadium/challenge">See more >></router-link>
            </div>
          </div>
        </div>

        <div v-else>
          <wordstadium-live-list :lives="lives" v-if="$route.query.type !== 'personal'"/>
          <div class="debat-list-container">
            <div class="debat-title">
              <h3 class="title">Linimasa Debat</h3>
              <p
                class="description"
              >Daftar challenge dan debat yang akan atau sudah berlangsung ditampilkan semua disini.</p>
            </div>
            <div class="debat-list --coming-soon">
              <div class="meta">
                <i class="icon icon-debat-coming-soon"></i>
                <div class="title">Debat: Coming Soon</div>
              </div>
              <ul class="debat-item-list">
                <li>
                  <panel-debat-coming-soon></panel-debat-coming-soon>
                </li>
              </ul>
              <router-link class="see-more" to="/wordstadium/coming-soon">See more >></router-link>
            </div>
            <div class="debat-list --done">
              <div class="meta">
                <i class="icon icon-debat-done"></i>
                <div class="title">Debat: Done</div>
              </div>
              <ul class="debat-item-list">
                <li>
                  <panel-debat-done></panel-debat-done>
                </li>
              </ul>
              <router-link class="see-more" to="/wordstadium/done">See more >></router-link>
            </div>
            <div class="debat-list --challenge">
              <div class="meta">
                <i class="icon icon-debat-challenge"></i>
                <div class="title">Challenge</div>
              </div>
              <ul class="debat-item-list">
                <li>
                  <panel-debat-challenge></panel-debat-challenge>
                </li>
              </ul>
              <router-link class="see-more" to="/wordstadium/challenge">See more >></router-link>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="widget-wrapper">
      <div class="d-none d-lg-block">&nbsp;</div>
    </template>
  </LayoutTimeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import ComingSoon from '@/components/ComingSoon'
import Lottie from 'lottie-web'
import WordstadiumLiveList from '@/components/wordstadium/live-list'
import CardDebat from '@/components/wordstadium/card-debat'
import PanelDebatComingSoon from '@/components/wordstadium/panel-debat-coming-soon'
import PanelDebatDone from '@/components/wordstadium/panel-debat-done'
import PanelDebatChallenge from '@/components/wordstadium/panel-debat-challenge'

export default {
  name: 'WordStadium',
  components: {
    LayoutTimeline,
    ComingSoon,
    WordstadiumLiveList,
    CardDebat,
    PanelDebatComingSoon,
    PanelDebatDone,
    PanelDebatChallenge,
    Lottie
  },
  data() {
    return {
      lives: []
    }
  },
  methods: {
    loadLottie() {
      if (this.$route.query.type !== 'personal') return
      this.comingsoonLottie = Lottie.loadAnimation({
        container: this.$refs.comingsoonLottie,
        path: '/lottie/empty-status.json',
        autoplay: true,
        loop: true,
        renderer: 'svg'
      })
      this.comingsoon2Lottie = Lottie.loadAnimation({
        container: this.$refs.comingsoon2Lottie,
        path: '/lottie/empty-status.json',
        autoplay: true,
        loop: true,
        renderer: 'svg'
      })
      this.comingsoon3Lottie = Lottie.loadAnimation({
        container: this.$refs.comingsoon3Lottie,
        path: '/lottie/empty-status.json',
        autoplay: true,
        loop: true,
        renderer: 'svg'
      })
    }
  },
  mounted() {
    this.loadLottie()
  },
  watch: {
    $route(to, from) {
      setTimeout(() => {
        this.loadLottie()
      }, 700)
    }
  },
  destroyed() {
    this.comingsoonLottie.destroy()
    this.comingsoon2Lottie.destroy()
    this.comingsoon3Lottie.destroy()
  }
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
