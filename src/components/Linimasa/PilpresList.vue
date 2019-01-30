<template>
  <div class="pilpres-content">
    <ModalShare v-if="modal === 'modalShare'" :id="shareId" v-on:close="closeModal()"/>
    <div class="card-list" v-for="item in data" :key="item.id">
      <div v-if="loading">
        <ContentLoader/>
      </div>
      <PilpresItem
        v-else
        :id="item.id"
        :group_avatar="item.team.avatar"
        :team_name="item.team.title"
        :user_avatar="item.account.profile_image_url"
        :user_fullname="item.account.name"
        :user_name="item.account.username"
        :created_at_in_word="item.created_at_in_word.id"
        :description="item.source.text"
        :source_id="item.source.id"
        @onCopy="copyToClipboard($event)"
        @onShare="modalShare($event)"
        @onOpenTwitter="openTwitter($event)"
      />
    </div>
  </div>
</template>

<script>
import ContentLoader from '@/components/Loading/ContentLoader'
import PilpresItem from '@/components/Linimasa/PilpresItem'
import ModalShare from '@/components/Linimasa/ModalShare'

export default {
  name: 'PilpressList',
  components: { ContentLoader, PilpresItem, ModalShare },
  props: {
    data: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      modal: false,
      shareId: ''
    }
  },
  methods: {
    copyToClipboard(id) {
      this.$clipboard(`${process.env.BASE_URL}/linimasa/detail/${id}`)
      this.$toaster.info('Berhasil menyalin teks.')
    },
    modalShare(id) {
      this.shareId = id
      this.modal = 'modalShare'
    },
    openTwitter(url) {
      window.open(url, '_blank')
    },
    closeModal() {
      this.modal = false
    }
  }
}
</script>
