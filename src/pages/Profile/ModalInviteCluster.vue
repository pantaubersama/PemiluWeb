<template>
  <modal @close-request="() => $emit('close-request')" class="modal-invite-cluster">
    <template slot="modal-content">
      <button class="close-btn" @click="$emit('close-request')">
        <i class="icon icon-close"></i>
      </button>
      <div class="card email-panel">
        <h3 class="title">Bagikan Undangan Lewat Email</h3>
        <vue-tags-input
          element-id="email"
          placeholder="Masukkan email di sini"
          v-model="email"
          :emails="emails"
          name="emails"
          v-validate="'email'"
          :class="{'input': true, 'is-danger': errors.has('emails') }"
          data-vv-validate-on="blur|input"
          :add-on-key="[13,',']"
          @tags-changed="newTags => emails = newTags"
        ></vue-tags-input>
        <small>Multiple value, don't forget to press enter for each email</small>
        <span v-show="errors.has('emails')" class="help is-danger">{{ errors.first('emails') }}</span>
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
          <i class="icon icon-link"></i>
          <input
            type="text"
            :value="magicLinkURL"
            ref="inputMagicLink"
            @focus.prevent="onFocusMagicLink($event)"
            v-if="cluster.is_link_active == true"
          >
          <input
            type="text"
            :value="magicLinkURL"
            readonly="readonly"
            ref="inputMagicLink"
            tabindex="-1"
            v-else
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
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  name: 'ModalInviteCluster',
  components: { Modal, IconAvatar, VueTagsInput },
  data() {
    return {
      email:'',
      emails: [],
      isInviting: false,
      inviteLabel: 'Undang'
    }
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
      this.$toaster.info('Berhasil menyalin teks.')
    },
    invite() {
      const clusterId = this.cluster.id
      const emails = this.emails.map(a => a.text).join()
      this.isInviting = true
      this.inviteLabel = 'Mengundang'
      return ProfileAPI.inviteToCluster(clusterId, emails).then(data => {
        this.isInviting = false
        this.inviteLabel = 'Terundang'
        this.$toaster.info('Berhasil mengirimkan undangan.')
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
.email-panel /deep/ .vue-tags-input
  width: 100%
  max-width: none
.email-panel /deep/ .vue-tags-input .ti-tag
  background-color: #bd081c
.email-panel small
  color: #666
  margin-left: 2px
  font-size: 7pt
  margin-top: 5px
.help.is-danger
  position: relative
  left: 2px
  top: auto

</style>
