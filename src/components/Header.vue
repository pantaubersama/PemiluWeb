<template>
  <div class="header position-fixed">
    <div class="container d-flex">
      <router-link exact class="logo" to="/">
        <logo-product></logo-product>
      </router-link>
      <div class="ml-auto navbar-right d-flex align-item-center">
        <div class="input-search">
          <input type="text" class="form-control" placeholder="CARI">
          <search-icon></search-icon>
        </div>
        <a href class="word-stadium">
          <word-stadium-icon></word-stadium-icon>
        </a>
        <a href class="notification">
          <notification-icon></notification-icon>
        </a>
        <div class="profile-menu" v-if="userLogin">
          <div
            id="toggle-button"
            class="user-thumb"
            :class="{'is-active': isActive}"
            @click="toggleDropdown($event)"
          >
            <user-icon></user-icon>
          </div>
          <div class="dropdown-content">
            <ul>
              <li>
                <router-link to="/profile">Edit Profile</router-link>
              </li>
              <li>
                <router-link to="/profile/data-lapor">Data Profile Lapor</router-link>
              </li>
              <li>
                <router-link to="/profile/badge">Badge</router-link>
              </li>
              <li>
                <router-link to="/profile/setting">Setting</router-link>
              </li>
            </ul>
            <a href class="button-logout" @click.prevent="logout">Keluar</a>
          </div>
        </div>
        <router-link v-else to="/login" class="login">LOGIN</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { authLink } from '@/mixins/link'

import { LogoProduct } from '@/svg/products'
import {
  UserIcon,
  SearchIcon,
  NotificationIcon,
  WordStadiumIcon
} from '@/svg/icons'

export default {
  name: 'Header',
  components: {
    LogoProduct,
    UserIcon,
    SearchIcon,
    NotificationIcon,
    WordStadiumIcon
  },
  mixins: [authLink],
  data() {
    return {
      isActive: false
    }
  },
  created() {
    if (this.isProtected()) {
      this.$store.commit('meLogout/userLogin')
    }
    window.addEventListener('click', this.removeDropdown)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.removeDropdown)
  },
  computed: {
    ...mapState('meLogout', ['userLogin'])
  },
  methods: {
    logout() {
      this.$store.dispatch('meLogout/logout')
    },
    toggleDropdown(event) {
      this.isActive = !this.isActive
    },
    removeDropdown(event) {
      if (
        this.userLogin &&
        !event.target.parentNode.parentNode.classList.contains('user-thumb')
      ) {
        this.isActive = false
      }
    }
  }
}
</script>
