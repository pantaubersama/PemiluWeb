<template>
  <modal-layout>
    <div slot="modal-content" class="modal-share">
      <div class="close-icon" @click="$emit('close')">
        <close-icon/>
      </div>
      <div class="share-content">
        <social-sharing :url="`${baseUrl}/linimasa/detail/${id}`" inline-template>
          <ul>
            <li>
              <network network="facebook">
                <a href="javascript:void(0)">
                  <img src="@/assets/icon-facebook.svg">Bagikan ke Facebook
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
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL
    }
  },
  components: {
    ModalLayout,
    CloseIcon
    // IconFacebook,
    // IconTwitter
  },
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }
}
</script>
