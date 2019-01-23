<template>
  <div class="card card-pilpres">
    <!-- <ModalShare v-if="modal === 'modalShare'" :id="shareId" v-on:close="closeModal()"/> -->
    <h4 class="title">Pilpres</h4>
    <div class="pilpres-content">
      <div v-if="feedsPilpres">
        <div class="card-list" v-for="pilpres in feedsPilpres" :key="pilpres.id">
          <div class="group-tilte">
            <div class="group-thumb">
              <img
                v-if="pilpres.team.avatar != null"
                :src="pilpres.team.avatar"
                :alt="pilpres.team.title"
              >
              <img v-else src="@/assets/icon-group.png" alt>
            </div>
            <div class="group-name">
              <p>Disematkan dari Team Pemenangan {{pilpres.team.title}}</p>
            </div>
          </div>
          <div class="group-content">
            <div class="content-thumb">
              <div class="image-thumb">
                <img
                  v-if="pilpres.account.profile_image_url != null"
                  :src="pilpres.account.profile_image_url"
                  :alt="pilpres.account.username"
                >
                <img v-else src="@/assets/user.svg" alt>
              </div>
              <div class="icon-thumb">
                <img src="@/assets/icon-twitter-rounded.svg" alt>
              </div>
            </div>
            <div class="content-desc">
              <div class="title-desc">
                <h5>
                  {{pilpres.account.name}}
                  <span>@{{pilpres.account.username}}</span>
                  <span>.</span>
                  <span>{{ pilpres.created_at_in_word.id }}</span>
                </h5>
                <div class="content-action action-img">
                  <a
                    href
                    class="icon-setting"
                    :class="{'is-active': isActive == pilpres.id}"
                    @click.prevent="toggleDropdown(pilpres.id, $event)"
                  >
                    <img class="icon-dots" src="@/assets/dots-icon.svg" alt>
                  </a>
                  <div class="dropdown-content">
                    <ul>
                      <!-- <li>
                        <a href="javascript:void(0)" @click.stop="copyToClipboard(pilpres.id)">
                          <link-icon/>Salin Tautan
                        </a>
                      </li>-->
                      <!-- <li>
                        <a href="javascript:void(0)" @click.stop="modalShare(pilpres.id)">
                          <share-icon/>Bagikan
                        </a>
                      </li>-->
                      <li>
                        <a
                          href="javascript:void(0)"
                          @click.stop="openTwitter('https://twitter.com/' + pilpres.account.username + '/status/' + pilpres.source.id )"
                        >
                          <sosmed-twitter-icon/>Buka di Web Twitter
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="desc-text">
                <p v-html="pilpres.source.text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <loading-lottie v-if="loadingAnimating"/>
      <div class="load-more" @click="loadMore" v-if="!paginations.isLast">Tampilkan lebih banyak
        <div class="arrow-icon">
          <bottom-arrow/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ModalShare from '@/components/Linimasa/ModalShare'
import {
  BottomArrow,
  IconDots,
  LinkIcon,
  SosmedTwitterIcon,
  ShareIcon
} from '@/svg/icons'
import { mapState, mapActions } from 'vuex'
import LoadingLottie from '@/components/LoadingLottie'
export default {
  name: 'CardPilpress',
  components: {
    BottomArrow,
    IconDots,
    LoadingLottie,
    LinkIcon,
    SosmedTwitterIcon,
    ShareIcon
    // ModalShare
  },
  data() {
    return {
      isActive: false,
      // modal: false,
      shareId: ''
    }
  },

  computed: {
    ...mapState('homePilpres', ['feedsPilpres', 'paginations']),
    ...mapState('loadingLottie', ['loadingAnimating'])
  },
  created() {
    this.$store.dispatch('homePilpres/homePilpres')
    window.addEventListener('click', this.removeDropdown)
  },
  methods: {
    loadMore() {
      if (this.paginations.isLast === false) {
        this.$store.dispatch('homePilpres/nextPage')
        this.$store.dispatch('homePilpres/updateHomePilpres')
      }
    },
    // copyToClipboard(id) {
    //   this.$clipboard(`${process.env.BASE_URL}linimasa/detail/${id}`)
    //   this.isActive = 0
    // },
    // modalShare(id) {
    //   this.shareId = id
    //   this.modal = 'modalShare'
    // },
    openTwitter(url) {
      window.open(url, '_blank')
      this.isActive = 0
    },
    // closeModal() {
    //   this.modal = false
    // },
    toggleDropdown(el, event) {
      var toggleClick =
        event.target.classList.contains('icon-dots') &&
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
