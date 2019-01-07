<template>
  <div class="profil-list">
    <div class="card grey">
      <span class="edit-icon">
        <a href="#">
          <img src="@/assets/icon_edit.svg">
        </a>
      </span>
      <div class="profile">
        <img src="@/assets/trump.jpg">
        <span>
          <h3>Jelo Caviar, @jelo</h3>
          <div v-if="isVerified" class="line-verified">
            <verified-icon-default/>Terverifikasi
          </div>
          <router-link v-else class="btn line" to="/profile/verified-steps">
            <verified-icon-default/>Belum Verifikasi
          </router-link>
        </span>
        <p>An ordinary netizen who likes to talk a lot. Like, a lot. Who cares anyway!</p>
      </div>
    </div>
    <div class="card">
      <div class="list-wrap">
        <h4 class="title">Cluster</h4>
        <div class="item">
          <img src="@/assets/user.svg">
          <p>Universitas Gajah Mada</p>
          <span class="icon">
            <button
              id="toggle-button"
              class="request-cluster"
              :class="{ 'is-active': isDropdownActive }"
              @click.stop="toggleDropdownCluster()"
            >
              <img src="@/assets/icon_more_vertical.svg">
            </button>
            <div class="dropdown-content">
              <button
                class="create-cluster"
                @click.stop="() => isModalRequestClusterOpen = true"
              >Request Buat Cluster</button>
            </div>
          </span>
        </div>
      </div>
      <div class="list-wrap">
        <h4 class="title">
          Biodata
          <a href="#" @click.prevent="ModalEditProfile">
            <img src="@/assets/icon_edit.svg">
          </a>
        </h4>
        <div class="item">
          <img src="@/assets/icon_point.svg">
          <p>Bandung</p>
        </div>
        <div class="item">
          <img src="@/assets/icon_open_book.svg">
          <p>Universitas Gajah Mada</p>
        </div>
        <div class="item">
          <img src="@/assets/icon_briefcase.svg">
          <p>Pantau Bersama</p>
        </div>
      </div>
      <div class="list-wrap">
        <h4 class="title">Badge</h4>
        <div class="item">
          <img src="@/assets/sketchbook.png">
          <span>
            <p>CLEVER</p>
            <p class="sub-text">Misi Tanya Presiden 10X</p>
          </span>
        </div>
        <div class="item">
          <img src="@/assets/hearts.png">
          <span>
            <p>LOPELOPE</p>
            <p class="sub-text">Ikut Kuis Pendidikan</p>
          </span>
        </div>
        <div class="item">
          <img src="@/assets/headphones.png">
          <span>
            <p>LISTENER</p>
            <p class="sub-text">Ikut Kuis Pendidikan</p>
          </span>
        </div>
      </div>
    </div>

    <div class="card tabs">
      <div class="nav-tabs">
        <ul>
          <li>
            <a class="active" href>
              <img src="@/assets/icon_book.svg">
            </a>
          </li>
          <li>
            <a href>
              <img src="@/assets/icon_education.svg">
            </a>
          </li>
          <li>
            <a href>
              <img src="@/assets/icon_record.svg">
            </a>
          </li>
          <li>
            <a href>
              <img src="@/assets/icon_report.svg">
            </a>
          </li>
          <li>
            <a href>
              <img src="@/assets/icon_date.svg">
            </a>
          </li>
        </ul>
      </div>
      <ListCardJP></ListCardJP>
      <ListCardJP></ListCardJP>
    </div>

    <modal-request-cluster
      v-if="isModalRequestClusterOpen"
      :name="requestCluster.name"
      :category="requestCluster.category"
      :description="requestCluster.description"
      @close-request="() => isModalRequestClusterOpen = false"
      @submit="onSubmitRequest($event)"
    ></modal-request-cluster>
    <modal-confirm-request-cluster
      v-if="isModalConfirmOpen"
      @back="onConfirmBack()"
      @confirm="onConfirmRequestCluster()"
    ></modal-confirm-request-cluster>
    <modal-edit-profile v-if="modal === 'ModalEditProfile'" v-on:close="closeModal()"/>
  </div>
</template>

<script>
import ListCardJP from '@/components/ListCardJP'
import ModalRequestCluster from '@/pages/Profile/ModalRequestCluster'
import ModalConfirmRequestCluster from '@/pages/Profile/ModalConfirmRequestCluster'
import ModalEditProfile from '@/pages/Profile/ModalEditProfile'
import { VerifiedIconDefault } from '@/svg/icons'
export default {
  name: 'CardProfile',
  components: {
    ListCardJP,
    ModalRequestCluster,
    ModalConfirmRequestCluster,
    VerifiedIconDefault,
    ModalEditProfile
  },
  data() {
    return {
      isVerified: false,
      isDropdownActive: false,
      isModalRequestClusterOpen: false,
      isModalConfirmOpen: true,
      modal: false,
      requestCluster: {
        name: 'PDIP',
        category: 'partai',
        description: 'Merupakan Cluster Yang Bergerak'
      }
    }
  },
  mounted() {
    window.addEventListener('click', this.removeDropdown)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.removeDropdown)
  },
  methods: {
    toggleDropdownCluster() {
      this.isDropdownActive = !this.isDropdownActive
    },
    onConfirmBack() {
      this.isModalConfirmOpen = false
      this.isModalRequestClusterOpen = true
    },
    onConfirmRequestCluster() {
      this.isModalConfirmOpen = false
    },
    onSubmitRequest({ name, category, description }) {
      this.requestCluster.name = name
      this.requestCluster.category = category
      this.requestCluster.description = description
      this.isModalRequestClusterOpen = false
      this.isModalConfirmOpen = true
    },
    removeDropdown(event) {
      const isInsideDropdown = event.target.parentNode.parentNode.classList.contains(
        'request-cluster'
      )
      if (!this.isDropdownActive) return
      if (!isInsideDropdown) {
        console.log('remove dropdown')
        this.isDropdownActive = false
      }
    },
    ModalEditProfile() {
      this.modal = 'ModalEditProfile'
    },
    closeModal() {
      this.modal = false
    }
  }
}
</script>
<style lang="sass" scoped>
span.icon
  position: relative
button.request-cluster
  background: none
  border: none
  cursor: pointer
  &.is-active + .dropdown-content
    display: block
button.create-cluster
  background: none
  border: none
  font-size: 12px
  font-weight: bold
  line-height: 1.33
  text-align: left
  color: #f2771d
  cursor: pointer
</style>
