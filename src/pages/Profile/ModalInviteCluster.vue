<template>
  <modal @close-request="() => $emit('close-request')" class="modal-invite-cluster">
    <template slot="modal-content">
      <button class="close-btn" @click="$emit('close-request')">
        <i class="icon icon-close"></i>
      </button>
      <div class="card email-panel">
        <h3 class="title">Bagikan Undangan Lewat Email</h3>
        <!-- <input type="email" name="email" placeholder="Masukkan email di sini" id="email"> -->
        <tags-input
          element-id="email"
          placeholder="Masukkan email disini"
          :add-tags-on-comma="true"
          :validate="validateEmail"
          v-model="emails"
        ></tags-input>
        <small>Multiple value, don't forget to press enter for each email</small>
        <input
          type="submit"
          :disabled="isInviting"
          :value="inviteLabel"
          class="submit-email"
          @click="invite()"
        >
      </div>
      <div class="card link-panel">
        <div class="panel-header">
          Link di bawah ini dapat digunakan untuk menambah anggota secara otomatis
          apabila di-klik oleh penerima.
          Kamu bisa non-aktifkan link undangan sewaktu-waktu.
        </div>
        <h3 class="title">Bagikan Undangan Lewat Link</h3>
        <div class="input-container">
          {{magicLinkURL}}
          <i class="icon icon-link"></i>
          <input
            type="text"
            :value="magicLinkURL"
            readonly="readonly"
            ref="inputMagicLink"
            @click="() => $refs.inputMagicLink.select()"
            @focus="onFocusMagicLink($event)"
          >
        </div>
        <div class="enable-link-container">
          <input type="checkbox" name="enable-link" :checked="cluster.is_link_active">
          <label for="enable-link" @click.prevent="toggleLinkActiveState()">Aktifkan link undangan</label>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/layout/Modal'
import { IconAvatar } from '@/svg/icons'
import * as ProfileAPI from '@/services/api/profile'
import { mapState } from 'vuex'

const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export default {
  name: 'ModalInviteCluster',
  components: { Modal, IconAvatar },
  props: ['name', 'category', 'description'],
  data() {
    return { emails: [], isInviting: false, inviteLabel: 'Undang' }
  },
  computed: {
    ...mapState({
      cluster: s => s.profile.user.cluster
    }),
    magicLinkURL() {
      const magicLink = this.cluster.magic_link
      return `${window.location.origin}/joincluster/${magicLink}`
    }
  },
  methods: {
    validateEmail(text) {
      return reEmail.test(text)
    },
    toggleLinkActiveState() {
      // POST /v1/clusters/{id}/magic_link
      const clusterId = this.cluster.id
      const enabled = this.cluster.is_link_active
      this.$store.dispatch('profile/enableMagicLink', {
        clusterId,
        enabled: !enabled
      })
    },
    onFocusMagicLink(event) {
      const input = this.$refs.inputMagicLink
      input.select()
      input.setSelectionRange(0, input.value.length)
      this.$clipboard(event.target.value)
    },
    invite() {
      const clusterId = this.cluster.id
      const emails = this.emails
      this.isInviting = true
      this.inviteLabel = 'Mengundang'
      return ProfileAPI.inviteToCluster(clusterId, emails).then(data => {
        this.isInviting = false
        this.inviteLabel = 'Terundang'
        window.setTimeout(() => {
          this.inviteLabel = 'Undang'
          this.emails = []
        }, 1500)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.email-panel /deep/ .tags-input-wrapper-default
  border: .5px solid #ececec
.email-panel /deep/ .tags-input input[type=text]
  margin-left: 15px
.email-panel small
  color: #666
  margin-left: 2px
  font-size: 7pt
  margin-top: 5px
</style>
