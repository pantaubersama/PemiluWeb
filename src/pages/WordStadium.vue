<template>
  <LayoutTimeline>
    <template slot="main-content">

      <div class="card card-tabs">
        <div class="title-tabs">
          <router-link to="/wordstadium">Publik</router-link>
          <router-link to="/wordstadium?type=personal">Personal</router-link>
        </div>

        <wordstadium-live-list
          :lives="lives">
        </wordstadium-live-list>

        <div class="debat-list-container">
          <div class="debat-title">
            <h3 class="title">Linimasa Debat</h3>
            <p class="description">
              Daftar challenge dan debat yang akan atau sudah berlangsung ditampilkan semua disini.
            </p>
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
            <router-link class="see-more" to="/wordstadium/coming-soon">
              See more >>
            </router-link>
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

    </template>
    <template slot="widget-wrapper">
      <div class="d-none d-lg-block">&nbsp;</div>
    </template>
  </LayoutTimeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import ComingSoon from '@/components/ComingSoon'
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
    PanelDebatChallenge
  },
  data() {
    return {
      lives: []
    }
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

</style>
