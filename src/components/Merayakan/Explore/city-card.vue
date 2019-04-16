<template>
  <div class="city-card">
    <div class="card">
      <div class="title">
        {{kota}}
        <OutlineArrow/>
      </div>
      <div class="content-vote">
        <div class="content">
          <div class="total-vote">
            <span>Rerata Total Suara Masuk</span>
            {{suara_sah}}
          </div>
          <div class="fault-vote">
            <span>Rerata Suara Tidak Sah</span>
            {{suara_tidak_sah}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OutlineArrow } from '@/svg/icons'
export default {
  name: 'CityCard',
  props: ['item'],
  components: {
    OutlineArrow
  },
  computed: {
    kota() {
      if (this.item == null) return ''
      return this.item.name
    },
    suara_sah() {
      if (this.item == null) return '-'
      return this.item.validVote
    },
    suara_tidak_sah() {
      if (this.item == null) return '-'
      return this.item.invalidVote
    }
  }
}
</script>

<style lang="sass" scoped>
.city-card
  .card
    cursor: pointer
    margin-bottom: 10px
  .title
    font-size: 14px
    text-transform: none
    color: #08bda8
    display: flex
    align-items: center
    padding: 6px 10px 0
    justify-content: space-between
    border-bottom: none
    svg
      fill: #08bda8
      width: 24px
      height: 24px
  .content-vote
    display: flex
    .content
      padding: 0 10px 10px
      font-size: 11px
      color: #111111
      font-weight: bold
      width: 100%
      > div
        height: 18px
        display: flex
        align-items: center

      span
        color: #4f4f4f
        width: 130px
        display: flex
        align-items: center
        justify-content: space-between
        margin-right: 10px
        font-weight: normal
        &:after
          content: ":"
          display: inline-flex
          align-items: center
</style>
