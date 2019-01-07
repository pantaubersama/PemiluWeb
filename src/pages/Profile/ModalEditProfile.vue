<template>
  <modal class="modal-edit-profile">
    <template slot="modal-content">
      <!-- <div class="modal-header"> -->
      <div class="close-icon" @click="$emit('close')">
        <close-icon/>
        <!-- </div> -->
      </div>
      <form @submit.prevent="submit($event)">
        <div class="card avatar">
          <div class="user-profile">
            <img class="profile-thumb" src="@/assets/trump.jpg">
          </div>
          <button class="add-image">Ganti Gambar</button>
        </div>
        <div class="card">
          <div class="card-column">
            <label for="name">Nama</label>
            <input type="text" id="name" name="name" value="Jelo Caviar">
          </div>
          <div class="card-column">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" value="@jelocaviar">
          </div>
          <div class="card-column">
            <label for="description">Deskripsi Tentang Kamu</label>
            <input
              type="text"
              id="description"
              name="description"
              value="An ordinary netizen who likes to talk a lot. Like, a lot."
            >
          </div>
          <div class="card-column">
            <label for="lokasi">Lokasi</label>
            <input type="text" id="lokasi" name="lokasi" value="Bandung">
          </div>
          <div class="card-column">
            <label for="pendidikan">Pendidikan</label>
            <input type="text" id="pendidikan" name="pendidikan" value="Bandung">
          </div>
          <div class="card-column">
            <label for="pekerjaan">Pekerjaan</label>
            <input type="text" id="pekerjaan" name="pekerjaan" value="Petani">
          </div>
        </div>
        <input type="submit" value="Simpan" class="btn btn-outline">
      </form>
    </template>
  </modal>
</template>

<script>
import Modal from '@/layout/Modal'
import { CloseIcon } from '@/svg/icons'
export default {
  name: 'ModalEditProfile',
  components: { Modal, CloseIcon },
  methods: {
    submit(event) {
      this.$emit('close')
    }
  }
}
</script>
