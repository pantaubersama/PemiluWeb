<template>
  <div class="panel-debat-container">
    <card-debat type="challenge">
      <template slot="body-lower">Menunggu Lawan Debat</template>
    </card-debat>
    <div class="panel-detail">
      <small class="tag">{{ data.topic_list ? data.topic_list[0] : '' }}</small>
      <button type="button" class="menu-btn">
        <i class="icon icon-menu"></i>
      </button>
      <p class="description" v-html="data.statement"></p>
    </div>
  </div>
</template>

<script>
import CardDebat from '@/components/wordstadium/card-debat'
export default {
  name: 'PanelDebatChallenge',
  components: { CardDebat },
  props: {
    data: Object
  }
}
</script>

<style lang="sass" scoped>
.panel-debat-container
  display: flex
.debat-card /deep/ .body-lower
  display: flex
  justify-content: center
  height: 25px
  padding: 0 10px
  text-align: center

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
  button.menu-btn
    display: inline-flex
    position: absolute
    top: 0
    right: 0
    background: white
    border: none
    cursor: pointer
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
  &.icon-menu
    -webkit-mask: url(~@/assets/icon_more_vertical.svg)
    transform: rotate(90deg)
    background-color: #333

</style>
