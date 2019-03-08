<template>
  <div class="card card-jp">
    <ModalShare
      :id="shareId"
      v-if="isSharing"
      @close="isSharing = false"
      :url="shareURL"
      :title="shareTitle"
    />
    <h4 class="title">Janji Politik</h4>
    <div v-if="feedsJanjiPolitik">
      <div class="card-content" v-for="janjiPolitik in feedsJanjiPolitik" :key="janjiPolitik.id">
        <div class="top">
          <router-link v-if="user.id == janjiPolitik.creator.id" class="avatar-wrapper" :to="{path: '/profile'}">
            <div class="avatar">
                <img v-if="janjiPolitik.creator.avatar.thumbnail.url != null" :src="janjiPolitik.creator.avatar.thumbnail.url">
                <img v-else src="@/assets/user.svg">
            </div>
            <h5>
              {{janjiPolitik.creator.full_name}}
              <span>, {{janjiPolitik.creator.cluster.name}}</span>
            </h5>
          </router-link>
          <router-link v-else class="avatar-wrapper" :to="{path: '/profile/user', query: {id: janjiPolitik.creator.id}}">
            <div class="avatar">
                <img v-if="janjiPolitik.creator.avatar.thumbnail.url != null" :src="janjiPolitik.creator.avatar.thumbnail.url">
                <img v-else src="@/assets/user.svg">
            </div>
            <h5>
              {{janjiPolitik.creator.full_name}}
              <span>, {{janjiPolitik.creator.cluster.name}}</span>
            </h5>
          </router-link>
          <span class="right">{{janjiPolitik.created_at_in_word.id}}</span>
        </div>
        <router-link :to="{name: 'LinimasaDetail', params: {id: janjiPolitik.id}}">
          <h4 class="title" v-html="trimCharacters(janjiPolitik.title, 100)"></h4>
          <div class="main-content">
            <p v-html="trimCharacters(janjiPolitik.body, 290)"></p>
            <div class="content-thumb" v-if="janjiPolitik.image.url != null">
              <img :src="janjiPolitik.image.url">
            </div>
          </div>
        </router-link>
        <span class="icon-right">
          <a href class="icon-share" @click.prevent="modalShare(janjiPolitik.id)">
            <img src="@/assets/icon_share.svg">
          </a>
          <a
            href
            class="icon-setting"
            :class="{'is-active': isActive == janjiPolitik.id}"
            @click.prevent="toggleDropdown(janjiPolitik.id, $event)"
          >
            <img class="icon-dots" src="@/assets/dots-icon.svg" alt>
          </a>
          <div class="dropdown-content">
            <ul>
              <!-- TODO: tampilkan button hapus jika user sdh login, dan ini adalah postingannya -->
              <!-- <li v-if="userAuth">
              <a href="javascript:void(0)">
                <close-icon/>Hapus
              </a>
              </li>-->
              <li>
                <a href="javascript:void(0)" @click.stop="copyToClipboard(janjiPolitik.id)">
                  <link-icon/>Salin Tautan
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" @click.stop="modalShare(janjiPolitik.id, $event)">
                  <share-icon/>Bagikan
                </a>
              </li>
            </ul>
          </div>
        </span>
      </div>
    </div>
    <div v-if="loadingAnimating">
      <JpLoader/>
    </div>
    <router-link
      to="/linimasa?type=janji-politik"
      class="load-more"
    >Tampilkan lebih banyak
      <div class="arrow-icon">
        <bottom-arrow/>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { authLink } from '@/mixins/link'
import { cleanURL } from '@/utils'

import {
  LinkIcon,
  AlertIcon,
  ShareIcon,
  CloseIcon,
  BottomArrow,
  IconDots
} from '@/svg/icons'
import ModalShare from '@/components/modal-share'
import JpLoader from '@/components/Loading/JpLoader'
export default {
  name: 'CardJP',
  components: {
    BottomArrow,
    IconDots,
    LinkIcon,
    AlertIcon,
    ShareIcon,
    CloseIcon,
    ModalShare,
    JpLoader
  },
  mixins: [authLink],
  data() {
    return {
      isActive: false,
      modal: false,
      shareTitle: 'Sudah tahu Janji yang ini, belum? Siap-siap catatan, ya! ✔',
      isSharing: false,
      shareId: ''
    }
  },
  computed: {
    ...mapState('homeJanjiPolitik', ['feedsJanjiPolitik', 'paginations']),
    ...mapState('loadingLottie', ['loadingAnimating']),
    ...mapState('profile', ['user']),
    shareURL() {
      return `/share/janjipolitik/`
    }
  },
  created() {
    this.$store.dispatch('homeJanjiPolitik/homeJanjiPolitik')
    window.addEventListener('click', this.removeDropdown)
    if (this.isProtected()) {
      this.$store.dispatch('homeKenalan/updateKenalan', {
        id: 'e27b16e8-f585-448b-afbc-0219c48471d6'
      })
    }
  },
  methods: {
    ...mapActions(['postReport', 'postJanjiPolitik']),
    loadMore() {
      if (this.paginations.isLast === false) {
        this.$store.dispatch('homeJanjiPolitik/nextPage')
        this.$store.dispatch('homeJanjiPolitik/updateJanjiPolitik')
      }
    },
    trimCharacters(text, maxLength) {
      const dots = text.length > maxLength
      if (dots) {
        text = text.substr(0, maxLength)
        text = text.substr(0, Math.min(text.length, text.lastIndexOf(' ')))
      }
      return dots ? `${text}...` : text
    },
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
    },

    copyToClipboard(id) {
      const url = cleanURL(`${process.env.SHARE_DOMAIN}/share/janjipolitik/${id}`)
      this.$clipboard(url)
      this.isActive = false
      this.$toaster.info('Berhasil menyalin teks.')
    },

    modalShare(id) {
      this.isActive = false
      this.shareId = id
      this.isSharing = true
    }
  }
}
</script>
