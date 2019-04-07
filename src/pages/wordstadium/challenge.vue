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
            <i class="icon icon-debat-challenge"></i>
            <div class="title">Challenge</div>
          </div>
          <p class="description">
            Daftar Open Challengeyang bisa diikuti. Pilih debat mana yang kamu ingin ambil tantangannya. <br>
            Be thruthful and gentle! ;)
          </p>
        </div>
        <ul class="debat-list">
          <li v-for="item in items"
            :key="item.id">
            <panel-debat type="challenge" :debat="item">
              <template slot="debat-card-footer" slot-scope="props">
                <template v-if="props.item.progress === 'waiting_opponent'">Menunggu Lawan Debat</template>
                <template v-if="props.item.progress === 'waiting_confirmation'">Menunggu Konfirmasi</template>
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
import {mapGetters} from 'vuex'
import LayoutTimeline from '@/layout/Timeline'
import PanelDebat from '@/components/wordstadium/panel-debat'
export default {
  name: 'Wordstadium-ComingSoon',
  components: {
    LayoutTimeline,
    PanelDebat
  },
  computed: {
    type() {
      return this.$route.query.type || 'public'
    },
    $items() {
      if (this.type && this.type === 'personal') {
        return this.$store.getters['wordstadium/privateChallenge']
      }
      return this.$store.getters['wordstadium/challenges']
    },
    items() {
      return this.$items.map((item) => ({
        ...item,
        avatar: item.avatar || {}
      }))
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query.type && route.query.type === 'personal') {
          return this.$store.dispatch('wordstadium/getPrivateChallenge', 'challenge')
        }
        return this.$store.dispatch('wordstadium/getChallenge', 'challenge')
      }
    }
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
