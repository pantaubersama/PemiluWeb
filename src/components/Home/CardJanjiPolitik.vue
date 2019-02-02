<template>
  <div class="card card-jp">
    <ModalShare v-if="modal === 'modalShare'" :id="shareId" v-on:close="closeModal()"/>
    <h4 class="title">Janji Politik</h4>
    <div v-if="feedsJanjiPolitik">
      <div class="card-content" v-for="janjiPolitik in feedsJanjiPolitik" :key="janjiPolitik.id">
        <div class="top">
          <div class="avatar">
            <a href v-if="janjiPolitik.creator.avatar.thumbnail.url != null">
              <img :src="janjiPolitik.creator.avatar.thumbnail.url">
            </a>
            <a href="#" v-else>
              <img src="@/assets/user.svg">
            </a>
          </div>
          <h5>
            {{janjiPolitik.creator.full_name}},
            <span
              v-if="janjiPolitik.creator.cluster != null"
            >{{janjiPolitik.creator.cluster.name}}</span>
          </h5>
          <span class="right">{{janjiPolitik.created_at_in_word.id}}</span>
        </div>
        <router-link :to="{name: 'LinimasaDetail', params: {id: janjiPolitik.id}}">
          <h4 class="title" v-html="trimCharacters(janjiPolitik.title, 100)"></h4>
        </router-link>
        <div class="main-content">
          <p v-html="trimCharacters(janjiPolitik.body, 290)"></p>
          <div class="content-thumb" v-if="janjiPolitik.image.url != null">
            <img :src="janjiPolitik.image.url">
          </div>
        </div>
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
                <a href="javascript:void(0)" @click.stop="modalShare(janjiPolitik.id)">
                  <share-icon/>Bagikan
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" @click.stop="handleReport(janjiPolitik.id)">
                  <alert-icon/>Laporkan sebagai spam
                </a>
              </li>
            </ul>
          </div>
        </span>
      </div>
    </div>
    <div v-if="loadingAnimating">
      <ContentLoader/>
    </div>
    <div class="load-more" @click="loadMore" v-if="!paginations.isLast">Tampilkan lebih banyak
      <div class="arrow-icon">
        <bottom-arrow/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { authLink } from '@/mixins/link'
import { cleanURL } from '@/utils'

import LoadingLottie from '@/components/LoadingLottie'
import {
  LinkIcon,
  AlertIcon,
  ShareIcon,
  CloseIcon,
  BottomArrow,
  IconDots
} from '@/svg/icons'
import ModalShare from '@/components/Linimasa/ModalShare'
import ContentLoader from '@/components/Loading/ContentLoader'
export default {
  name: 'CardJP',
  components: {
    BottomArrow,
    IconDots,
    LoadingLottie,
    LinkIcon,
    AlertIcon,
    ShareIcon,
    CloseIcon,
    ModalShare,
    ContentLoader
  },
  mixins: [authLink],
  data() {
    return {
      isActive: false,
      modal: false
    }
  },
  computed: {
    ...mapState('homeJanjiPolitik', ['feedsJanjiPolitik', 'paginations']),
    ...mapState('loadingLottie', ['loadingAnimating'])
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
    closeModal() {
      this.modal = false
    },
    handleReport(id) {
      this.postReport(id)
      this.modal = false
      this.$store.commit('snackbar/setSnack', 'Laporan Berhasil')
    },
    copyToClipboard(id) {
      const url = cleanURL(`${process.env.BASE_URL}/linimasa/detail/${id}`)
      this.$clipboard(url)
      this.isActive = false
      this.$store.commit('snackbar/setSnack', 'Tautan Tersalin')
    },
    modalShare(id) {
      this.shareId = id
      this.modal = 'modalShare'
    }
  }
}
</script>
