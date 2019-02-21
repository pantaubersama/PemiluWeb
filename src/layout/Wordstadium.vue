<template>
  <div class="wrapper" :class="{'sidebar-open':isToggle}">
    <div class="menu-bg"></div>
    <Header @toggleSidebar="activeSidebar" @removeSidebar="removeSidebar"/>
    <div class="container main-wrapper">
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
import { SearchIcon, NotificationIcon, WordStadiumIcon } from '@/svg/icons'
import Header from '@/components/Header'

export default {
  name: 'LayoutWordstadium',
  components: {
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
