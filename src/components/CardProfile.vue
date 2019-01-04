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
            <svg
              version="1.1"
              id="Layer_1"
              viewBox="0 0 48 48"
              style="enable-background:new 0 0 48 48;"
              xml:space="preserve"
            >
              <path
                id="Path_1872"
                class="st0"
                d="M38.9,24l3.1-4.8l-5.1-2.6l0.3-5.7l-5.7,0.3L28.8,6L24,9.1L19.2,6l-2.6,5.1l-5.7-0.3l0.3,5.7
              L6,19.2L9.1,24L6,28.8l5.1,2.6l-0.3,5.7l5.7-0.3l2.6,5.1l4.8-3.1l4.8,3.1l2.6-5.1l5.7,0.3l-0.3-5.7l5.1-2.6L38.9,24z M21.2,31
              l-6.4-6.4l2.1-2.1l4.2,4.2L31,17l2.1,2.1L21.2,31z"
              ></path>
            </svg>
            Terverifikasi
          </div>
          <router-link v-else class="btn line" to="/profile/verified-steps">
            <svg
              version="1.1"
              id="Layer_1"
              viewBox="0 0 48 48"
              style="enable-background:new 0 0 48 48;"
              xml:space="preserve"
            >
              <path
                id="Path_1872"
                class="st0"
                d="M38.9,24l3.1-4.8l-5.1-2.6l0.3-5.7l-5.7,0.3L28.8,6L24,9.1L19.2,6l-2.6,5.1l-5.7-0.3l0.3,5.7
              L6,19.2L9.1,24L6,28.8l5.1,2.6l-0.3,5.7l5.7-0.3l2.6,5.1l4.8-3.1l4.8,3.1l2.6-5.1l5.7,0.3l-0.3-5.7l5.1-2.6L38.9,24z M21.2,31
              l-6.4-6.4l2.1-2.1l4.2,4.2L31,17l2.1,2.1L21.2,31z"
              ></path>
            </svg>
            Belum Verifikasi
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
          <a href>
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
  </div>
</template>

<script>
import ListCardJP from '@/components/ListCardJP'
import ModalRequestCluster from '@/pages/Profile/ModalRequestCluster'
import ModalConfirmRequestCluster from '@/pages/Profile/ModalConfirmRequestCluster'

export default {
  name: 'CardProfile',
  components: {
    ListCardJP,
    ModalRequestCluster,
    ModalConfirmRequestCluster
  },
  data() {
    return {
      isVerified: false,
      isDropdownActive: false,
      isModalRequestClusterOpen: false,
      isModalConfirmOpen: true,
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
