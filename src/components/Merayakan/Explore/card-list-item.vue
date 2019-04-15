<template>
  <div class="card-list-item">
    <div class="card" @click.prevent="$emit('click')">
      <div class="title">
        {{text}}
        <outline-arrow></outline-arrow>
      </div>
    </div>
  </div>
</template>

<script>
import { OutlineArrow } from '@/svg/icons'
export default {
  name: 'CardListItem',
  props: ['text'],
  components: { OutlineArrow }
}
</script>

<style lang="sass" scoped>
.card-list-item
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
