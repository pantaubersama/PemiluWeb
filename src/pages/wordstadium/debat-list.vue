<template>
  <div class="debat-list">
    <div class="meta">
      <slot name="meta"></slot>
    </div>
    <template v-if="!showLottie">
      <ul class="debat-item-list">
        <li v-for="item in debat" :key="item.id">
          <slot name="debat-item" :item="item"></slot>
        </li>
      </ul>
      <router-link class="see-more" :to="link">See more >></router-link>
    </template>
    <template v-else>
      <div class="lottie-card">
        <div class="lottie-content" ref="lottie"></div>
        <span class="lottie-title">Belum ada apa-apa :(</span>
      </div>
    </template>
  </div>
</template>

<script>
import Lottie from 'lottie-web'
export default {
  name: 'DebatList',
  props: ['debat', 'link'],
  data() {
    return {
      lottie: false
    }
  },
  computed: {
    showLottie() {
      return this.debat != null && this.debat.length <= 0
    }
  },
  mounted() {
    if (this.showLottie) {
      this.lottie = Lottie.loadAnimation({
        container: this.$refs.lottie,
        path: '/lottie/empty-status.json',
        loop: true,
        autoplay: true,
        renderer: 'svg'
      })
    }
  },
  destroyed() {
    if (this.showLottie && this.lottie != null) this.lottie.destroy()
  }
}
</script>

<style lang="sass" scoped>
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
  a.see-more
    margin-top: 10px
    text-align: center
    margin-left: 50%
    transform: translateX(-50%)
    font-size: 14px
    font-weight: bold
    line-height: 0.86
    text-align: center
    color: #f49422
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
</style>
