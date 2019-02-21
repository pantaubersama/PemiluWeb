<template>
  <ul class="card search-type-people" >
    <li v-if="users != ''">
      <div v-for="user in users" :key="user.id" class="user-item">
        <img :src="user.avatar.url" :alt="user.username" class="avatar" v-if="user.avatar.url">
        <img src="@/assets/user.svg" class="avatar" alt="thumbnail" v-else>
        <div class="detail">
          <div class="fullname">{{user.full_name}}</div>
          <div class="username">@{{user.username}}</div>
        </div>
        <hr class="separator">
      </div>
    </li>
    <LottieEmpty v-if="showLottie"/>
  </ul>
</template>

<script>
import LottieEmpty from '@/components/LottieEmpty'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SearchPeople',
  props: { query: String, filter: String },
  components: { LottieEmpty },
  watch: {
    filter(value) {
      this.search({ q: this.query, filter_by: this.filter })
    },
    query: {
      immediate: true,
      handler(query = '') {
        if (query == null) return
        this.search({ q: query, filter_by: this.filter })
      }
    }
  },
  computed: {
    ...mapState({
      users: s => s.search.people,
      showLottie: s => s.showLottie.showLottie
    })
  },
  methods: {
    ...mapActions({
      search: 'search/people'
    })
  }
}
</script>

<style lang="sass" scoped>
ul.card
  padding: 10px 20px
.user-item
  display: flex
  flex-direction: row
  justify-content: left
  align-items: center
  padding: 10px 20px
  position: relative
  border-bottom: 1px solid #ececec
  &:last-child
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
  font-weight: bold
  font-size: 14px
  line-height: 1.14
  color: #000
.username
  color: #757575
  font-size: 11px
  line-height: 1.36
</style>
