<template>
  <ul class="card search-type-people" >
    <li>
      <div v-for="item in clusters" :key="item.id" class="user-item">
        <router-link :to="{ path: '/profile/cluster', query: { id: item.id }}">
          <img :src="item.image.url" :alt="item.username" class="avatar">
          <div class="detail">
            <div class="fullname">{{item.name}}</div>
            <div class="category">{{item.category.name}}</div>
          </div>
          <hr class="separator">
        </router-link>
      </div>
    </li>
    <LottieEmpty v-if="showLottie" :message="'Pencarian tidak ditemukan'"/>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LottieEmpty from '@/components/LottieEmpty'
export default {
  name: 'SearchCluster',
  props: { query: String, filter: String },
  components: { LottieEmpty },
  watch: {
    filter(value) {
      this.search({ q: this.query, filter_value: this.filter })
    },
    query: {
      immediate: true,
      handler(query = '') {
        if (query == null) return
        this.search({ q: query, filter_value: this.filter })
      }
    }
  },
  computed: {
    ...mapState({
      clusters: s => s.search.clusters,
      showLottie: s => s.showLottie.showLottie
    })
  },
  methods: {
    ...mapActions({
      search: 'search/cluster'
    })
  }
}
</script>

<style lang="sass" scoped>

.user-item
  a
    display: flex
    flex-direction: row
    justify-content: left
    align-items: center
    padding: 10px 20px
    position: relative
    border-bottom: 1px solid #ececec
  &:last-child
    a
      border-bottom: initial

img.avatar
  flex: 0
  flex-shrink: 0
  flex-basis: 40px
  width: 40px
  height: 40px
  overflow: hidden
  border-radius: 50%
  object-fit: cover

.detail
  margin-left: 10px

.fullname
  font-size: 14px
  line-height: 1.21
  color: #000000

.category
  font-size: 14px
  line-height: 1.21
  color: #b5b5b5
  margin-top: 5px
</style>
