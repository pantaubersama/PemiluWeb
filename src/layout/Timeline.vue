<template>
  <div class="home-wrapper">
    <div class="container d-flex main-wrapper">
      <div class="col-md-3 sidebar">
        <slot name="sidebar">
          <nav-sidebar-top></nav-sidebar-top>
          <nav-sidebar-bottom></nav-sidebar-bottom>
        </slot>
      </div>
      <div class="col-md-6 offset-md-3 main-content">
        <slot name="main-content">Main Content</slot>
      </div>
      <div class="col-md-3 widget-wrapper">
        <slot name="widget-wrapper">Widget wrapper</slot>
      </div>
    </div>
  </div>
</template>

<script>
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'

export default {
  name: 'Layout--Timeline',
  components: {
    NavSidebarTop,
    NavSidebarBottom
  }
}
</script>
