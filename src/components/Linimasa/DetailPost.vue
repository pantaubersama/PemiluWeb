<template>
  <div class="card-detail-wrapper" v-if="data">
    <div class="card card-detail">
      <div class="detail-title">{{ data.title }}</div>
      <div class="content-wrapper">
        <div class="detail-cluster" v-if="data.creator.cluster.name">

          <router-link class="cluster-link"  :to="{ path: '/profile/cluster', query: { id: data.creator.cluster.id }}">
            <div class="cluster-thumb">
              <img
                :src="data.creator.cluster.image.thumbnail_square.url"
                v-if="data.creator.cluster.image.thumbnail_square.url"
                class="rounded-circle"
                alt="thumbnail"
              >
              <img src="@/assets/icon-group.png" alt="thumbnail" v-else>
            </div>
            <div class="cluster-content">
              <h5>{{ data.creator.cluster.name }}</h5>
              <p>{{ `${data.creator.cluster.members_count} anggota` }}</p>
            </div>
          </router-link>
          <span class="icon-right">
            <a
              href
              class="icon-setting"
              :class="{'is-active': isActive === data.id}"
              @click.prevent="toggleDropdown(data.id, $event)"
            >
              <img class="icon-dots" src="@/assets/dots-icon.svg" alt>
            </a>
            <div class="dropdown-content">
              <ul>
                <li v-if="userAuth && isMine">
                  <a href="javascript:void(0)" @click.stop="deletePost(data.id)">
                    <close-icon/>Hapus
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click.stop="copyToClipboard(data.id)">
                    <link-icon/>Salin Tautan
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click.stop="onShare(data.id)">
                    <share-icon/>Bagikan
                  </a>
                </li>
              </ul>
            </div>
          </span>
        </div>
        <div class="detail-content">
          <p v-html="data.body"></p>
          <img :src="data.image.large.url" alt="thumbnail" v-if="data.image.large.url">
        </div>
        <div class="detail-share">
          <button class="btn" id="button-share" @click.prevent="onShare(data.id)">
            BAGIKAN
            <img src="@/assets/icon_share.svg" alt>
          </button>
        </div>
      </div>
    </div>
    <router-link v-if="user.id == data.creator.id" class="card card-author" :to="{path: '/profile'}">
      <div class="author-thumb">
        <img
          :src="data.creator.avatar.medium_square.url"
          v-if="data.creator.avatar.medium_square.url"
          alt
        >
        <img src="@/assets/user.svg" alt v-else>
      </div>
      <div class="author-name">{{ data.creator.full_name }}</div>
      <p>{{ data.creator.about }}</p>
      <div class="time-posted">Posted {{ data.created_at_in_word.id }}</div>
    </router-link>
    <router-link v-else class="card card-author" :to="{path: '/profile/user', query: {id: data.creator.id}}">
      <div class="author-thumb">
        <img
          :src="data.creator.avatar.medium_square.url"
          v-if="data.creator.avatar.medium_square.url"
          alt
        >
        <img src="@/assets/user.svg" alt v-else>
      </div>
      <div class="author-name">{{ data.creator.full_name }}</div>
      <p>{{ data.creator.about }}</p>
      <div class="time-posted">Posted {{ data.created_at_in_word.id }}</div>
    </router-link>
    <ModalShare
      v-if="isSharing"
      @close="isSharing = false"
      :url="shareURL"
      :title="shareTitle"
      :id="data.id"
    ></ModalShare>
  </div>
</template>

<script>
import ShareOptions from '@/mixins/share-options'
import { cleanURL } from '@/utils'
import ModalShare from '@/components/modal-share'

import {
  LinkIcon,
  AlertIcon,
  ShareIcon,
  IconDots,
  CloseIcon
} from '@/svg/icons'

export default {
  name: 'DetailPost',
  mixins: [ShareOptions],
  props: {
    data: Object,
    userAuth: Boolean,
    user: Object
  },
  components: {
    ModalShare,
    LinkIcon,
    AlertIcon,
    ShareIcon,
    IconDots,
    CloseIcon
  },
  data() {
    return {
      shareTitle: 'Sudah tahu Janji yang ini, belum? Siap-siap catatan, ya! ✔',
      isSharing: false
    }
  },
  computed: {
    isMine() {
      if (
        !this.data.creator ||
        !this.user ||
        !this.data.creator.cluster ||
        !this.user.cluster
      ) {
        return false
      }

      return (
        this.data.creator.cluster.id === this.user.cluster.id &&
        this.data.creator.id === this.user.id &&
        this.user.cluster.is_eligible
      )
    },
    shareURL() {
      return `/share/janjipolitik/`
    }
  },
  methods: {
    copyToClipboard(id) {
      const url = cleanURL(`${process.env.SHARE_DOMAIN}/share/janjipolitik/${id}`)
      this.$clipboard(url)
      this.isActive = false
      this.$toaster.info('Berhasil menyalin teks.')
    },
    onShare() {
      this.isSharing = true
    },
    deletePost(id) {
      this.$store.dispatch('deleteJanjiPolitik', { id }).then(async () => {
        await this.$toaster.success('Berhasil menghapus janji politik.')
        await window.history.back()
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.cluster-link
  flex: 1
  display: flex
  align-items: center
.icon-right
  text-align: right
  display: flex
  justify-content: flex-end
  position: relative
  .icon-setting
    width: 24px
    margin-left: 10px
  img
    width: 24px

.dropdown-content
  padding: 10px
  border-radius: 2px
  min-width: 175px
  top: 20px
  bottom: auto
  a
    text-align: left
    font-size: 12px
  svg
    width: 25px
    height: 16px
    padding-right: 5px
    align-self: center

.icon-setting
  width: 20px
  img
    margin-left: 0

  &.is-active
    + .dropdown-content
      display: block

</style>
