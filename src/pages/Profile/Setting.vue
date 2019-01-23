<template>
  <timeline-layout>
    <div class="ProfileSetting" slot="main-content">
      <div class="card setting">
        <div class="card-title">Setting</div>
        <div class="card-body">
          <div class="card-column">
            <a href="//identitas.extrainteger.com" class="change-password" target="_blank">
              <i class="icon icon-lock"></i>
              <span class="label">Ubah Sandi</span>
              <i class="icon icon-chevron-right"></i>
            </a>
          </div>
          <div class="card-column">
            <div class="connect">
              <p>Tap di bawah ini untuk mengubungkan Symbolic kamu dengan Twitter</p>
              <button class="btn btn-twitter">
                <icon-twitter/>
                <span>CONNECT WITH TWITTER</span>
              </button>
            </div>
          </div>
          <div class="card-column">
            <div class="connect">
              <p>Connected as:</p>
              <button class="btn btn-facebook">
                <icon-facebook/>John Doe
              </button>
              <div
                onlogin="onClickFBLoginButton"
                class="fb-login-button"
                data-max-rows="1"
                data-size="medium"
                data-button-type="continue_with"
                data-show-faces="true"
                data-auto-logout-link="true"
                data-use-continue-as="true"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <modal-change-password
        v-if="isModalChangePasswordOpen"
        @close-request="() => isModalChangePasswordOpen = false"
      ></modal-change-password>
    </div>
    <template slot="widget-wrapper">
      <div class="d-none d-lg-block">&nbsp;</div>
    </template>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/Timeline'
import ModalChangePassword from '@/pages/Profile/ModalChangePassword'
import { IconTwitter, IconFacebook } from '@/svg/icons'
import * as FBService from '@/services/facebook'
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
      isModalChangePasswordOpen: false,
      // Facebook
      isFbLoaded: false,
      fbName: null,
      fbStatus: null
    }
  },
  async mounted() {
    window.fb = FBService
    window.onClickFBLoginButton = this.onClickFBLoginButton
    window.init = this.init

    FBService.init()
    FB.XFBML.parse()
    FB.Event.subscribe('xfbml.render', () => {
      this.isFbLoaded = true
    })
    this.fbStatus = await FBService.getLoginStatus()
    if (this.fbStatus === 'connected') {
      this.fbName = await FBService.getEmail()
      this.fbAccessToken = FBService.getAccessToken()
    }
  },
  methods: {
    closeModal() {
      console.log('close modal')
      this.isModalChangePasswordOpen = false
    },
    async onClickFBLoginButton(...args) {
      console.log('fb.clicked', ...args)
      const status = await FBService.getLoginStatus()
      if (status === this.fbStatus) return
      this.status = status
    }
  }
}
</script>
