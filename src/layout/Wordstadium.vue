<template>
  <div class="wrapper layout-wordstadium" :class="{'sidebar-open':isToggle}">
    <div class="menu-bg"></div>
    <Header @toggleSidebar="activeSidebar" @removeSidebar="removeSidebar"/>
    <div class="container main-wrapper">
      <div class="col-lg-3 sidebar d-block d-lg-none">
        <slot name="sidebar">
          <nav-sidebar-top></nav-sidebar-top>
          <nav-sidebar-bottom></nav-sidebar-bottom>
        </slot>
      </div>
      <div class="col-lg-9 main-content">
        <slot name="main-content">Main Content</slot>
      </div>
      <div class="col-lg-3 widget-wrapper">
        <slot name="widget-wrapper">Widget wrapper</slot>
      </div>
    </div>
  </div>
</template>

<script>
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
import { SearchIcon, NotificationIcon, WordStadiumIcon } from '@/svg/icons'
import Header from '@/components/Header'

export default {
  name: 'LayoutWordstadium',
  components: {
    NavSidebarTop,
    NavSidebarBottom,
    SearchIcon,
    NotificationIcon,
    WordStadiumIcon,
    Header
  },
  data() {
    return {
      isToggle: false
    }
  },
  methods: {
    activeSidebar() {
      this.isToggle = !this.isToggle
      document.documentElement.className = this.isToggle
        ? 'overflow-y-hidden'
        : ''
    },
    removeSidebar(event) {
      this.isToggle = false
      document.documentElement.className = ''
    }
  },
  beforeDestroy() {
    this.isToggle = false
  }
}
</script>

<style lang="sass" scoped>
.layout-wordstadium /deep/ .main-wrapper
  flex-wrap: wrap
  .main-content
    margin-bottom: 15px
</style>
