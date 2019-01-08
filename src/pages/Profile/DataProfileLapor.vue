<template>
  <LayoutTimeline>
    <template slot="main-content">
      <modal-edit-lapor
        v-if="modal === 'modalEditLapor' || this.$route.query.post == 'edit-lapor'"
        v-on:close="closeModal()"
      />
      <div class="data-lapor">
        <a href class="edit-icon" @click.prevent="modalEditLapor()">
          <pencil-icon/>
        </a>
        <div class="title">Data Lapor</div>
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
      </div>
    </template>
    <template slot="widget-wrapper">&nbsp;</template>
  </LayoutTimeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import { PencilIcon } from '@/svg/icons'
import ModalEditLapor from '@/pages/Profile/ModalEditLapor'
export default {
  name: 'DataProfileLapor',
  components: {
    LayoutTimeline,
    PencilIcon,
    ModalEditLapor
  },
  data() {
    return {
      modal: false
    }
  },
  methods: {
    modalEditLapor() {
      this.$router.replace({
        query: { post: 'edit-lapor' }
      })
      this.modal = 'modalEditLapor'
    },
    closeModal() {
      this.$router.replace({})
      this.modal = false
    }
  }
}
</script>
