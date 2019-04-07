<template>
  <div class="item">
    {{item.username}}
  </div>
</template>

<script>
export default {
  name: 'WordstadiumUserAutocomplete',
  props: ['item']
}
</script>

<style lang="scss" scoped>
.item:hover {
  background: #f0f0f0;
  border-radius: 2px;
}

.item {
  padding: 5px 5px;
  color: #333;
  cursor: pointer;
}
</style>
