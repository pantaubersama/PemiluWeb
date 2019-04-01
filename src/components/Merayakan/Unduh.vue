<template>
  <div class="card merayakan widget-blog">
    <div class="unduh-wrapper">
      <UnduhIllustration />
      <p>Unduh Data</p>
    </div>
  </div>
</template>

<script>
import { UnduhIllustration } from '@/svg/illustrations'
  export default {
    name: 'Unduh',
    components: {
      UnduhIllustration
    }
  }
</script>

<style lang="sass" scoped>
.unduh-wrapper
  display: flex
  align-items: center
  justify-content: center
  padding: 23px 20px 20px
  svg
    max-width: 70px
    margin-right: 10px
  p
    margin-bottom: 11px
    font-weight: bold
    color: #4f4f4f
</style>
