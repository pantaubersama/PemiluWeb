<template>
  <div class="header position-fixed">
    <div class="container d-flex">
      <router-link exact class="logo" to="/">
        <div class="d-block d-sm-none">
          <logo-pantau/>
        </div>
        <div class="d-none d-sm-block">
          <logo-product></logo-product>
        </div>
      </router-link>

      <div class="ml-auto navbar-right align-item-center d-flex">
        <div class="d-none d-lg-flex">
          <div class="input-search">
            <input
              type="text"
              class="form-control"
              placeholder="CARI"
              :value="searchValue"
              @keypress="search($event)"
            >
            <search-icon></search-icon>
          </div>
        </div>
        <!-- <a href="#" class="word-stadium">
          <word-stadium-icon></word-stadium-icon>
        </a>-->
        <div class="dropdown-note-container" v-if="isLoggedIn">
          <button
            class="note"
            :class="{'is-active': isDropdownNoteActive}"
            @click.stop="toggleDropdownNote()"
          >
            <i class="icon icon-pins"></i>
          </button>
          <div class="dropdown-content">
            <header-note></header-note>
          </div>
        </div>

        <div class="notification" v-if="isLoggedIn">
          <button
            class="note"
            :class="{'is-active': isDropdownNotifActive}"
            @click.stop="toggleDropdownNotif()"
          >
            <i class="icon icon-pins"></i>
          </button>
          <div class="dropdown-content">
            <header-notif/>
          </div>
        </div>

        <div class="profile-menu" v-if="userLogin">
          <div
            id="toggle-button"
            class="user-thumb"
            :class="{'is-active': isActive}"
            @click.stop="toggleDropdown($event)"
          >
            <img v-if="avatarURL != null" :src="avatarURL">
            <user-icon v-else></user-icon>
          </div>
          <div class="dropdown-content">
            <ul>
              <li>
                <router-link to="/profile">Profile</router-link>
              </li>
              <!-- <li>
                <router-link to="/profile/data-lapor">Data Profile Lapor</router-link>
              </li> -->
              <li>
                <router-link to="/profile/badge">Badge</router-link>
              </li>
              <li>
                <router-link to="/profile/setting">Setting</router-link>
              </li>
            </ul>
            <!-- hanya muncul ketika jadi admin cluster -->
            <!-- <ul>
              <li>
                <router-link to="/">Atur Cluster</router-link>
              </li>
              <li>
                <router-link to="/">Ubah Data Lapor</router-link>
              </li>
            </ul>-->
            <a href="#" class="button-logout" @click.prevent="logout">Keluar</a>
          </div>
        </div>
        <router-link v-else to="/login" class="login">LOGIN</router-link>
        <button
          type="button"
          class="navbar-toggle burger d-block d-lg-none"
          @click.prevent="toggleSidebar"
        >
          <div class="burger-wrapper">
            <div class="x"></div>
            <div class="y"></div>
            <div class="z"></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash.debounce'
import { authLink } from '@/mixins/link'
import { LogoProduct } from '@/svg/products'
import {
  UserIcon,
  SearchIcon,
  NotificationIcon,
  WordStadiumIcon,
  LogoPantau
} from '@/svg/icons'
import HeaderNote from '@/components/HeaderNote'
import HeaderNotif from '@/components/HeaderNotif'

export default {
  name: 'Header',
  components: {
    LogoProduct,
    UserIcon,
    SearchIcon,
    NotificationIcon,
    WordStadiumIcon,
    LogoPantau,
    HeaderNote,
    HeaderNotif
  },
  mixins: [authLink],
  data() {
    return {
      isActive: false,
      isDropdownNoteActive: false,
      isDropdownNotifActive: false,
      query: this.$route.query.q || ''
    }
  },
  created() {
    if (this.isProtected()) {
      this.$store.commit('meLogout/userLogin')
    }
    window.addEventListener('click', this.removeDropdown)
    window.addEventListener('click', this.removeDropdownNote)
    window.addEventListener('click', this.removeDropdownNotif)
    window.addEventListener('click', this.removeSidebar)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.removeDropdown)
    window.removeEventListener('click', this.removeDropdownNote)
    window.removeEventListener('click', this.removeDropdownNotif)
    window.removeEventListener('click', this.removeSidebar)
  },
  computed: {
    ...mapState('meLogout', ['userLogin']),
    ...mapState({
      avatarURL: s => s.profile.user.avatar.medium.url,
      isLoggedIn: s => s.profile.token != null
    }),
    searchValue() {
      return this.$route.query.q || this.query
    }
  },
  methods: {
    search: debounce(function search(event) {
      const query = event.target.value
      if (this.$route.name !== 'search') {
        this.$router.push({ path: '/search/people', query: { q: query } })
      } else {
        this.$router.push({ path: this.$route.path, query: { q: query } })
      }
    }, 300),
    logout() {
      this.$store.dispatch('meLogout/logout')
    },
    toggleDropdownNote() {
      this.isDropdownNoteActive = !this.isDropdownNoteActive
      this.isActive = false
      this.isDropdownNotifActive = false
      this.$emit('removeSidebar')
    },
    toggleDropdownNotif() {
      this.isDropdownNotifActive = !this.isDropdownNotifActive
      this.isActive = false
      this.isDropdownNoteActive = false
      this.$emit('removeSidebar')
    },
    removeDropdownNote(event) {
      if (!event.target.parentNode.parentNode.classList.contains('icon-pins')) {
        this.isDropdownNoteActive = false
      }
    },
    removeDropdownNotif(event) {
      if (!event.target.parentNode.parentNode.classList.contains('image-notif')) {
        this.isDropdownNotifActive = false
      }
    },
    toggleDropdown(event) {
      this.isActive = !this.isActive
      this.isDropdownNoteActive = false
      this.isDropdownNotifActive = false
      this.$emit('removeSidebar')
    },
    removeDropdown(event) {
      if (
        this.userLogin &&
        !event.target.parentNode.parentNode.classList.contains('user-thumb')
      ) {
        this.isActive = false
      }
    },
    toggleSidebar(event) {
      this.$emit('toggleSidebar')
    },
    removeSidebar(event) {
      if (
        !event.target.classList.contains('burger-wrapper', 'z', 'y', 'x') &&
        !event.target.classList.contains('navbar-toggle') &&
        (!event.target.classList.contains('burger-wrapper') &&
          !event.target.parentNode.classList.contains('burger-wrapper'))
      ) {
        this.$emit('removeSidebar')
      }
    }
  }
}
</script>
