<template>
  <div class="pengguna-card" :class={disabled} @click.prevent="onClick()">
    <div class="card">
      <div class="title">
        <div class="profile">
          <div class="thumb">
            <img v-if="item.user.avatar.url == null" src="@/assets/user.svg" :alt="user.name">
            <img :src="item.user.avatar.thumbnail.url" :alt="user.name">
          </div>
          <div class="user-name">{{item.user.full_name}}</div>
          <div class="user-cluster">{{user.cluster}}</div>
        </div>
        <OutlineArrow v-if="!disabled"/>
      </div>
      <div class="content">
        <div class="content-desc">
          <div class="tps">Tps {{tpsNumber}}</div>
          <div class="tps-location">{{tpsLocation}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OutlineArrow } from '@/svg/icons'
export default {
  name: 'CardPengguna',
  props: ['item', 'tps-number', 'tps-location', 'disabled'],
  components: { OutlineArrow },
  data() {
    return {
      id: 1,
      user: {
        name: 'Anik Kemala',
        profile: 'https://placeimg.com/240/240/tech/1',
        cluster: 'Cluster Partai Kuning Ceria'
      },
      tps: {
        nomor: '02',
        lokasi: 'Yogyakarta, Sleman, Depok, Condongcatur'
      }
    }
  },
  methods: {
    onClick() {
      if (this.disabled) return
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
.pengguna-card.disabled
  .card
    cursor: initial
.pengguna-card
  .card
    cursor: pointer
  .title
    display: flex
    align-items: center
    padding: 6px 10px
    justify-content: space-between
    svg
      fill: #08bda8
      width: 24px
      height: 24px
  .profile
    font-size: 10px
    text-transform: none
    align-items: center
    display: flex
    align-items: center
    flex: 1
    .thumb
      width: 18px
      height: 18px
      border-radius: 50%
      overflow: hidden
      margin-right: 10px
      img
        width: 100%
        height: 100%
        object-fit: cover
    .user-name
      color: #212121
      margin-right: 5px
    .user-cluster
      color: #7c7c7c
      font-weight: normal

  .content
    padding: 10px 16px
    &-desc
      border-left: 3px solid #f2771d
      padding: 8px
      font-weight: bold
      line-height: 1
      .tps
        text-transform: uppercase
        color: #bd081c
        margin-bottom: 3px
        &-location
          font-size: 12px
          font-family: 'Bw Modelica'

</style>
