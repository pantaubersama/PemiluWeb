<template>
  <div class="header position-fixed">
    <div class="container d-flex">
    <router-link exact class="logo" to="/">
      <img src="@/assets/logo.svg" alt="Pantau Bersama">
    </router-link>
    <div class="ml-auto navbar-right d-flex align-item-center">
      <div class="input-search">
        <input type="text" class="form-control" placeholder="CARI">
        <svg version="1.1" viewBox="0 0 19.1 19.6" style="enable-background:new 0 0 19.1 19.6;" xml:space="preserve">
        <path id="Path_119" class="st0" d="M13.3,12.1h-0.8l-0.3-0.3c2.4-2.8,2.1-7-0.7-9.4s-7-2.1-9.4,0.7s-2.1,7,0.7,9.4
          c2.5,2.1,6.2,2.1,8.7,0l0.3,0.3v0.8l5.1,5.1l1.5-1.5L13.3,12.1z M7.2,12.1c-2.5,0-4.6-2.1-4.6-4.6S4.7,3,7.2,3s4.6,2.1,4.6,4.6
          C11.8,10.1,9.7,12.1,7.2,12.1C7.2,12.1,7.2,12.1,7.2,12.1L7.2,12.1z"/>
        </svg>
      </div>
      <a href="" class="word-stadium">
        <img src="@/assets/word-stadium.svg" alt="">
      </a>
      <a href="" class="notification">
        <svg version="1.1" id="outline-notifications-24px" x="0px" y="0px" viewBox="0 0 28 28" style="enable-background:new 0 0 28 28;" xml:space="preserve">
        <path id="Path_966" class="st0" d="M14,26.6c1.5,0.1,2.7-1.1,2.8-2.6h-5.6C11.3,25.5,12.5,26.7,14,26.6z M22.4,18.9v-6.4
          c0.2-3.9-2.5-7.3-6.3-8.1V3.7c-0.1-1.1-1-2-2.1-1.9c-1.1-0.1-2,0.8-2.1,1.9v0.9c-3.8,0.8-6.5,4.2-6.3,8.1v6.4l-2.8,2.6v1.3h22.4
          v-1.3L22.4,18.9z M19.6,20.2H8.4v-7.6c-0.2-3,2.1-5.6,5.1-5.7c0.2,0,0.3,0,0.5,0c3-0.1,5.5,2.3,5.6,5.3c0,0.2,0,0.3,0,0.5V20.2z"/>
        </svg>
      </a>
      <div class="profile-menu" v-if="userLogin">
        <div id="toggle-button" class="user-thumb" :class="{'is-active': isActive}" @click="toggleDropdown($event)">
          <img src="@/assets/user.svg" alt="">
        </div>
        <div class="dropdown-content">
          <ul>
            <li>
              <router-link to="/profile">Edit Profile</router-link>
            </li>
            <li>
              <router-link to="/">Data Profile Lapor</router-link>
            </li>
            <li>
              <router-link to="/">Badge</router-link>
            </li>
          </ul>
          <a href="" class="button-logout" @click.prevent="logout">Keluar</a>
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
export default {
  name: 'Header',
  mixins: [authLink],
  data () {
    return {
      isActive: false
    }
  },
  created () {
    if (this.isProtected()) {
      this.$store.commit('meLogout/userLogin')
    }
    window.addEventListener('click', this.removeDropdown)
  },
  computed: {
    ...mapState('meLogout', [
      'userLogin'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('meLogout/logout')
    },
    toggleDropdown (event) {
      this.isActive = !this.isActive
    },
    removeDropdown (event) {
      if (this.userLogin && !event.target.parentNode.classList.contains('user-thumb')) {
        this.isActive = false
      }
    }
  }
}
</script>
