<template>
  <timeline-layout>
    <div class="ProfileCluster" slot="main-content">
      <div class="thumb" v-if="data.image.thumbnail_square.url">
        <img :src="data.image.thumbnail_square.url" alt>
      </div>
      <div class="title">{{data.name}}</div>
      <div class="category">{{data.category}} Cluster Pendidikan</div>
      <div class="anggota">{{data.members_count}} Anggota</div>
      <div class="desc">{{data.description}}</div>
    </div>
    <template slot="widget-wrapper">
      <div class="d-none d-lg-block">&nbsp;</div>
    </template>
  </timeline-layout>
</template>

<script>
import { mapState } from 'vuex'
import TimelineLayout from '@/layout/Timeline'
export default {
  name: 'ProfileCluster',
  components: {
    TimelineLayout
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      data: s => s.profile.clusterDetail
    })
  },
  mounted() {
    this.$store.dispatch('profile/getClusterDetail', {
      id: this.$route.query.id
    })
  },

  methods: {}
}
</script>

<style lang="sass" scoped>
.ProfileCluster
  background-color: #f4f4f4
  padding: 45px
  display: flex
  flex-direction: column
  text-align: center
  @media (max-width: 767px)
    padding: 45px 15px
  .thumb
    img
      width: 72px
  .title
    font-weight: bold
    font-size: 14px
    margin-top: 10px
    color: #000000
  .category
    color: #b5b5b5
    font-size: 14px
  .anggota
    padding: 15px 0
    font-size: 12px
    color: #000000
    border-top: 1px solid #ececec
    border-bottom: 1px solid #ececec
    margin: 20px 0
  .desc
    font-size: 12px
    color: #707070
    line-height: 20px
</style>
