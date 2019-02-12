<template>
<li>
  {{item.name}}
</li>
</template>

<script>
export default {
  name: 'ClusterCategoriesItem',
  props: ['item']
}
</script>

<style lang="sass" scoped>
li
  padding: 10px 15px
  cursor: pointer
</style>
