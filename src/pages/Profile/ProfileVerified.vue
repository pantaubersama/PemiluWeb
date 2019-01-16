<template>
  <div class="profile-page">
    <LayoutTimeline>
      <template slot="main-content">
        <div class="verified-steps">
          <div class="title">Verifikasi Akun (0/3)</div>
          <div class="thumb">
            <verified-icon-default/>
          </div>
          <div class="text">
            <h3>Kenapa Akunmu Perlu Diverifikasi?</h3>
            <p>Dengan diverifikasi kamu akan….
              <br>Mendapatkan manfaat dan is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <label>Masukkan No Identitas KTP</label>
            <input type="text" class="form-group" v-model="inputKTPNumber">
          </div>
        </div>
        <div class="verified-steps">
          <div class="title">Verifikasi Akun (1/3)</div>
          <div class="thumb">
            <div class="selfie-idcard lottie-card" ref="selfieIdcard"></div>
          </div>
          <div class="text">
            <h4>Foto Diri Bersama Dengan KTP</h4>
            <p>Pastikan seluruh bagian wajah dari KTP anda gerada dalam bingkai foto dan terlihat jelas. Pastikan foto yang anda kirim adalar foto asli tanpa editan</p>
          </div>
          <div class="img-sample">
            <img src="@/assets/selfie-idcard-1.png" alt>
            <img src="@/assets/selfie-idcard-2.png" alt>
          </div>
          <div class="upload-img">
            <img :src="inputSelfieURL" class="input-placeholder">
            <input
              type="file"
              name="pic"
              accept="image/*"
              @change="inputChange('inputSelfie', $event)"
            >
            <div class="upload-placeholder">
              <image-default/>
              <p>Upload Gambar</p>
            </div>
          </div>
        </div>
        <div class="verified-steps">
          <div class="title">Verifikasi Akun (2/3)</div>
          <div class="thumb">
            <div class="idcard lottie-card" ref="idCard"></div>
          </div>
          <div class="text">
            <h4>Foto KTP</h4>
            <p>Pastikan seluruh bagian KTP anda breada dalam bingkai foto ( KTP asli dan bukan fotokopi KTP)</p>
          </div>
          <div class="img-sample">
            <img src="@/assets/ktp-1.png" alt>
            <img src="@/assets/ktp-2.png" alt>
          </div>
          <div class="upload-img">
            <img :src="inputKTPURL" class="input-placeholder">
            <input
              type="file"
              name="pic"
              accept="image/*"
              @change="inputChange('inputKTP', $event)"
            >
            <div class="upload-placeholder">
              <image-default/>
              <p>Upload Gambar</p>
            </div>
          </div>
        </div>
        <div class="verified-steps">
          <div class="title">Verifikasi Akun (3/3)</div>
          <div class="thumb">
            <div class="upload-ttd lottie-card" ref="uploadTtd"></div>
          </div>
          <div class="text">
            <h4>Foto Tanda Tangan</h4>
            <p>Yakk, langkah terakhir foto tanda tanganmu diatas kertas putih dengan kameramu</p>
          </div>
          <div class="upload-img">
            <img :src="inputSignatureURL" class="input-placeholder">
            <input
              type="file"
              name="pic"
              accept="image/*"
              @change="inputChange('inputSignature', $event)"
            >
            <div class="upload-placeholder">
              <image-default/>
              <p>Upload Gambar</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-primary btn-block btn-submit"
          @click.prevent="() => modal = 'ModalConfirm'"
        >Submit</button>

        <modal-confirm
          v-if="modal === 'ModalConfirm'"
          @close="closeModal()"
          @confirm="confirmSubmit()"
        ></modal-confirm>
        <modal-toast v-if="modal === 'ModalToast'" @close="closeModal()"></modal-toast>
      </template>
      <template slot="widget-wrapper">
        <div class="d-none d-lg-block">&nbsp;</div>
      </template>
    </LayoutTimeline>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import LayoutTimeline from '@/layout/Timeline'
import ModalConfirm from '@/pages/Profile/ModalConfirm'
import ModalToast from '@/pages/Profile/ModalToast'
import { VerifiedIconDefault, ImageDefault } from '@/svg/icons'
export default {
  name: 'ProfileVerified',
  components: {
    LayoutTimeline,
    ModalConfirm,
    ModalToast,
    VerifiedIconDefault,
    ImageDefault
  },
  data() {
    return {
      selfieLottie: null,
      idCardLottie: null,
      uploadLottie: null,
      modal: false,
      inputKTPNumber: null,
      inputSelfieURL: null,
      inputSelfieFile: null,
      inputKTPURL: null,
      inputKTPFile: null,
      inputSignatureURL: null,
      inputSignatureFile: null
    }
  },
  mounted() {
    this.selfieLottie = lottie.loadAnimation({
      container: this.$refs.selfieIdcard,
      path: '/lottie/selfie-id-card.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
    this.idCardLottie = lottie.loadAnimation({
      container: this.$refs.idCard,
      path: '/lottie/memfoto-idcard.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
    this.uploadLottie = lottie.loadAnimation({
      container: this.$refs.uploadTtd,
      path: '/lottie/upload-ttd.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
  },
  methods: {
    confirmSubmit() {
      this.$store
        .dispatch('profile/verify', {
          signature: this.inputSignatureFile,
          ktp_photo: this.inputKTPFile,
          ktp_selfie: this.inputSelfieFile,
          ktp_number: this.inputKTPNumber
        })
        .then(() => {
          showToast()
        })
    },
    showToast() {
      this.modal = 'ModalToast'
      const timeoutId = window.setTimeout(() => {
        this.modal = false
        window.clearTimeout(timeoutId)
      }, 1000)
    },
    closeModal() {
      this.modal = false
    },
    inputChange(type, event) {
      const file = Array.from(event.target.files).pop()
      if (this[`${type}URL`] != null) URL.revokeObjectURL(this[`${type}URL`])
      this[`${type}URL`] = URL.createObjectURL(file)
      this[`${type}File`] = file
    }
  },
  destroyed() {
    this.selfieLottie.destroy()
    this.idCardLottie.destroy()
    this.uploadLottie.destroy()
  }
}
</script>

<style lang="sass" scoped>
.input-placeholder
  position: absolute
  height: 100%
  width: 100%
  object-fit: cover
  opacity: 0.2
</style>
