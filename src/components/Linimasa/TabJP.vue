<template>
  <div class="card-jp">
    <modal-create
      v-if="modal === 'modalCreate' || this.$route.query.post == 'create-post'"
      v-on:close="closeModal()"
    />
    <!--  TODO: Jika user sudah login tampilkan div create-post -->
    <!-- <div class="create-post" @click.stop="modalCreate()">
      <div class="card-content">
        <div class="top">
          <div class="avatar">
            <a href="javascript:void(0)">
              <img src="@/assets/user.svg">
            </a>
          </div>
          <h5>Anik Kemala</h5>
        </div>
        <h4 class="title">Publikasi kembali Janji Politik?</h4>
      </div>
    </div>-->
    <div class="card-content" v-for="item in data" :key="item.id">
      <div class="top">
        <div class="avatar">
          <a href="javascript:void(0)">
            <img
              :src="item.creator.avatar.thumbnail_square.url"
              v-if="item.creator.avatar.thumbnail_square.url"
              class="rounded-circle"
            >
            <img src="@/assets/user.svg" alt v-else>
          </a>
        </div>
        <h5>
          {{ item.creator.full_name }},
          <span>{{ item.creator.about }}</span>
        </h5>
        <span class="right">{{ item.created_at_in_word.id }}</span>
      </div>
      <router-link :to="{name: 'LinimasaDetail', params: {id: item.id}}">
        <h4 class="title">{{ item.title }}</h4>
      </router-link>
      <p v-html="trimCharacters(item.body)"></p>
      <span class="icon-right">
        <a href="javascript:void(0)">
          <img src="@/assets/icon_share.svg">
        </a>
        <a
          href
          class="icon-setting"
          :class="{'is-active': isActive === item.id}"
          @click.prevent="toggleDropdown(item.id, $event)"
        >
          <img src="@/assets/dots-icon.svg" alt>
        </a>
        <div class="dropdown-content">
          <ul>
            <li>
              <a href="javascript:void(0)">
                <close-icon/>Hapus
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <link-icon/>Salin Tautan
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <share-icon/>Bagikan
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <alert-icon/>Laporkan
              </a>
            </li>
          </ul>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { LinkIcon, AlertIcon, ShareIcon, CloseIcon } from '@/svg/icons'
import ModalCreate from '@/components/Linimasa/ModalCreate'

export default {
  name: 'TabJP',
  components: {
    ModalCreate,
    LinkIcon,
    AlertIcon,
    ShareIcon,
    CloseIcon
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isActive: false,
      modal: false
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
    },
    modalCreate() {
      this.$router.replace({
        query: { type: 'janji-politik', post: 'create-post' }
      })
      this.modal = 'modalCreate'
    },
    closeModal() {
      this.$router.replace({ query: { type: 'janji-politik' } })
      this.modal = false
    },
    trimCharacters(text, maxLength = 355) {
      if (!text) return text
      const dots = text.length > maxLength
      const string = text.substr(0, maxLength)
      const result = string.substr(
        0,
        Math.min(string.length, string.lastIndexOf(' '))
      )
      return dots ? `${result}...` : result
    }
  }
}
</script>
