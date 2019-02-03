<template>
  <modal-layout>
    <div class="modal-share" slot="modal-content">
      <div class="close-icon" @click.prevent="$emit('close')">
        <close-icon></close-icon>
      </div>
      <div class="share-content">
        <social-sharing :url="absoluteURL" :title="title" hashtags="PantauBersama" inline-template>
          <ul>
            <li>
              <network network="facebook">
                <a href="javascript:void(0)">
                  <img src="@/assets/icon-facebook.svg"> Bagikan ke Facebook
                </a>
              </network>
            </li>
            <li>
              <network network="twitter">
                <a href="javascript:void(0)">
                  <img src="@/assets/icon-twitter.svg"> Bagikan ke Twitter
                </a>
              </network>
            </li>
          </ul>
        </social-sharing>
      </div>
    </div>
  </modal-layout>
</template>

<script>
import ModalLayout from '@/layout/Modal'
import { CloseIcon } from '@/svg/icons'
export default {
  name: 'ModalShare',
  props: ['url', 'title'],
  components: {
    ModalLayout,
    CloseIcon
  },
  data() {
    return {
      baseURL: process.env.BASE_URL // window.location.origin
    }
  },
  computed: {
    absoluteURL() {
      return `${this.baseURL}${this.url}`
    }
  },
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }
}
</script>
