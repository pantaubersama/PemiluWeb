<template>
  <div class="card c-1">
    <div class="title">Lampiran Model C1-PPWP (Presiden)</div>
    <div class="content">
      <div class="thumb">
        <img src="https://placeimg.com/240/240/tech/1" alt="">
      </div>
      <span>Model c1.jpeg</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CardC1'
  }
</script>

<style lang="sass" scoped>
.card.c-1
  .title
    font-size: 14px
    text-transform: none
    padding: 10px 16px
  .content
    display: flex
    align-items: center
    padding: 10px 16px
    .thumb
      width: 50px
      height: 50px
      overflow: hidden
      margin-right: 20px
      img
        width: 100%
        height: 100%
        object-fit: cover
        object-position: center center
    span
      font-size: 12px
      color: #707070
</style>
