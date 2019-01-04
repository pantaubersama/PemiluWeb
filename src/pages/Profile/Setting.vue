<template>
  <timeline-layout>
    <div class="ProfileSetting" slot="main-content">
      <div class="card setting">
        <div class="card-title">Setting</div>
        <div class="card-body">
          <div class="card-column">
            <button class="change-password" @click.stop="isModalChangePasswordOpen = true">
              <i class="icon icon-lock"></i>
              <span class="label">Ubah Sandi</span>
              <i class="icon icon-chevron-right"></i>
            </button>
          </div>
          <div class="card-column">
            <div class="connect">
              <p>Click below to connect your Symbolic account with Twitter</p>
              <button class="btn btn-twitter">
                <icon-twitter/>
                <span>CONNECT WITH TWITTER</span>
              </button>
            </div>
          </div>
          <div class="card-column">
            <div class="connect">
              <p>Connected as :</p>
              <button class="btn btn-facebook">
                <icon-facebook/>John Doe
              </button>
            </div>
          </div>
        </div>
      </div>
      <modal-change-password
        v-if="isModalChangePasswordOpen"
        @close-request="() => isModalChangePasswordOpen = false"
      ></modal-change-password>
    </div>
    <template slot="widget-wrapper">&nbsp;</template>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/Timeline'
import ModalChangePassword from '@/pages/Profile/ModalChangePassword'
import { IconTwitter, IconFacebook } from '@/svg/icons'
export default {
  name: 'ProfileSetting',
  components: {
    TimelineLayout,
    ModalChangePassword,
    IconTwitter,
    IconFacebook
  },
  data() {
    return {
      isModalChangePasswordOpen: false
    }
  },
  methods: {
    closeModal() {
      console.log('close modal')
      this.isModalChangePasswordOpen = false
    }
  }
}
</script>
