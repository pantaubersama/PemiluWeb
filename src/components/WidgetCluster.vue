<template>
  <div class="card card-cluster">
    <h4 class="title">Cluster</h4>
    <div class="card-content">
      <ul>
        <li class="wrap-cluster" v-for="cluster in feedsCluster" :key="cluster.id">
          <span class="wrap">
            <div class="thumb">
              <img v-if="cluster.image.thumbnail.url != null" :src="cluster.image.thumbnail.url">
              <img v-else src="@/assets/icon_book.svg">
            </div>
            <h5>{{cluster.name}}</h5>
          </span>
          <p v-if="cluster.members_count != null">{{cluster.members_count}} Anggota</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'WidgetCluster',
  computed: {
    ...mapState('homeCluster', ['feedsCluster'])
  },
  created() {
    this.$store.dispatch('homeCluster/homeCluster')
  }
}
</script>
