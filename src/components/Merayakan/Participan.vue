<template>
  <div class="card merayakan widget-blog">
    <div class="count-wrapper">
      <div class="total-count">{{total}}</div>
      <p>User telah berpartisipasi dalam Gotong - Royong perhitungan Pantau Bersama</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'Participan',
    computed: {
    ...mapState({
      total: s => s.hitungSummary.total,
    })
  },
  }
</script>

<style lang="sass" scoped>
.count-wrapper
  padding: 15px 15px 20px
  text-align: center
  @media (max-width: 991px)
    margin-top: 10px
  .total-count
    color: #08bda8
    font-size: 24px
    font-weight: bold
    margin-bottom: 5px
  p
    color: #7c7c7c
    font-size: 10px
    font-weight: 500
    line-height: 1.4
    margin: 0
</style>
