<template>
  <div class="debat-list">
    <div class="meta">
      <slot name="meta"></slot>
    </div>
    <ul class="debat-item-list">
      <li v-for="item in debat" :key="item.id">
        <slot name="debat-item" :item="item"></slot>
      </li>
    </ul>
    <router-link class="see-more" :to="link">See more >></router-link>
  </div>
</template>

<script>
export default {
  name: 'DebatList',
  props: ['debat', 'link']
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
</style>
