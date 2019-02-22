<template>
  <div class="Wordstadium-live-list">
    <div class="titlebar">
      <i class="icon icon-live-now"></i>
      <div class="title">Live now</div>
      <router-link class="see-more" to="/wordstadium/live">See more >></router-link>
    </div>
    <ul class="debat-item-list --horizontal">
      <button type="button" class="go-left"
        @mousedown.prevent="scroll(10)"
        @mouseup.prevent="clearScroll()">
        <i class="icon icon-arrow-left"></i>
      </button>
      <li v-for="item in items"
        :key="item"
        :style="`transform: translateX(${scrollValue}px)`">
        <card-debat type="live">
          <template slot="body-lower">
            <small class="tag">ekonomi</small>
            <p class="description">
              2018 pertumbuhan ekonomi Indonesia
              mengalami pertumbuhan mencapai 5,27%.
              2 periode yuk, biar 10,54%.
            </p>
          </template>
        </card-debat>
      </li>
      <button type="button" class="go-right"
        @mousedown.prevent="scroll(-10)"
        @mouseup.prevent="clearScroll()">
        <i class="icon icon-arrow-right"></i>
      </button>
    </ul>
  </div>
</template>

<script>
import CardDebat from '@/components/wordstadium/card-debat'

export default {
  name: 'LiveList',
  components: {
    CardDebat
  },
  data() {
    return {
      scrollValue: 0,
      scrollIntervalId: -1
    }
  },
  computed: {
    items() {
      return Array.from(Array(10).keys())
    }
  },
  methods: {
    scroll(delta) {
      if (this.intervalId !== -1) this.clearScroll()
      this.intervalId = window.setInterval(() => {
        this.scrollValue += delta
      }, 100)
    },
    clearScroll() {
      if (this.intervalId !== -1) {
        window.clearInterval(this.intervalId)
        this.intervalId = -1
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.Wordstadium-live-list
  .debat-card
    height: 180px
.debat-card /deep/ .body-lower
  margin-top: 5px !important
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  .tag
    flex: 0
    border: 1px solid #f9d65c
    border-radius: 4px
    padding: 4px
  .description
    font-family: BwModelicaSS01, Lato, sans-serif;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: condensed;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: center;
    color: #212121;

.debat-item-list.--horizontal
  display: flex
  overflow: hidden
  position: relative
  button
    position: absolute
    top: 50%
    transform: translateY(-50%)
    background: rgba(255, 255, 255, 0.8)
    height: 100%
    z-index: 9
    border: 0
    cursor: pointer
    &.go-right
      right: 0
    &.go-left
      left: 0
.Wordstadium-live-list
  border-bottom: 5px solid #ececec

.titlebar
  display: flex
  align-items: center
  padding: 5px 10px

i.icon
  background-size: contain
  background-position: center
  display: inline-block
  height: 24px
  width: 24px
  &.icon-live-now
    background-image: url(~@/assets/icon-live.svg)
  &.icon-arrow-right
    background-image: url(~@/assets/ic-arrow-right.svg)
  &.icon-arrow-left
    background-image: url(~@/assets/ic-arrow-right.svg)
    transform: scaleX(-1)

.title
  font-size: 20px
  font-weight: 900
  font-style: italic
  line-height: 0.95
  color: #212121
  margin-left: 8px

.see-more
  font-size: 14px
  font-weight: bold
  line-height: 0.86
  color: #f49422
  margin-right: 0
  margin-left: auto

</style>
