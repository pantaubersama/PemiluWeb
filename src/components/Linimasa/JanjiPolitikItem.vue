<template>
  <div>
    <div class="top">
      <div class="avatar">
        <a href="javascript:void(0)">
          <img :src="avatar" v-if="avatar && avatar.length > 0" class="rounded-circle">
          <img src="@/assets/user.svg" alt v-else>
        </a>
      </div>
      <h5>
        {{ author_name }},
        <span>{{ author_about }}</span>
      </h5>
      <span class="right">{{ created_at_in_word }}</span>
    </div>
    <router-link :to="{name: 'LinimasaDetail', params: {id: id}}">
      <h4 class="title">{{ title }}</h4>
    </router-link>
    <div class="main-content">
      <p v-html="description"></p>
      <div class="content-thumb" v-if="image != null">
        <img :src="image" alt="image">
      </div>
    </div>
    <span class="icon-right">
      <a href="javascript:void(0)" @click.stop="$emit('onShare', id)">
        <img src="@/assets/icon_share.svg">
      </a>
      <a
        href
        class="icon-setting"
        :class="{'is-active': isActive === id}"
        @click.prevent="toggleDropdown(id, $event)"
      >
        <img src="@/assets/dots-icon.svg" alt>
      </a>
      <div class="dropdown-content">
        <ul>
          <!-- TODO: tampilkan button hapus jika user sdh login, dan ini adalah postingannya -->
          <!-- <li v-if="userAuth">
              <a href="javascript:void(0)">
                <close-icon/>Hapus
              </a>
          </li>-->
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
          <li>
            <a href="javascript:void(0)" @click.stop="$emit('onReport', id)">
              <alert-icon/>Laporkan
            </a>
          </li>
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
    description: String,
    image: String
  },
  data() {
    return {
      isActive: false
    }
  },
  created() {
    window.addEventListener('click', this.removeDropdown)
  },
  methods: {
    toggleDropdown(el, event) {
      var toggleClick =
        event.target.classList.contains('is-active') ||
        event.target.parentNode.classList.contains('is-active')
      this.isActive = el
      if (toggleClick) {
        this.isActive = 0
      }
    },
    removeDropdown(event) {
      var isClickOutside =
        !event.target.classList.contains('icon-setting') &&
        !event.target.parentNode.classList.contains('icon-setting')
      if (isClickOutside) {
        this.isActive = 0
      }
    }
  }
}
</script>
