<template>
  <div class="card-jp">
    <ModalCreate
      :name="setName(user.full_name)"
      :avatar="user.avatar.medium_square.url"
      v-if="modal === 'modalCreate' || this.$route.query.post == 'create-post'"
      v-on:close="closeModal()"
      v-on:submit="submitPublikasi($event)"
    />
    <ModalShare v-if="modal === 'modalShare'" :id="shareId" v-on:close="closeModal()"/>
    <JanjiPolitikCreateItem
      :avatar="user.avatar.medium_square.url"
      :author_name="setName(user.full_name)"
      @clicked="modalCreate()"
      v-if="userAuth"
    />
    <div class="card-content" v-for="item in data" :key="item.id">
      <JanjiPolitikItem
        :id="item.id"
        :avatar="item.creator.avatar.thumbnail_square.url"
        :author_name="setName(item.creator.full_name)"
        :author_about="item.creator.about"
        :created_at_in_word="item.created_at_in_word.id"
        :title="item.title"
        :description="trimCharacters(item.body)"
        @onCopy="copyToClipboard($event)"
        @onShare="modalShare($event)"
        @onReport="handleReport($event)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { LinkIcon, AlertIcon, ShareIcon, CloseIcon } from '@/svg/icons'
import { utils } from '@/mixins/utils.js'

import ModalCreate from '@/components/Linimasa/ModalCreate'
import ModalShare from '@/components/Linimasa/ModalShare'
import JanjiPolitikItem from '@/components/Linimasa/JanjiPolitikItem'
import JanjiPolitikCreateItem from '@/components/Linimasa/JanjiPolitikCreateItem'

export default {
  name: 'JanjiPolitikList',
  components: {
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
    user: Object
  },
  data() {
    return {
      modal: false,
      shareId: ''
    }
  },
  methods: {
    ...mapActions(['postReport', 'postJanjiPolitik']),
    modalCreate() {
      this.$router.replace({
        query: { type: 'janji-politik', post: 'create-post' }
      })
      this.modal = 'modalCreate'
    },
    handleReport(id) {
      this.postReport(id)
    },
    copyToClipboard(id) {
      this.$clipboard(`${process.env.BASE_URL}/linimasa/detail/${id}`)
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
