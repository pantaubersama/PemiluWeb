<template>
  <div v-if="data">
    <div class="notif-wrapper" v-for="notif in data" :key="notif.id">
      <div class="notif-list" v-if="notif.data.notification">
        <!-- <div class="notif-thumb" v-if="notif.data.notif_type == 'broadcasts'"> -->
        <div class="notif-thumb">
          <IconNotif/>
        </div>
        <div class="notif-desc">
          <p class="desc-title">{{notif.data.notification.title}}</p>
          <p class="desc-body">{{notif.data.notification.body}}</p>
          <p class="desc-time">{{notif.created_at_in_word.id}}</p>
        </div>
      </div>
      <div class="notif-list" v-if="notif.data.payload">
        <!-- <div class="notif-thumb" v-if="notif.data.payload.notif_type == 'broadcasts'"> -->
        <div class="notif-thumb">
          <IconNotif/>
        </div>
        <div class="notif-desc">
          <p class="desc-title">{{notif.data.payload.notification.title}}</p>
          <p class="desc-body">{{notif.data.payload.notification.body}}</p>
          <p class="desc-time">{{notif.created_at_in_word.id}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IconNotif } from '@/svg/icons'
export default {
  name: 'NotifList',
  props: {
    data: Array
  },
  components: {
    IconNotif
  }
}
</script>

<style lang="sass" scoped>
.notif-list
  padding: 15px 20px
  display: flex
  align-items: center

  @media (max-width: 767px)
    padding: 10px 15px
  svg
    width: 36px
    margin-right: 20px
  p
    margin-bottom: 0
    font-size: 12px
  .desc
    &-title
      font-weight: bold
    &-time
      color: #111111
      font-size: 10px
      font-weight: bold
.notif-wrapper
  border-bottom: 1px solid #ececec
  &:last-child
    border-bottom: none
</style>


