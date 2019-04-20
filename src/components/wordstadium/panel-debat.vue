<template>
  <div class="panel-debat-container" @click.prevent="onClick(debat.id)">
    <card-debat :type="type" :debat="debat">
      <template slot="body-lower">
        <slot name="debat-card-footer" :item="debat"></slot>
      </template>
    </card-debat>
    <div class="panel-detail">
      <small class="tag"
        v-for="tag in debat.topic_list"
        :key="tag">
        {{tag}}
      </small>
      <button type="button" class="menu-btn">
        <i class="icon icon-menu"></i>
      </button>
      <p class="description">
        {{debat.statement}}
      </p>
    </div>
  </div>
</template>

<script>
import CardDebat from '@/components/wordstadium/card-debat'
export default {
  name: 'PanelDebat',
  props: ['debat', 'type'],
  components: { CardDebat },
  methods: {
    onClick(id) {
      this.$router.push(`/wordstadium/challenges/${id}`)
    }
  }
}
</script>

<style lang="sass" scoped>
.panel-debat-container
  display: flex
  width: 100%
  @media (max-width:767px)
    flex-direction: column
    .debat-card
      width: 100%

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
  @media (max-width:767px)
    margin-left: 0
    padding: 0
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
