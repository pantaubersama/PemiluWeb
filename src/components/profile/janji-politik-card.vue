<template>
  <div class="card-jp">
    <div v-if="data != ''">
      <ModalShare
        :id="shareId"
        v-if="isSharing"
        @close="isSharing = false"
        :url="shareURL"
        :title="shareTitle"
      />
      <div class="card-content" v-for="item in data" :key="item.id">
        <div v-if="loading">
          <ContentLoader/>
        </div>
        <JanjiPolitikItem
          v-else
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
      <div class="load-more" @click="$emit('loadMoreLinimasa')" v-if="!paginationsLinimasa.isLast && data.length > 4">Tampilkan lebih banyak
        <div class="arrow-icon">
          <bottom-arrow/>
        </div>
      </div>
    </div>
    <LottieEmpty v-if="showLottieJp" :message="'Belum pernah membuat Janji Politik'"/>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import lottie from 'lottie-web'
import { utils } from '@/mixins/utils'
import { cleanURL } from '@/utils'
import { LinkIcon, AlertIcon, ShareIcon, CloseIcon,BottomArrow } from '@/svg/icons'
import LottieEmpty from '@/components/LottieEmpty'
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
    CloseIcon,
    LottieEmpty,
    BottomArrow
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
    user: Object,
    paginationsLinimasa: Object
  },
  data() {
    return {
      modal: false,
      isSubmitting: false,
      shareTitle: 'Sudah tahu Janji yang ini, belum? Siap-siap catatan, ya! ✔',
      isSharing: false,
      shareId: '',
      emptyLottie: null
    }
  },
  computed: {
    shareURL() {
      return `/linimasa/detail/`
    },
    ...mapState({
      showLottieJp: s => s.showLottie.showLottieJp
    })
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


