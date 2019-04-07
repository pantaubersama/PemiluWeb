<template>
  <layout-timeline>
    <div slot="main-content" class="Wordstadium-ComingSoon">
      <div class="card card-tabs">
        <div class="title-tabs">
          <router-link to="/wordstadium">Publik</router-link>
          <router-link to="/wordstadium?type=personal">Personal</router-link>
        </div>
        <div class="debat-header">
          <div class="meta">
            <i class="icon icon-debat-live"></i>
            <div class="title">
              Live Now
            </div>
          </div>
          <p class="description">
            Ini daftar debat yang sedang berlangsung. <br>
            Yuk, pantau bersama!
          </p>
        </div>
        <ul class="debat-list">
          <li v-for="item in items"
            :key="item.id">
            <panel-debat type="live" :debat="item"></panel-debat>
          </li>
        </ul>
      </div>
    </div>
    <template slot="widget-wrapper">&nbsp;</template>
  </layout-timeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import PanelDebat from '@/components/wordstadium/panel-debat'
export default {
  name: 'Wordstadium-ComingSoon',
  components: {
    LayoutTimeline,
    PanelDebat
  },
  computed: {
    items() {
      return this.$store.getters['wordstadium/lives'] || []
    }
  },
  mounted() {
    this.$store.dispatch('wordstadium/getChallenge', 'live_now')
  }
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
  &.icon-debat-live
    background-image: url(~@/assets/icon-live.svg)
  &.icon-menu
    -webkit-mask: url(~@/assets/icon_more_vertical.svg)
    transform: rotate(90deg)
    background-color: #333

.debat-list li
  padding: 0 16px
.debat-header
  display: flex
  background-image: url(~@/assets/img-debat-header-bg.svg)
  background-position: bottom
  background-repeat: no-repeat
  flex-direction: column
  margin-top: 4px
  padding: 16px
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
  .description
    font-size: 12px
    line-height: 1.25
    text-align: left
    color: #707070
    margin-top: 8px
</style>
