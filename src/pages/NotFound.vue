<template>
  <timeline-layout>
    <div id="not-found" slot="main-content">
      <h1>404</h1>
    </div>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/timeline.vue'

export default {
  components: { TimelineLayout }
}
</script>

<style lang="sass" scoped>
  #not-found
    display: flex
    align-items: center
    justify-content: center
    height: 85vh
    background: white
    border: 1px solid #ececec
    border-radius: 3px
</style>
