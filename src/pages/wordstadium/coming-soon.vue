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
            <i class="icon icon-debat-coming-soon"></i>
            <div class="title">Debat: Coming Soon</div>
          </div>
          <p class="description">
            Jangan lewatkan daftar debat yang akan segera berlangsung.
            Catat jadwalnya, yaa.
          </p>
        </div>
        <ul class="debat-list">
          <li v-for="item in items" :key="item.id">
            <panel-debat type="coming-soon" :debat="item">
              <template slot="debat-card-footer">
                {{item.show_time_at}}
              </template>
            </panel-debat>
          </li>
        </ul>
      </div>
    </div>
    <template slot="widget-wrapper">&nbsp;</template>
  </layout-timeline>
</template>

<script>
import datefns from 'date-fns'
import LayoutTimeline from '@/layout/Timeline'
import PanelDebat from '@/components/wordstadium/panel-debat'
import DebatList from '@/pages/wordstadium/debat-list'

export default {
  name: 'Wordstadium-ComingSoon',
  components: {
    LayoutTimeline,
    PanelDebat,
    DebatList
  },
  computed: {
    items() {
      const comingSoon = this.$store.getters['wordstadium/comingSoon'] || []
      return comingSoon.map((data) => ({
        ...data,
        show_time_at: datefns.format(data.show_time_at, 'DD MMMM YYYY • hh:mm')
      }))
    }
  },
  mounted() {
    this.$store.dispatch('wordstadium/getComingSoonChallenges')
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
