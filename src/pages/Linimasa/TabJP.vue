<template>
  <div class="card-jp">
    <modal-create
      v-if="modal === 'modalCreate' || this.$route.query.post == 'create-post'"
      v-on:close="closeModal()"
    />
    <div class="create-post" @click.stop="modalCreate()">
      <div class="card-content">
        <div class="top">
          <div class="avatar">
            <a href>
              <img src="@/assets/user.svg">
            </a>
          </div>
          <h5>Anik Kemala</h5>
        </div>
        <h4 class="title">Publikasi kembali Janji Politik?</h4>
      </div>
    </div>
    <div class="card-content">
      <div class="top">
        <div class="avatar">
          <a href>
            <img src="@/assets/user.svg">
          </a>
        </div>
        <h5>
          Anik Kemala,
          <span>Cluster Partai Kuning Ceria</span>
        </h5>
        <span class="right">8 days ago</span>
      </div>
      <router-link :to="{name: 'LinimasaDetail', params: {id: 1}}">
        <h4 class="title">Prabowo Menjanjikan Dana 1T Untuk Setiap Desa yang memiliki UMKM</h4>
      </router-link>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchang</p>
      <span class="icon-right">
        <a href>
          <img src="@/assets/icon_share.svg">
        </a>
        <a
          href
          class="icon-setting"
          :class="{'is-active': isActive == 1}"
          @click.prevent="toggleDropdown(1, $event)"
        >
          <img src="@/assets/dots-icon.svg" alt>
        </a>
        <div class="dropdown-content">
          <ul>
            <li>
              <a href>
                <close-icon/>Hapus
              </a>
            </li>
            <li>
              <a href>
                <link-icon/>Salin Tautan
              </a>
            </li>
            <li>
              <a href>
                <share-icon/>Bagikan
              </a>
            </li>
            <li>
              <a href>
                <alert-icon/>Laporkan
              </a>
            </li>
          </ul>
        </div>
      </span>
    </div>
    <div class="card-content">
      <div class="top">
        <div class="avatar">
          <a href>
            <img src="@/assets/user.svg">
          </a>
        </div>
        <h5>
          Anik Kemala,
          <span>Cluster Partai Kuning Ceria</span>
        </h5>
        <span class="right">8 days ago</span>
      </div>
      <h4 class="title">Prabowo Menjanjikan Dana 1T Untuk Setiap Desa yang memiliki UMKM</h4>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchang</p>
      <span class="icon-right">
        <a href>
          <img src="@/assets/icon_share.svg">
        </a>
        <a
          href
          class="icon-setting"
          :class="{'is-active': isActive == 2}"
          @click.prevent="toggleDropdown(2, $event)"
        >
          <img src="@/assets/dots-icon.svg" alt>
        </a>
        <div class="dropdown-content">
          <ul>
            <li>
              <a href>
                <close-icon/>Hapus
              </a>
            </li>
            <li>
              <a href>
                <link-icon/>Salin Tautan
              </a>
            </li>
            <li>
              <a href>
                <share-icon/>Bagikan
              </a>
            </li>
            <li>
              <a href>
                <alert-icon/>Laporkan
              </a>
            </li>
          </ul>
        </div>
      </span>
    </div>
    <div class="card-content">
      <div class="top">
        <div class="avatar">
          <a href>
            <img src="@/assets/user.svg">
          </a>
        </div>
        <h5>
          Anik Kemala,
          <span>Cluster Partai Kuning Ceria</span>
        </h5>
        <span class="right">8 days ago</span>
      </div>
      <h4 class="title">Prabowo Menjanjikan Dana 1T Untuk Setiap Desa yang memiliki UMKM</h4>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchang</p>
      <span class="icon-right">
        <a href>
          <img src="@/assets/icon_share.svg">
        </a>
        <a
          href
          class="icon-setting"
          :class="{'is-active': isActive == 3}"
          @click.prevent="toggleDropdown(3, $event)"
        >
          <img src="@/assets/dots-icon.svg" alt>
        </a>
        <div class="dropdown-content">
          <ul>
            <li>
              <a href>
                <close-icon/>Hapus
              </a>
            </li>
            <li>
              <a href>
                <link-icon/>Salin Tautan
              </a>
            </li>
            <li>
              <a href>
                <share-icon/>Bagikan
              </a>
            </li>
            <li>
              <a href>
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
import ModalCreate from '@/pages/Linimasa/ModalCreate'
import { LinkIcon, AlertIcon, ShareIcon, CloseIcon } from '@/svg/icons'
export default {
  name: 'TabJP',
  components: {
    ModalCreate,
    LinkIcon,
    AlertIcon,
    ShareIcon,
    CloseIcon
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
        this.isActive = false
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
    }
  }
}
</script>
