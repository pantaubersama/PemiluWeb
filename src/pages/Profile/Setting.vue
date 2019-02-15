<template>
  <LayoutTimeline>
    <div class="profile-setting" slot="main-content">
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
              <button v-if="!isFbLoaded" class="btn btn-facebook">
                <i class="icon icon-facebook"></i> Loading facebook
              </button>
              <button
                v-if="isFbLoaded && fbStatus === 'connected'"
                class="btn btn-facebook"
                @click.prevent="logout()"
              >
                <i class="icon icon-facebook"></i>
                {{fbName}}
              </button>
              <button v-else-if="isFbLoaded" class="btn btn-facebook" @click.prevent="login()">
                <i class="icon icon-facebook"></i> Connect to facebook
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
    <template slot="widget-wrapper">
      <div class="d-none d-lg-block">&nbsp;</div>
    </template>
  </LayoutTimeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import ModalChangePassword from '@/pages/Profile/ModalChangePassword'
import { IconTwitter, IconFacebook } from '@/svg/icons'
import * as FBService from '@/services/facebook'
import * as ProfileAPI from '@/services/api/profile'
export default {
  name: 'ProfileSetting',
  components: {
   LayoutTimeline ,
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
      fbStatus: null,
      fbAccessToken: -1
    }
  },
  async mounted() {
    window.fb = FBService

    FBService.init()
    FB.Event.subscribe('auth.statusChange', async resp => {
      this.isFbLoaded = true
      this.fbStatus = resp.status
      if (resp.status === 'connected') {
        this.fbName = await FBService.getEmail()
        this.fbAccessToken = await FBService.getAccessToken()
      } else if (resp.status === 'unknown') {
        this.fbAccessToken = -1
      } else {
        this.fbAccessToken = null
      }
    })
    this.fbStatus = await FBService.getLoginStatus()
    if (this.fbStatus === 'connected') {
      this.fbName = await FBService.getEmail()
      this.fbAccessToken = await FBService.getAccessToken()
    }
  },
  watch: {
    fbAccessToken: {
      immediate: true,
      handler(token) {
        if (token == -1) return
        if (token == null) return ProfileAPI.disconnectAccount('facebook')
        return ProfileAPI.connectAccount('facebook', token)
      }
    }
  },
  methods: {
    closeModal() {
      this.isModalChangePasswordOpen = false
    },
    login() {
      FBService.login()
    },
    logout() {
      FBService.logout()
    }
  }
}
</script>

<style lang="sass" scoped>
.icon.icon-facebook
  background-color: white
  -webkit-mask: url(~@/assets/facebook-square.svg)
  -webkit-mask-position: center
  -webkit-mask-repeat: no-repeat
  -webkit-mask-size: 23px
  height: 30px

.btn.btn-facebook
  background: #465894
  color: white
  padding: 5px 10px
  font-family: Lato
  text-indent: 15px


</style>
