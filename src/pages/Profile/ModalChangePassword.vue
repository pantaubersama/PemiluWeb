<template>
  <modal @close-request="() => $emit('close-request')" class="ModalChangePassword">
    <template slot="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Ubah Password</h3>
        <button @click="$emit('close-request')">
          <i class="icon icon-close"></i>
        </button>
      </div>
      <div class="modal-content">
        <form @submit.prevent="submit($event)">
          <div class="card">
            <div class="card-column">
              <label for="old-password">Masukkan Password Lama</label>
              <input type="password" id="old-password" name="old-password">
            </div>
            <div class="card-column">
              <label for="new-password">Password Baru</label>
              <input type="password" id="new-password" name="new-password">
            </div>
            <div class="card-column">
              <label for="new-password-confirmation">Konfirmasi Password Baru</label>
              <input
                type="password"
                id="new-password-confirmation"
                name="new-password-confirmation"
              >
            </div>
          </div>
          <input type="submit" value="Simpan" class="btn btn-outline">
        </form>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/layout/Modal'
export default {
  name: 'ModalChangePassword',
  components: { Modal },
  methods: {
    submit(event) {
      const oldPassword = event.target['old-password'].value
      const newPassword = event.target['new-password'].value
      const newPasswordConfirmation =
        event.target['new-password-confirmation'].value
      this.$emit('submit', {
        oldPassword,
        newPassword,
        newPasswordConfirmation
      })
    }
  }
}
</script>
