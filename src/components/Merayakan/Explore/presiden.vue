<template>
  <div class="merayakan-presiden">
    <ul class="breadcrumbs">
      <li><logo-pantau/></li>
      <li>
        <router-link
          :to="{ name: 'MerayakanExplore', params: { type: 'presiden' }, query: { d: 'nasional' } }"
        >Nasional</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'MerayakanExplore', params: { type: 'presiden' }, query: { d: 'kabupaten' } }"
        >Kabupaten/Kota</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'MerayakanExplore', params: { type: 'presiden' }, query: { d: 'kecamatan' } }"
        >Kecamatan</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'MerayakanExplore', params: { type: 'presiden' }, query: { d: 'desa' } }"
        >Desa/Kelurahan</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'MerayakanExplore', params: { type: 'presiden' }, query: { d: 'pengguna' } }"
        >Pengguna</router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'MerayakanExplore', params: { type: 'presiden' }, query: { d: 'anik-kemala' } }"
        >Anik Kemala</router-link>
      </li>

    </ul>

    <div class="merayakan-content col-lg-10 offset-lg-1">
      <PresidenCard v-if="this.query !== 'pengguna'"/>
      <DefaultCard v-if="this.query !== 'pengguna'"/>
      <PenggunaCard v-if="this.query !== 'pengguna'"/>
      <DetailCard v-if="this.query !== 'pengguna'"/>
    </div>
  </div>
</template>

<script>
import { LogoPantau } from '@/svg/icons'
import PresidenCard from '@/components/Merayakan/Explore/presiden-card'
import DefaultCard from '@/components/Merayakan/Explore/default-card'
import PenggunaCard from '@/components/Merayakan/Explore/pengguna-card'
import DetailCard from '@/components/Merayakan/Explore/detail-card'
export default {
  name: 'ExplorePresiden',
  props: {
    query: {
      type: String
    }
  },
  components: {
    LogoPantau,
    PresidenCard,
    DefaultCard,
    PenggunaCard,
    DetailCard,
  },
}
</script>

<style lang="sass" scoped>
.breadcrumbs
  display: flex
  align-items: center
  flex-wrap: wrap
  margin: 10px 0
  font-family: 'Bw Modelica'
  li
    display: flex
    align-items: center
    &:before
      content: ""
      background-color: #7c7c7c
      -webkit-mask: url('~@/assets/icon-chevron-right.svg')
      -webkit-mask-position: center
      -webkit-mask-repeat: no-repeat
      -webkit-mask-size: 25px
      height: 25px
      width: 25px
    &:first-child:before
      display: none
  a
    color: #7c7c7c
  svg
    width: 24px
    height: 15px
</style>
