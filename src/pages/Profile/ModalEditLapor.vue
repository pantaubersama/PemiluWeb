<template>
  <modal-layout>
    <div slot="modal-content" class="modal-edit-lapor">
      <div class="close-icon" @click="$emit('close')">
        <close-icon/>
      </div>
      <div class="title">Ubah Data Lapor</div>
      <div
        class="data-desc"
      >Data ini digunakan untuk salah satu syarat dalam kontribusi melakukan Laporan dugaan pelanggaran pemilu di Pantau Bersama. Menggunakan format sesuai ketentuan Bawaslu. Data ini tidak akan muncul di profile pengguna.</div>
      <div class="card-column">
        <label for="ktp">No KTP/SIM/Pasport</label>
        <input type="text" id="ktp" name="ktp" value="1263 1181 172672">
      </div>
      <div class="card-column">
        <label for="tempat">Tempat Lahir</label>
        <input type="text" id="tempat" name="tempat" value="Yogyakarta">
      </div>
      <div class="card-column">
        <label for="tanggal-lahir">Tanggal Lahir</label>
        <input type="text" id="tanggal-lahir" name="tanggal-lahir" value="11/12/1995">
      </div>
      <div class="card-column">
        <label for="jenis-kelamin">Jenis Kelamin</label>
        <input type="text" id="jenis-kelamin" name="jenis-kelamin" value="Laki-Laki">
      </div>
      <div class="card-column">
        <label for="pekerjaan">Pekerjaan</label>
        <input type="text" id="pekerjaan" name="pekerjaan" value="PNS">
      </div>
      <div class="card-column">
        <label for="kewarganegaraan">Kewarganegaraan</label>
        <input type="text" id="kewarganegaraan" name="kewarganegaraan" value="Indonesia">
      </div>
      <div class="card-column">
        <label for="alamat">Alamat</label>
        <input type="text" id="alamat" name="alamat" value="Jalan Viva La Vida no.30">
      </div>
      <div class="card-column">
        <label for="telephone">No Telp/Hp</label>
        <input type="text" id="telephone" name="telephone" value="088842366888">
      </div>
      <div class="button-submit">
        <button class="btn btn-outline-primary" @click.prevent="$emit('close')">Simpan</button>
      </div>
    </div>
  </modal-layout>
</template>

<script>
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
  }
}
</script>
