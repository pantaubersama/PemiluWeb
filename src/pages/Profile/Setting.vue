<template>
  <timeline-layout>
    <div class="ProfileSetting" slot="main-content">
      <div class="card setting">
        <div class="card-title">Setting</div>
        <div class="card-body">
          <div class="card-column">
            <button class="change-password"
              @click.stop="isModalChangePasswordOpen = true">
              <i class="icon icon-lock"></i>
              <span class="label">Ubah Sandi</span>
              <i class="icon icon-chevron-right"></i>
            </button>
          </div>
          <div class="card-column">
            Connect sosmed placeholder see
            <code>sass/_card-setting.sass</code>
          </div>
        </div>
      </div>
      <modal-change-password
        v-if="isModalChangePasswordOpen"
        @close-request="() => isModalChangePasswordOpen = false">
      </modal-change-password>
    </div>
    <template slot="widget-wrapper">&nbsp;</template>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/Timeline'
import ModalChangePassword from '@/pages/Profile/ModalChangePassword'

export default {
  name: 'ProfileSetting',
  components: {TimelineLayout, ModalChangePassword},
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
