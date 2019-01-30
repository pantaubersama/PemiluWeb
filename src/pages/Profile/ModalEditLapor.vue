<template>
  <modal-layout>
    <div slot="modal-content" class="modal-edit-lapor">
      <div class="close-icon" @click="$emit('close')">
        <close-icon/>
      </div>
      <div class="title">Ubah Data Lapor</div>
      <div class="data-desc">
        Data ini digunakan untuk salah satu syarat dalam kontribusi melakukan
        Laporan dugaan pelanggaran pemilu di Pantau Bersama. Menggunakan format sesuai
        ketentuan Bawaslu. Data ini tidak akan muncul di profile pengguna.
      </div>
      <form @submit.prevent="submit($event)">
        <div class="card-column">
          <label for="ktp">No KTP/SIM/Pasport</label>
          <input
            type="text"
            id="ktp"
            name="ktp"
            placeholder="1263 1181 172672"
            :value="informant.identity_number"
          >
        </div>
        <div class="card-column">
          <label for="tempat">Tempat Lahir</label>
          <input
            type="text"
            id="tempat"
            name="tempat"
            placeholder="Yogyakarta"
            :value="informant.pob"
          >
        </div>
        <div class="card-column">
          <label for="tanggal-lahir">Tanggal Lahir</label>
          <input
            type="text"
            id="tanggal-lahir"
            name="tanggal-lahir"
            placeholder="11/12/1995"
            :value="informant.dob"
          >
        </div>
        <div class="card-column">
          <label for="jenis-kelamin">Jenis Kelamin</label>
          <select id="jenis-kelamin" name="jenis-kelamin" :value="informant.gender">
            <option value="0" selected>Perempuan</option>
            <option value="1">Laki-laki</option>
          </select>
        </div>
        <div class="card-column">
          <label for="pekerjaan">Pekerjaan</label>
          <input
            type="text"
            id="pekerjaan"
            name="pekerjaan"
            placeholder="PNS"
            :value="informant.occupation"
          >
        </div>
        <div class="card-column">
          <label for="kewarganegaraan">Kewarganegaraan</label>
          <input
            type="text"
            id="kewarganegaraan"
            name="kewarganegaraan"
            placeholder="Indonesia"
            :value="informant.nationality"
          >
        </div>
        <div class="card-column">
          <label for="alamat">Alamat</label>
          <input
            type="text"
            id="alamat"
            name="alamat"
            placeholder="Jalan Viva La Vida no.30"
            :value="informant.address"
          >
        </div>
        <div class="card-column">
          <label for="telephone">No Telp/Hp</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            placeholder="088842366888"
            :value="informant.phone_number"
          >
        </div>
        <div class="button-submit">
          <input type="submit" class="btn btn-outline-primary" value="Simpan">
        </div>
      </form>
    </div>
  </modal-layout>
</template>

<script>
import { mapState } from 'vuex'
import ModalLayout from '@/layout/Modal'
import { CloseIcon } from '@/svg/icons'

export default {
  name: 'ModalEditLapor',
  components: {
    ModalLayout,
    CloseIcon
  },
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  },
  computed: {
    ...mapState({
      user: s => s.profile.user,
      informant: s => s.profile.user.informant
    })
  },
  methods: {
    submit(event) {
      const identityNumber = event.target['ktp'].value
      const pob = event.target['tempat'].value
      const dob = event.target['tanggal-lahir'].value
      const gender = event.target['jenis-kelamin'].value
      const occupation = event.target['pekerjaan'].value
      const nationality = event.target['kewarganegaraan'].value
      const address = event.target['alamat'].value
      const phoneNumber = event.target['telephone'].value
      return this.$store
        .dispatch('profile/updateInformant', {
          user_id: this.user.id,
          identity_number: identityNumber,
          phone_number: phoneNumber,
          pob,
          dob,
          gender,
          occupation,
          nationality,
          address
        })
        .then(() => {
          this.$emit('close')
          this.$store.dispatch('homeKenalan/updateKenalan', {
            id: 'c3fded37-5b4b-4a81-aee7-ee24d845b5e8'
          })
        })
    }
  }
}
</script>
