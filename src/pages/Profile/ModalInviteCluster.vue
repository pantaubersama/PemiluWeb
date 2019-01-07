<template>
  <modal @close-request="() => $emit('close-request')" class="modal-invite-cluster">
    <template slot="modal-content">
      <button class="close-btn" @click="$emit('close-request')">
        <i class="icon icon-close"></i>
      </button>
      <div class="card email-panel">
        <h3 class="title">Bagikan Undangan Lewat Email</h3>
        <input type="email" name="email" placeholder="Masukkan email di sini" id="email">
        <input type="submit" value="Undang" class="submit-email">
      </div>
      <div class="card link-panel">
        <div class="panel-header">
          Link di bawah ini dapat digunakan untuk menambah anggota secara otomatis
          apabila di-klik oleh penerima.
          <br>Kamu bisa non-aktifkan link undangan sewaktu-waktu.
        </div>
        <h3 class="title">Bagikan Undangan Lewat Link</h3>
        <div class="input-container">
          <i class="icon icon-link"></i>
          <input
            type="text"
            value="https://xd.adobe.com/view/91d02c33-58cd-442c- 7d01 -900a7724345b-e7e1/?fullscreen"
            readonly="readonly"
          >
        </div>
        <div class="enable-link-container">
          <input type="checkbox" name="enable-link">
          <label for="enable-link">Non aktifkan link undangan</label>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/layout/Modal'
import { IconAvatar } from '@/svg/icons'
export default {
  name: 'ModalChangePassword',
  components: { Modal, IconAvatar },
  props: ['name', 'category', 'description'],
  methods: {
    submit(event) {
      const name = event.target['name'].value
      const category = event.target['category'].value
      const description = event.target['description'].value
      this.$emit('submit', {
        name: name,
        category: category,
        description: description
      })
    }
  }
}
</script>
