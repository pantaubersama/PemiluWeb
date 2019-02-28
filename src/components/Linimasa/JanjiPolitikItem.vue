<template>
  <div>
    <div v-if="this.$route.name == 'Profile' || this.$route.name == 'ProfileUser'" class="top">
      <div class="avatar">
        <img :src="avatar" v-if="avatar && avatar.length > 0" class="rounded-circle">
        <img src="@/assets/user.svg" alt v-else>
      </div>
      <h5>
        {{ author_name }}
        <span>, {{ author_about }}</span>
      </h5>
      <span class="right">{{ created_at_in_word }}</span>
    </div>
    <div v-else class="top">
      <router-link v-if="user.id == userId" class="avatar-wrapper" :to="{path: '/profile'}">
        <div class="avatar">
          <img :src="avatar" v-if="avatar && avatar.length > 0" class="rounded-circle">
          <img src="@/assets/user.svg" alt v-else>
        </div>
        <h5>
          {{ author_name }}
          <span>, {{ author_about }}</span>
        </h5>
      </router-link>
      <router-link v-else class="avatar-wrapper" :to="{path: '/profile/user', query: {id: userId}}">
        <div class="avatar">
          <img :src="avatar" v-if="avatar && avatar.length > 0" class="rounded-circle">
          <img src="@/assets/user.svg" alt v-else>
        </div>
        <h5>
          {{ author_name }}
          <span>, {{ author_about }}</span>
        </h5>
      </router-link>
      <span class="right">{{ created_at_in_word }}</span>
    </div>
    <router-link :to="{name: 'LinimasaDetail', params: {id: id}}" class="link-content">
      <h4 class="title">{{ title }}</h4>
      <div class="main-content">
        <p v-html="description"></p>
        <div class="content-thumb" v-if="image != null">
          <img :src="image" alt="image">
        </div>
      </div>
    </router-link>

    <span class="icon-right">
      <a href="javascript:void(0)" @click.stop="$emit('onShare', id)">
        <img src="@/assets/icon_share.svg">
      </a>
      <a
        href
        class="icon-setting"
        :class="{'is-active': isActive == id}"
        @click.prevent="$emit('toggleDropdown', $event)"
      >
        <img src="@/assets/dots-icon.svg" alt>
      </a>
      <div class="dropdown-content">
        <ul>
          <li v-if="userAuth && isMine" @click.stop="$emit('onDelete', id)">
            <a href="javascript:void(0)">
              <close-icon/>Hapus
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click.stop="$emit('onCopy', id)">
              <link-icon/>Salin Tautan
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click.stop="$emit('onShare', id)">
              <share-icon/>Bagikan
            </a>
          </li>
          <!-- <li>
            <a href="javascript:void(0)" @click.stop="$emit('onReport', id)">
              <alert-icon/>Laporkan sebagai spam
            </a>
          </li>-->
        </ul>
      </div>
    </span>
  </div>
</template>

<script>
import { LinkIcon, AlertIcon, ShareIcon, CloseIcon } from '@/svg/icons'

export default {
  name: 'JanjiPolitikItem',

  components: {
    LinkIcon,
    AlertIcon,
    ShareIcon,
    CloseIcon
  },
  props: {
    id: String,
    avatar: String,
    author_name: String,
    author_about: String,
    created_at_in_word: String,
    title: String,
    userId: String,
    description: String,
    image: String,
    creator: Object,
    userAuth: Boolean,
    user: [Object, Array],
    isActive: [Boolean, String]
  },
  computed: {
    isMine() {
      if (
        !this.creator ||
        !this.user ||
        !this.creator.cluster ||
        !this.user.cluster
      ) {
        return false
      }

      return (
        this.creator.cluster.id === this.user.cluster.id &&
        this.creator.id === this.user.id &&
        this.user.cluster.is_eligible
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.link-content
  text-decoration: none
  color: #111111

  &:hover, &:focus, &:active
    text-decoration: none
    color: #111111

</style>
