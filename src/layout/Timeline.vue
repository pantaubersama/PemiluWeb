<template>
  <div class="wrapper" :class="{'sidebar-open':isToggle}">
    <div class="menu-bg"></div>
    <Header @toggleSidebar="activeSidebar" @removeSidebar="removeSidebar"/>
    <div class="container main-wrapper">
      <div class="col-lg-3 sidebar">
        <slot name="sidebar">
          <!-- <div class="d-block d-lg-none">
            <div class="mobile-icons">
              <div class="input-search">
                <input type="text" class="form-control" placeholder="CARI">
                <search-icon></search-icon>
              </div>
            </div>
          </div> -->
          <nav-sidebar-top></nav-sidebar-top>
          <nav-sidebar-bottom></nav-sidebar-bottom>
        </slot>
      </div>
      <div class="col-lg-6 offset-lg-3 main-content">
        <slot name="main-content">Main Content</slot>
      </div>
      <div class="col-lg-3 widget-wrapper">
        <slot name="widget-wrapper">Widget wrapper</slot>
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
  name: 'Layout--Timeline',
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
