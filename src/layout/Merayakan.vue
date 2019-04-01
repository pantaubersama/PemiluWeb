<template>
  <div class="wrapper" :class="{'sidebar-open':isToggle}">
    <div class="menu-bg"></div>
    <Header @toggleSidebar="activeSidebar" @removeSidebar="removeSidebar"/>
    <div class="container main-wrapper">
      <div class="col-lg-3 sidebar">
        <slot name="sidebar">
          <nav-sidebar-top></nav-sidebar-top>
          <nav-sidebar-bottom></nav-sidebar-bottom>
        </slot>
      </div>
      <div class="col-lg-9 offset-lg-3 main-content">
        <slot name="main-content">Main Content</slot>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
import { SearchIcon, NotificationIcon, WordStadiumIcon } from '@/svg/icons'
export default {
  name: 'Layout--Merayakan',
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
