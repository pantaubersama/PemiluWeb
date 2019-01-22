<template>
  <div class="profil-list">
    <div class="card grey">
      <span class="edit-icon">
        <a href="#" @click.prevent="() => modal = 'ModalEditProfile'">
          <img src="@/assets/icon_edit.svg">
        </a>
      </span>
      <div class="profile">
        <img :src="user.avatar.url">
        <span>
          <h3>{{user.full_name}}, @{{user.username}}</h3>
          <div v-if="user.verified" class="line-verified">
            <verified-icon-default/>Terverifikasi
          </div>
          <router-link v-else class="btn line" to="/profile/verified-steps">
            <verified-icon-default/>Belum Verifikasi
          </router-link>
        </span>
        <p v-if="user.about && user.about.length > 0">{{user.about}}</p>
        <p v-else>-</p>
      </div>
    </div>
    <div class="card">
      <cluster-panel
        :user="user"
        @request-cluster="() => modal = 'ModalRequestCluster'"
        @invite-cluster="() => modal = 'ModalInviteCluster'"
      ></cluster-panel>
      <div class="list-wrap">
        <h4 class="title">
          Biodata
          <a href="#" @click.prevent="() => modal = 'ModalEditProfile'">
            <img src="@/assets/icon_edit.svg">
          </a>
        </h4>
        <div class="item">
          <img src="@/assets/icon_point.svg">
          <p v-if="user.location">{{user.location}}</p>
          <p v-else>-</p>
        </div>
        <div class="item">
          <img src="@/assets/icon_open_book.svg">
          <p v-if="user.education">{{user.education}}</p>
          <p v-else>-</p>
        </div>
        <div class="item">
          <img src="@/assets/icon_briefcase.svg">
          <p v-if="user.occupation">{{user.occupation}}</p>
          <p v-else>-</p>
        </div>
      </div>

      <div class="list-wrap">
        <h4 class="title">Badge
          <router-link class="badge-more" to="/profile/badge">Lihat lainnya</router-link>
        </h4>
        <template v-if="badges.length > 0">
          <div v-for="badge in badges" :key="badge" class="item">
            <img src="@/assets/flag-star-1.png">
            <span>
              <p :data-title="badge.title">KADET</p>
              <p class="sub-text" :data-text="badge.description">Ikut Kuis Pendidikan Pertama Kali</p>
            </span>
          </div>
        </template>
        <template v-else>
          <div class="item">
            <img src="@/assets/flag-star-1.png">
            <span>
              <p>
                KADET -
                <i>placeholder</i>
              </p>
              <p class="sub-text">Ikut Kuis Pendidikan Pertama Kali</p>
            </span>
          </div>
          <div class="item">
            <img src="@/assets/finger-star-1.png">
            <span>
              <p>
                KEPO -
                <i>placeholder</i>
              </p>
              <p class="sub-text">Ikut Tanya Calon Presiden Pertama Kali</p>
            </span>
          </div>
          <div class="item">
            <img src="@/assets/flag-star-3.png">
            <span>
              <p>
                VETERAN -
                <i>placeholder</i>
              </p>
              <p class="sub-text">Misi Ikut Kuis Pendidikan 10 X</p>
            </span>
          </div>
        </template>
      </div>
    </div>

    <div class="card tabs">
      <div class="nav-tabs">
        <ul>
          <li>
            <a class="active" href="#">
              <img src="@/assets/icon_book.svg">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="@/assets/icon_education.svg">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="@/assets/icon_record.svg">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="@/assets/icon_report.svg">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="@/assets/icon_date.svg">
            </a>
          </li>
        </ul>
      </div>
      <ListCardJP></ListCardJP>
      <ListCardJP></ListCardJP>
    </div>

    <modal-request-cluster v-if="modal === 'ModalRequestCluster'" @close-request="closeModal()"></modal-request-cluster>
    <modal-confirm-request-cluster
      v-if="modal === 'ModalConfirmCluster'"
      @back="onConfirmBack()"
      @confirm="onConfirmRequestCluster()"
    ></modal-confirm-request-cluster>
    <modal-edit-profile
      v-if="modal === 'ModalEditProfile'"
      @close="closeModal()"
      @submit="onSubmitProfile($event)"
      :user="user"
    />
    <modal-invite-cluster v-if="modal === 'ModalInviteCluster'" @close-request="closeModal()"></modal-invite-cluster>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListCardJP from '@/components/ListCardJP'
import ModalRequestCluster from '@/pages/Profile/ModalRequestCluster'
import ModalConfirmRequestCluster from '@/pages/Profile/ModalConfirmRequestCluster'
import ModalEditProfile from '@/pages/Profile/ModalEditProfile'
import { VerifiedIconDefault } from '@/svg/icons'
import ClusterPanel from '@/components/profile/cluster-panel'
import ModalInviteCluster from '@/pages/Profile/ModalInviteCluster'
export default {
  name: 'CardProfile',
  components: {
    ListCardJP,
    ModalRequestCluster,
    ModalConfirmRequestCluster,
    VerifiedIconDefault,
    ModalEditProfile,
    ClusterPanel,
    ModalInviteCluster
  },
  data() {
    return {
      isVerified: false,
      isDropdownActive: false,
      modal: false
    }
  },
  computed: {
    ...mapState({
      user: s => s.profile.user,
      badges: s => s.profile.badges
    })
  },
  created() {
    if (this.$route.query.hasOwnProperty('edit-profile')) {
      this.modal = 'ModalEditProfile'
    }
  },
  mounted() {
    this.$store.dispatch('profile/getMe')
    this.$store.dispatch('profile/getBadges')
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
      this.modal = 'ModalRequestCluster'
    },
    onConfirmRequestCluster() {
      this.modal = false
    },
    onSubmitRequest({ name, category, description }) {
      this.requestCluster.name = name
      this.requestCluster.category = category
      this.requestCluster.description = description
      this.modal = 'ModalConfirmCluster'
    },
    onSubmitProfile(data) {
      this.$store.dispatch('profile/update', data).then(() => {
        if (this.$route.query.hasOwnProperty('edit-profile')) {
          this.$router.push('/profile/setting')
        }
      })
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
