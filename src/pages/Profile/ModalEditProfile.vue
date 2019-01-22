<template>
  <modal class="modal-edit-profile">
    <template slot="modal-content">
      <div class="close-icon" @click="$emit('close')">
        <close-icon/>
      </div>
      <form @submit.prevent="submit($event)">
        <div class="card avatar">
          <div class="user-profile">
            <img v-if="avatarURL != null" class="profile-thumb" :src="avatarURL">
            <img v-else class="profile-thumb" src="~@/assets/user.svg">
          </div>
          <button
            class="add-image"
            type="button"
            @click.stop="() => $refs.inputAvatar.click()"
          >Ganti Gambar</button>
          <input
            id="avatar"
            name="avatar"
            ref="inputAvatar"
            type="file"
            accept="image/*"
            style="display:none"
            @change="inputAvatarChanged($event)"
          >
        </div>
        <div class="card">
          <div class="card-column">
            <label for="name">Nama</label>
            <input type="text" id="name" name="name" :value="user.full_name">
          </div>
          <div class="card-column">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" :value="user.username">
          </div>
          <div class="card-column">
            <label for="description">Deskripsi Tentang Kamu</label>
            <input type="text" id="description" name="description" :value="user.about">
          </div>
          <div class="card-column">
            <label for="lokasi">Lokasi</label>
            <input type="text" id="lokasi" name="lokasi" :value="user.location">
          </div>
          <div class="card-column">
            <label for="pendidikan">Pendidikan</label>
            <input type="text" id="pendidikan" name="pendidikan" :value="user.education">
          </div>
          <div class="card-column">
            <label for="pekerjaan">Pekerjaan</label>
            <input type="text" id="pekerjaan" name="pekerjaan" :value="user.occupation">
          </div>
        </div>
        <input type="submit" :value="buttonSaveLabel" class="btn btn-outline">
      </form>
    </template>
  </modal>
</template>

<script>
import Modal from '@/layout/Modal'
import { CloseIcon } from '@/svg/icons'
export default {
  name: 'ModalEditProfile',
  props: ['user'],
  components: { Modal, CloseIcon },
  data() {
    return {
      avatarURL: this.user.avatar.medium.url
    }
  },
  computed: {
    buttonSaveLabel() {
      if (this.$route.query.hasOwnProperty('edit-profile')) return 'Lanjut'
      return 'Simpan'
    }
  },
  methods: {
    submit(event) {
      const avatar = Array.from(event.target['avatar'].files).pop()
      const name = event.target['name'].value.trim()
      const username = event.target['username'].value.trim()
      const description = event.target['description'].value
      const location = event.target['lokasi'].value
      const pendidikan = event.target['pendidikan'].value
      const pekerjaan = event.target['pekerjaan'].value
      this.$emit('submit', {
        avatarFile: avatar,
        full_name: name,
        username,
        description,
        location,
        education: pendidikan,
        occupation: pekerjaan
      })
    },
    inputAvatarChanged(event) {
      const file = Array.from(event.target.files).pop()
      if (this.avatarURL != null) {
        URL.revokeObjectURL(this.avatarURL)
      }
      const url = URL.createObjectURL(file)
      this.avatarURL = url
    }
  }
}
</script>
