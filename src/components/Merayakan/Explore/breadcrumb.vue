<template>
  <ul class="breadcrumbs">
    <li>
      <router-link :to="base"><logo-pantau></logo-pantau></router-link>
    </li>
    <li v-for="item in items" :key="item.id">
      <slot name="item-renderer" :item="item"></slot>
    </li>
  </ul>
</template>

<script>
import {LogoPantau} from '@/svg/icons'
export default {
  name: 'Breadcrumb',
  props: ['base', 'items'],
  components: { LogoPantau }
}
</script>

<style lang="sass" scoped>
.breadcrumbs
  display: flex
  align-items: center
  flex-wrap: wrap
  margin: 10px 0
  font-family: 'Bw Modelica'
  li
    display: flex
    align-items: center
    &:before
      content: ""
      background-color: #7c7c7c
      -webkit-mask: url('~@/assets/icon-chevron-right.svg')
      -webkit-mask-position: center
      -webkit-mask-repeat: no-repeat
      -webkit-mask-size: 25px
      height: 25px
      width: 25px
    &:first-child:before
      display: none
  a
    color: #7c7c7c
  svg
    width: 24px
    height: 15px
</style>
