<template>
  <LayoutTimeline>
    <template slot="main-content">
    <modal-confirm v-if="modal === 'modalConfirm'" v-on:close="closeModal()"/>
      <div class="verified-steps">
        <div class="title">Verifikasi Akun (0/3)</div>
        <div class="thumb">
          <svg version="1.1" id="Layer_1" viewBox="0 0 48 48" style="enable-background:new 0 0 48 48;" xml:space="preserve">
          <path id="Path_1872" class="st0" d="M38.9,24l3.1-4.8l-5.1-2.6l0.3-5.7l-5.7,0.3L28.8,6L24,9.1L19.2,6l-2.6,5.1l-5.7-0.3l0.3,5.7
            L6,19.2L9.1,24L6,28.8l5.1,2.6l-0.3,5.7l5.7-0.3l2.6,5.1l4.8-3.1l4.8,3.1l2.6-5.1l5.7,0.3l-0.3-5.7l5.1-2.6L38.9,24z M21.2,31
            l-6.4-6.4l2.1-2.1l4.2,4.2L31,17l2.1,2.1L21.2,31z"/>
          </svg>
        </div>
        <div class="text">
          <h3>Kenapa Akunmu Perlu Diverifikasi?</h3>
          <p>Dengan diverifikasi kamu akan….<br>Mendapatkan manfaat dan is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <label >Masukkan No Identitas KTP</label>
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
          <img src="@/assets/selfie-idcard-1.png" alt="">
          <img src="@/assets/selfie-idcard-2.png" alt="">
        </div>
        <div class="upload-img">
          <input type="file" name="pic" accept="image/*">
          <div class="upload-placeholder">
            <svg version="1.1" id="outline-image-72px" viewBox="0 0 36 36" style="enable-background:new 0 0 36 36;" xml:space="preserve">
            <path id="Path_680" class="st0" d="M28.5,7.5v21h-21v-21H28.5 M28.5,4.5h-21c-1.7,0-3,1.3-3,3v21c0,1.7,1.3,3,3,3h21
              c1.7,0,3-1.3,3-3v-21C31.5,5.8,30.2,4.5,28.5,4.5z M21.2,17.8l-4.5,5.8l-3.2-3.9L9,25.5h18L21.2,17.8z"/>
            </svg>
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
          <img src="@/assets/ktp-1.png" alt="">
          <img src="@/assets/ktp-2.png" alt="">
        </div>
        <div class="upload-img">
          <input type="file" name="pic" accept="image/*">
          <div class="upload-placeholder">
            <svg version="1.1" id="outline-image-72px" viewBox="0 0 36 36" style="enable-background:new 0 0 36 36;" xml:space="preserve">
            <path id="Path_680" class="st0" d="M28.5,7.5v21h-21v-21H28.5 M28.5,4.5h-21c-1.7,0-3,1.3-3,3v21c0,1.7,1.3,3,3,3h21
              c1.7,0,3-1.3,3-3v-21C31.5,5.8,30.2,4.5,28.5,4.5z M21.2,17.8l-4.5,5.8l-3.2-3.9L9,25.5h18L21.2,17.8z"/>
            </svg>
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
            <svg version="1.1" id="outline-image-72px" viewBox="0 0 36 36" style="enable-background:new 0 0 36 36;" xml:space="preserve">
            <path id="Path_680" class="st0" d="M28.5,7.5v21h-21v-21H28.5 M28.5,4.5h-21c-1.7,0-3,1.3-3,3v21c0,1.7,1.3,3,3,3h21
              c1.7,0,3-1.3,3-3v-21C31.5,5.8,30.2,4.5,28.5,4.5z M21.2,17.8l-4.5,5.8l-3.2-3.9L9,25.5h18L21.2,17.8z"/>
            </svg>
            <p>Upload Gambar</p>
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-block btn-submit" @click.prevent="modalConfirm()"> Submit</button>
    </template>
    <template slot="widget-wrapper">
      &nbsp;
    </template>
  </LayoutTimeline>
</template>

<script>
import lottie from 'lottie-web'
import LayoutTimeline from '@/layout/Timeline'
import ModalConfirm from '@/pages/Profile/ModalConfirm'
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
    ModalConfirm
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
    modalConfirm () {
      this.modal = 'modalConfirm'
    },
    closeModal(){
      this.modal = false
    }
  },
  destroyed() {
    this.selfieLottie.destroy()
    this.idCardLottie.destroy()
  },

}
</script>
