<template>
  <LayoutTimeline>
    <template slot="main-content">
      <modal-confirm v-if="modal === 'modalConfirm'" v-on:close="closeModal()"/>
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
          <input type="text" class="form-group">
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
          <input type="file" name="pic" accept="image/*">
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
          <input type="file" name="pic" accept="image/*">
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
          <input type="file" name="pic" accept="image/*">
          <div class="upload-placeholder">
            <image-default/>
            <p>Upload Gambar</p>
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-block btn-submit" @click.prevent="modalConfirm()">Submit</button>
    </template>
    <template slot="widget-wrapper">&nbsp;</template>
  </LayoutTimeline>
</template>

<script>
import lottie from 'lottie-web'
import LayoutTimeline from '@/layout/Timeline'
import ModalConfirm from '@/pages/Profile/ModalConfirm'
import { VerifiedIconDefault, ImageDefault } from '@/svg/icons'
export default {
  name: 'ProfileVerified',
  data() {
    return {
      selfieLottie: null,
      idCardLottie: null,
      uploadLottie: null,
      modal: false
    }
  },
  components: {
    LayoutTimeline,
    ModalConfirm,
    VerifiedIconDefault,
    ImageDefault
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
    modalConfirm() {
      this.modal = 'modalConfirm'
    },
    closeModal() {
      this.modal = false
    }
  },
  destroyed() {
    this.selfieLottie.destroy()
    this.idCardLottie.destroy()
    this.uploadLottie.destroy()
  }
}
</script>
