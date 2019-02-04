<template>
  <div class="card-jp">
    <ModalCreate
      :name="setName(user.full_name)"
      :avatar="user.avatar.medium_square.url"
      v-if="modal === 'modalCreate' || this.$route.query.post == 'create-post'"
      v-on:close="closeModal()"
      v-on:submit="submitPublikasi($event)"
    />
    <ModalShare
      v-if="modal === 'modalShare'"
      :id="shareId"
      title="Sudah tahu Janji yang ini, belum? Siap-siap catatan, ya! ✔"
      v-on:close="closeModal()"
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
        :created_at_in_word="item.created_at_in_word.id"
        :title="item.title"
        :description="trimCharacters(item.body, 180)"
        :image="item.image.large.url"
        :creator="item.creator"
        @onDelete="deletePost($event)"
        @onCopy="copyToClipboard($event)"
        @onShare="modalShare($event)"
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
import ModalShare from '@/components/Linimasa/ModalShare'
import JanjiPolitikItem from '@/components/Linimasa/JanjiPolitikItem'
import JanjiPolitikCreateItem from '@/components/Linimasa/JanjiPolitikCreateItem'

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
  mixins: [utils],
  props: {
    data: {
      type: Array,
      required: true
    },
    userAuth: {
      type: Boolean,
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
      shareId: ''
    }
  },
  computed: {
    isAllowCreated() {
      if (!this.user || !this.user.cluster) return false
      return this.user.cluster.is_eligible
    }
  },
  methods: {
    ...mapActions(['postJanjiPolitik', 'deleteJanjiPolitik']),
    modalCreate() {
      this.$router.replace({
        query: { type: 'janji-politik', post: 'create-post' }
      })
      this.modal = 'modalCreate'
    },
    // handleReport(id) {
    //   this.postReport(id)
    // },
    deletePost(id) {
      this.deleteJanjiPolitik({ id }).then(() => {
        this.$toaster.success('Berhasil menghapus janji politik.')
      })
    },
    copyToClipboard(id) {
      const url = cleanURL(`${process.env.BASE_URL}/linimasa/detail/${id}`)
      this.$clipboard(url)
      this.$toaster.info('Berhasil menyalin teks.')
    },
    modalShare(id) {
      this.shareId = id
      this.modal = 'modalShare'
    },
    closeModal() {
      this.$router.replace({ query: { type: 'janji-politik' } })
      this.modal = false
    },
    submitPublikasi(data) {
      this.postJanjiPolitik(data).then(async () => {
        await this.closeModal()
        await this.$emit('successSubmitPublikasi')
      })
    }
  }
}
</script>
