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
            <i class="icon icon-debat-done"></i>
            <div class="title">Debat: Done</div>
          </div>
          <p class="description">
            Berika komentar dan appresiasi pada debat-debat yang sudah selesai. <br>
            Daftarnya ada di bawah ini:
          </p>
        </div>
        <ul class="debat-list">
          <li v-for="item in items"
            :key="item.id">
            <panel-debat type="done" :debat="item">
              <div slot="debat-card-footer" class="footer-done">
                <div class="clap clap-1">
                  <i class="icon icon-clap"></i> {{getClapCount(item.audiences[0])}}
                </div>
                <div class="clap-text">Clap</div>
                <div class="clap clap-2">
                  <i class="icon icon-clap"></i> {{getClapCount(item.audiences[1])}}
                </div>
              </div>
            </panel-debat>
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
  name: 'Wordstadium-Done',
  components: {
    LayoutTimeline,
    PanelDebat
  },
  computed: {
    type() {
      return this.$route.query.type || 'public'
    },
    items() {
      let item = []
      if (this.type === 'personal') {
        item = this.$store.getters['wordstadium/privateDone'] || []
      } else {
        item = this.$store.getters['wordstadium/done'] || []
      }
      return item
    }
  },
  mounted() {
    if (this.type === 'personal') {
      this.$store.dispatch('wordstadium/getPrivateChallenge', 'done')
    } else {
      this.$store.dispatch('wordstadium/getChallenge', 'done')
    }
  },
  methods: {
    getClapCount(user) {
      if (user == null) return 0
      return user.clap_count
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
