<template>
  <div class="card-jp">
    <ModalShare
      :id="shareId"
      v-if="isSharing"
      @close="isSharing = false"
      :url="shareURL"
      :title="shareTitle"
    />
    <div class="card-content" v-for="item in data" :key="item.id">
      <div v-if="loading">
        <!-- TODO: seharuusnya menggunakan loader yang berbeda, disesuaikan dengan stylenya :) -->
        <ContentLoader/>
      </div>
      <JanjiPolitikItem
        v-else
        :user="user"
        :id="item.id"
        :avatar="item.creator.avatar.thumbnail_square.url"
        :author_name="setName(item.creator.full_name)"
        :author_about="item.creator.about"
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
import ModalShare from '@/components/modal-share'
import JanjiPolitikItem from '@/components/Linimasa/JanjiPolitikItem'
import ShareOptions from '@/mixins/share-options'
export default {
  name: 'JanjiPolitikCard',
  components: {
    ContentLoader,
    JanjiPolitikItem,
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
    shareURL() {
      return `/linimasa/detail/`
    }
  },
  methods: {
    copyToClipboard(id) {
      this.isActive = false
      const url = cleanURL(`${process.env.BASE_URL}/linimasa/detail/${id}`)
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
    }
  }
}
</script>
