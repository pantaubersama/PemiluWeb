<template>
  <div class="pilpres-content">
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
        :media="item.source.media"
        :source_id="item.source.id"
        @onOpenTwitter="openTwitter($event)"
        :isActive="isActive"
        @toggleDropdown="toggleDropdown(item.id,$event)"
      />
    </div>
  </div>
</template>

<script>
import { cleanURL } from '@/utils'

import ContentLoader from '@/components/Loading/ContentLoader'
import PilpresItem from '@/components/Linimasa/PilpresItem'
import ModalShare from '@/components/Linimasa/ModalShare'
import ShareOptions from '@/mixins/share-options'
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
  mixins: [ShareOptions],
  methods: {
    copyToClipboard(id) {
      const url = cleanURL(`${process.env.BASE_URL}/linimasa/detail/${id}`)
      this.$clipboard(url)
      this.$toaster.info('Berhasil menyalin teks.')
    },
    openTwitter(url) {
      this.isActive = false
      window.open(url, '_blank')
    }
  }
}
</script>
