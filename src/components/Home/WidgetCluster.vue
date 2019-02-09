<template>
  <div class="card card-cluster">
    <h4 class="title">Cluster</h4>
    <div class="card-content widget-cluster">
      <div class="oneline">
        <img class="cluster-image" :src="cluster.image.url">
        <div class="cluster-name">{{cluster.name}}</div>
      </div>
      <small class="cluster-user-count">{{cluster.members_count}} Anggota</small>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'WidgetCluster',
  computed: {
    ...mapState({
      cluster: s => s.profile.user.cluster || { image: {} }
    })
  }
}
</script>

<style lang="sass" scoped>
.widget-cluster
  display: flex
  flex-direction: column
  justify-content: center
  align-items: flex-start
  .oneline
    display: flex
    flex: 1
    flex-basis: 40px
    justify-content: center
    align-items: center
    img.cluster-image
      flex: 0
      flex-basis: 35px
      overflow: hidden
      width: 35px
      height: 35px
      border-radius: 50%
      object-fit: cover
    .cluster-name
      margin-left: 10px
  .cluster-user-count
    color: #b5b5b5
    font-size: 13px


</style>
