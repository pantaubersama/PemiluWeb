<template>
  <BadgeDetail />
</template>

<script>
  import TimelineLayout from '@/layout/Timeline'
  import BadgeDetail from '@/pages/Profile/BadgeDetail'

  export default {
    name: "ShareBadge",

    data(){
      return {
        showModal: false,
      }
    },

    components: {
      TimelineLayout,
      BadgeDetail
    }
  }
</script>

<style scoped>

</style>
