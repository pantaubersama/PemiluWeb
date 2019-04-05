<template>
  <div class="card-default">
    <div v-for="data in payloads" :key="data.id">
      <div class="card">
        <div class="title">
          {{data.kota}}
          <OutlineArrow />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OutlineArrow } from '@/svg/icons'
  export default {
    name: 'CardDefault',
    components: {
      OutlineArrow
    },
    data() {
      return {
        payloads: [
          {
            id: 1,
            kota: 'Aceh',
          },
          {
            id: 2,
            kota: 'Sumatra Utara',
          }
        ]
      }
    },
  }
</script>

<style lang="sass" scoped>
.card-default
  .card
    cursor: pointer
    margin-bottom: 10px
  .title
    font-size: 14px
    text-transform: none
    color: #08bda8
    display: flex
    align-items: center
    padding: 6px 10px
    justify-content: space-between
    border-bottom: none
    svg
      fill: #08bda8
      width: 24px
      height: 24px
</style>
