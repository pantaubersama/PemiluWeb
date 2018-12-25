<template>
  <div class="home-wrapper">
    <div class="container d-flex main-wrapper">
      <div class="col-md-3 sidebar">
        <slot name="sidebar">Sidebar</slot>
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
export default {
  name: 'Layout--Timeline'
}
</script>
