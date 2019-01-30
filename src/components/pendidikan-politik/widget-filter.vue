<template>
<div class="card widget-filter">
  <button class="filter">
    Filter
    <i class="icon icon-filter"></i>
  </button>
</div>
</template>

<style lang="sass" scoped>
.widget-filter
  padding: 10px
  display: flex
  // justify-content: flex-end
  align-items: flex-end

  button.filter
    border: 0
    background: none
    text-align: right
    cursor: pointer
    display: flex
    text-transform: uppercase
    font-size: 14px

  .icon.icon-filter
    width: 18px
    height: 18px
    display: inline-block
    background-image: url('~@/assets/icon-filter.svg')
    background-repeat: no-repeat
    background-position: center
    background-size: contain
    margin-left: 10px
</style>
