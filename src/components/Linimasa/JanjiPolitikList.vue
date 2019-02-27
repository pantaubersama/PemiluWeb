<template>
  <div class="card-jp">
    <ModalCreate
      :name="setName(user.full_name)"
      :avatar="user.avatar.medium_square.url"
      :is-submitting="isSubmitting"
      v-if="modal === 'modalCreate'"
      v-on:close="closeModal()"
      v-on:submit="submitPublikasi($event)"
    />
    <ModalShare
      :id="shareId"
      v-if="isSharing"
      @close="isSharing = false"
      :url="shareURL"
      :title="shareTitle"
    />
    <JanjiPolitikCreateItem
      :avatar="user.avatar.medium_square.url"
      :author_name="setName(user.full_name)"
      @clicked="modalCreate()"
      v-if="userAuth && isAllowCreated"
    />
    <div class="card-content" v-for="item in data" :key="item.id">
      <div v-if="loading">
        <!-- TODO: seharuusnya menggunakan loader yang berbeda, disesuaikan dengan stylenya :) -->
        <ContentLoader/>
      </div>

      <JanjiPolitikItem
        v-else
        :userAuth="userAuth"
        :user="user"
        :id="item.id"
        :avatar="item.creator.avatar.thumbnail_square.url"
        :author_name="setName(item.creator.full_name)"
        :author_about="item.creator.about"
        :userId="item.creator.id"
        :created_at_in_word="item.created_at_in_word.id"
        :title="item.title"
        :description="trimCharacters(item.body, 180)"
        :image="item.image.large.url"
        :creator="item.creator"
        @onDelete="deletePost(item.id, $event)"
        @onCopy="copyToClipboard(item.id, $event)"
        @onShare="modalShare(item.id, $event)"
        :isActive="isActive"
        @toggleDropdown="toggleDropdown(item.id, $event)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { utils } from '@/mixins/utils'
import { cleanURL } from '@/utils'
import { LinkIcon, AlertIcon, ShareIcon, CloseIcon } from '@/svg/icons'

import ContentLoader from '@/components/Loading/ContentLoader'
import ModalCreate from '@/components/Linimasa/ModalCreate'
import ModalShare from '@/components/modal-share'
import JanjiPolitikItem from '@/components/Linimasa/JanjiPolitikItem'
import JanjiPolitikCreateItem from '@/components/Linimasa/JanjiPolitikCreateItem'
import ShareOptions from '@/mixins/share-options'
export default {
  name: 'JanjiPolitikList',
  components: {
    ContentLoader,
    JanjiPolitikItem,
    JanjiPolitikCreateItem,
    ModalCreate,
    ModalShare,
    LinkIcon,
    AlertIcon,
    ShareIcon,
    CloseIcon
  },
  mixins: [utils, ShareOptions],
  props: {
    data: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      require: true
    },
    userAuth: Boolean,
    user: Object
  },
  data() {
    return {
      modal: false,
      isSubmitting: false,
      shareTitle: 'Sudah tahu Janji yang ini, belum? Siap-siap catatan, ya! ✔',
      isSharing: false,
      shareId: ''
    }
  },
  computed: {
    isAllowCreated() {
      if (!this.user || !this.user.cluster) return false
      return this.user.cluster.is_eligible
    },
    shareURL() {
      return `/share/janjipolitik/`
    }
  },
  methods: {
    ...mapActions(['postJanjiPolitik', 'deleteJanjiPolitik']),
    modalCreate() {
      this.modal = 'modalCreate'
    },

    deletePost(id) {
      this.deleteJanjiPolitik({ id }).then(() => {
        this.$toaster.success('Berhasil menghapus janji politik.')
      })
    },
    copyToClipboard(id) {
      this.isActive = false
      const url = cleanURL(`${process.env.SHARE_DOMAIN}/share/janjipolitik/${id}`)
      this.$clipboard(url)
      this.$toaster.info('Berhasil menyalin teks.')
    },
    modalShare(id) {
      this.isActive = false
      this.shareId = id
      this.isSharing = true
    },
    closeModal() {
      this.modal = false
    },
    submitPublikasi(data) {
      this.isSubmitting = true
      this.postJanjiPolitik(data).then(() => {
        this.isSubmitting = false
        this.closeModal()
      })
    }
  }
}
</script>
