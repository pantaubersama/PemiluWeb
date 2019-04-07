<template>
  <div class="merayakan-explore">
    <ExploreIllustration />
    <div class="explore-desc">
      <div class="text">
        <b>Explore Data</b>
        Explore Data lebih lengkap, hingga perhitungan legislatif
      </div>
      <OutlineArrow />
    </div>
  </div>
</template>

<script>
import { ExploreIllustration } from '@/svg/illustrations'
import { OutlineArrow } from '@/svg/icons'
  export default {
    name: 'ExploreWidget',
    components: {
      ExploreIllustration,
      OutlineArrow
    }
  }
</script>

<style lang="sass" scoped>
.merayakan-explore
  padding: 25px 20px
  background-color: #fff
  border-radius: 0.25rem
  display: flex
  align-items: center
  @media (max-width: 1199px)
    padding: 14px 20px
  @media (max-width: 575px)
    padding: 14px 15px
  > svg
    width: 110px
    margin-right: 15px
  .explore-desc
    display: flex
    align-items: center
    .text
      color: #111111
      padding-right: 40px
      @media (max-width: 1199px)
        font-size: 12px
      b
        display: block
    svg
      width: 20px
      flex: 0 0 20px
      fill: #bd081c
</style>

