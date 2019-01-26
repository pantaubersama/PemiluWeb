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
          <div v-for="badge in sortedBadges" :key="badge.id" class="item">
            <img :src="badge.image.url">
            <span>
              <p :data-title="badge.name">{{badge.name}}</p>
              <p class="sub-text" :data-text="badge.description">{{badge.description || '-'}}</p>
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
            <router-link class="tab-nav" :to="{ path: '/profile', query: { history: 'linimasa' }}">
              <i class="icon icon-book"></i>
            </router-link>
          </li>
          <li>
            <router-link class="tab-nav" :to="{ path: '/profile', query: { history: 'penpol' }}">
              <i class="icon icon-education"></i>
            </router-link>
          </li>
          <li>
            <router-link
              class="tab-nav"
              :to="{ path: '/profile', query: { history: 'wordstadium' }}"
            >
              <i class="icon icon-record"></i>
            </router-link>
          </li>
          <li>
            <router-link class="tab-nav" :to="{ path: '/profile', query: { history: 'lapor' }}">
              <i class="icon icon-report"></i>
            </router-link>
          </li>
          <li>
            <router-link
              class="tab-nav"
              :to="{ path: '/profile', query: { history: 'perhitungan' }}"
            >
              <i class="icon icon-date"></i>
            </router-link>
          </li>
        </ul>
      </div>
      <template v-if="$route.query.history == null || $route.query.history === 'linimasa'">
        <janji-politik-card
          v-for="feed in feedLinimasa"
          :key="feed.id"
          :avatarURL="feed.account.profile_image_url"
          :name="feed.account.name"
          :cluster="feed.team.title"
          :text="feed.source.text"
          :time="feed.created_at_in_word.en"
        ></janji-politik-card>
      </template>
      <template v-else-if="$route.query.history === 'penpol'">
        <question-item
          v-for="question in feedPenpol"
          :key="question.id"
          :id="question.id"
          :name="question.user.full_name"
          :avatar="question.user.avatar.url"
          :title="question.title"
          :time="question.created_at_in_word.en"
          :question="question.body"
          :is-voted="question.is_liked"
          :count="question.like_count"
        ></question-item>
      </template>
      <template v-else>
        <comming-soon></comming-soon>
      </template>
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
    <modal-invite-cluster
      v-if="modal === 'ModalInviteCluster'"
      :cluster="user.cluster"
      @close-request="closeModal()"
    ></modal-invite-cluster>
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
import JanjiPolitikCard from '@/components/janji-politik-card'
import QuestionItem from '@/components/pendidikan-politik/question-item'
import CommingSoon from '@/components/ComingSoon'
export default {
  name: 'CardProfile',
  components: {
    ListCardJP,
    JanjiPolitikCard,
    ModalRequestCluster,
    ModalConfirmRequestCluster,
    VerifiedIconDefault,
    ModalEditProfile,
    ClusterPanel,
    ModalInviteCluster,
    QuestionItem,
    CommingSoon
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
      badges: s => s.profile.badges,
      feedLinimasa: s => s.profile.historyLinimasa,
      feedPenpol: s => s.profile.historyPendidikanPolitik
    }),
    sortedBadges() {
      return this.badges.slice().sort((a, b) => a.position - b.position)
    }
  },
  created() {
    if (this.$route.query.hasOwnProperty('edit-profile')) {
      this.modal = 'ModalEditProfile'
    }
  },
  mounted() {
    this.$store.dispatch('profile/getMe')
    this.$store.dispatch('profile/getBadges')
    this.$store.dispatch('profile/getLinimasaHistory')
    this.$store.dispatch('profile/getQuestionList')
    this.$store.dispatch('profile/listBadges')
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
        this.modal = false
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
a.router-link-exact-active i.icon
  background-color: #bd081c
i.icon
  display: block
  height: 25px
  width: 25px
  background: #4f4f4f

  &.icon-book
    -webkit-mask: url(~@/assets/icon_book.svg)
  &.icon-education
    -webkit-mask: url(~@/assets/icon_education.svg)
  &.icon-record
    -webkit-mask: url(~@/assets/icon_record.svg)
  &.icon-report
    -webkit-mask: url(~@/assets/icon_report.svg)
  &.icon-date
    -webkit-mask: url(~@/assets/icon_date.svg)
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
