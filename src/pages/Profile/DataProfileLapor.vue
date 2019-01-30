<template>
  <div class="profile-page">
    <LayoutTimeline>
      <template slot="main-content">
        <modal-edit-lapor
          v-if="modal === 'modalEditLapor' || this.$route.query.post == 'edit-lapor'"
          @close="closeModal()"
        />
        <div class="data-lapor">
          <a href class="edit-icon" @click.prevent="modalEditLapor()">
            <pencil-icon/>
          </a>
          <div class="title">Data Lapor</div>
          <div class="data-desc">
            Data ini digunakan untuk salah satu syarat dalam kontribusi melakukan Laporan
            dugaan pelanggaran pemilu di Pantau Bersama. Menggunakan format sesuai ketentuan
            Bawaslu. Data ini tidak akan muncul di profile pengguna.
          </div>
          <div class="card-column">
            <label for="ktp">No KTP/SIM/Pasport</label>
            <input type="text" id="ktp" name="ktp" :value="informant.identity_number" readonly>
          </div>
          <div class="card-column">
            <label for="tempat">Tempat Lahir</label>
            <input type="text" id="tempat" name="tempat" :value="informant.pob" readonly>
          </div>
          <div class="card-column">
            <label for="tanggal-lahir">Tanggal Lahir</label>
            <input
              type="text"
              id="tanggal-lahir"
              name="tanggal-lahir"
              :value="informant.dob"
              readonly
            >
          </div>
          <div class="card-column">
            <label for="jenis-kelamin">Jenis Kelamin</label>
            <input
              type="text"
              id="jenis-kelamin"
              name="jenis-kelamin"
              :value="informantGender"
              readonly
            >
          </div>
          <div class="card-column">
            <label for="pekerjaan">Pekerjaan</label>
            <input
              type="text"
              id="pekerjaan"
              name="pekerjaan"
              :value="informant.occupation"
              readonly
            >
          </div>
          <div class="card-column">
            <label for="kewarganegaraan">Kewarganegaraan</label>
            <input
              type="text"
              id="kewarganegaraan"
              name="kewarganegaraan"
              :value="informant.nationality"
              readonly
            >
          </div>
          <div class="card-column">
            <label for="alamat">Alamat</label>
            <input type="text" id="alamat" name="alamat" :value="informant.address" readonly>
          </div>
          <div class="card-column">
            <label for="telephone">No Telp/Hp</label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              :value="informant.phone_number"
              readonly
            >
          </div>
        </div>
      </template>
      <template slot="widget-wrapper">
        <div class="d-none d-lg-block">&nbsp;</div>
      </template>
    </LayoutTimeline>
  </div>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import { PencilIcon } from '@/svg/icons'
import ModalEditLapor from '@/pages/Profile/ModalEditLapor'
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      informant: s => s.profile.user.informant
    }),
    informantGender() {
      switch (this.informant.gender) {
        case 0:
          return 'Perempuan'
        case 1:
          return 'Laki-laki'
        default:
          return ''
      }
    }
  },
  mounted() {
    this.$store.dispatch('profile/getMe')
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
