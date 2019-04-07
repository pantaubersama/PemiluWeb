<template>
  <div class="pengguna-card">
    <div v-for="data in payloads" :key="data.id">
      <div class="card">
        <div class="title">
          <div class="profile">
            <div class="thumb">
              <img :src="data.user.profile" :alt="data.user.name">
            </div>
            <div class="user-name">{{data.user.name}}</div>
            <div class="user-cluster">{{data.user.cluster}}</div>
          </div>
          <OutlineArrow/>
        </div>
        <div class="content">
          <div class="content-desc">
            <div class="tps">Tps {{data.tps.nomor}}</div>
            <div class="tps-location">{{data.tps.lokasi}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OutlineArrow } from '@/svg/icons'
export default {
  name: 'Pengguna',
  components: {
    OutlineArrow
  },
  data() {
    return {
      payloads: [
        {
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
        },
        {
          id: 2,
          user: {
            name: 'Kemala Anik',
            profile: 'https://placeimg.com/240/240/tech/2',
            cluster: 'Cluster Partai Kuning Ceria'
          },
          tps: {
            nomor: '03',
            lokasi: 'Yogyakarta, Sleman, Depok, Condongcatur'
          }
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
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
