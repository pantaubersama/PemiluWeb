<template>
  <div class="panel-debat-container">
    <card-debat type="coming-soon">
      <template slot="body-lower">
        <div class="date">
          12 Maret 2019 &bull; 13:20 - 14:30
        </div>
      </template>
    </card-debat>
    <div class="panel-detail">
      <small class="tag">ekonomi</small>
      <button type="button" class="menu-btn">
        <i class="icon icon-menu"></i>
      </button>
      <p class="description">
        2018 pertumbuhan ekonomi Indonesia mengalami pertumbuhan mencapai 5,27%. 2 periode yuk, biar 10,54%.
      </p>
    </div>
  </div>
</template>

<script>
import CardDebat from '@/components/wordstadium/card-debat'
export default {
  name: 'PanelDebatComingSoon',
  components: { CardDebat }
}
</script>

<style lang="sass" scoped>
.panel-debat-container
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
