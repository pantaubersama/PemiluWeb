<template>
  <div class="profile-page">
    <LayoutTimeline>
      <template slot="main-content">

        <div v-if="this.$route.query.steps == 1">

          <div class="verified-steps" >
            <div class="title">Verifikasi Akun (0/3)</div>
            <div class="thumb">
              <verified-icon-default/>
            </div>
            <div class="text">
              <h3>Kenapa Akunmu Perlu Diverifikasi?</h3>
              <p>
                Apabila akun kamu telah terverifikasi, badge centang hijau akan terpasang di profile. Ini menunjukkan informasi yang kamu bagikan sudah sesuai antara identitas online dan offline.
                Selain itu, poin-poin interaksi akun yang telah terverifikasi akan terarsip rapi dalam Symbolic id.
              </p>
              <label>Masukkan Nomor Induk Kependudukan/Nomor KTP</label>
              <div class="input-ktp">
                <input
                  type="text"
                  name="ktp-number"
                  class="form-group"
                  placeholder="Nomor KTP Anda"
                  :class="{'input': true, 'is-danger': errors.has('ktp-number') }"
                  v-model="inputKTPNumber"
                  v-validate="{ required: true, regex: /^((1[1-9])|(21)|([37][1-6])|(5[1-4])|(6[1-5])|([8-9][1-2]))[0-9]{2}[0-9]{2}(([0-6][0-9])|(7[0-1]))((0[1-9])|(1[0-2]))([0-9]{2})[0-9]{4}$/ }"
                  data-vv-validate-on="blur|input"
                  >
                <span v-show="errors.has('ktp-number')" class="help is-danger">{{ errors.first('ktp-number') }}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-primary btn-block btn-submit"
            @click.prevent="KTPNumberNext"
          >
          <span v-if="isSubmitting">Mengirim</span>
          <span v-else>Lanjut</span>
          </button>

        </div>

        <div v-if="this.$route.query.steps == 2">

          <div class="verified-steps">
            <div class="title">Verifikasi Akun (1/3)</div>
            <div class="thumb">
              <SelfieLottie/>
            </div>
            <div class="text">
              <h4>Foto Diri Dengan KTP</h4>
              <p>Jangan lupa pastikan seluruh bagian wajah dan KTP berada dalam satu frame. Agar lebih jelas, tidak perlu diedit berlebihan, ya :)</p>
            </div>
            <div class="img-sample">
              <img src="@/assets/selfie-idcard-1.png" alt>
              <img src="@/assets/selfie-idcard-2.png" alt>
            </div>
            <div class="preview-img" v-if="inputSelfieURL">
              <img :src="inputSelfieURL">
              <div class="remove-img">
                <close-icon @click="removeImage"/>
              </div>
            </div>

            <div class="upload-img" v-if="!inputSelfieURL">
              <input
                type="file"
                name="pic"
                accept="image/*"
                @change="inputChange('inputSelfie', $event)"
                :class="{'input': true, 'is-danger': errors.has('pic') }"
                data-vv-validate-on="input"
                v-validate="'required'"
              >
              <span v-show="errors.has('pic')" class="help is-danger">*Wajib Upload Gambar</span>
              <div class="upload-placeholder">
                <image-default/>
                <p>Upload Gambar</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-primary btn-block btn-submit"
            @click.prevent="SelfieURLNext"
          >
          <span v-if="isSubmitting">Mengirim</span>
          <span v-else>Lanjut</span>
          </button>

        </div>

        <div v-if="this.$route.query.steps == 3">

          <div class="verified-steps">
            <div class="title">Verifikasi Akun (2/3)</div>
            <div class="thumb">
              <KtpLottie/>
            </div>
            <div class="text">
              <h4>Foto KTP</h4>
              <p>Potret foto KTP asli kamu dan pastikan semua terlihat jelas dalam satu frame.</p>
            </div>
            <div class="img-sample">
              <img src="@/assets/ktp-1.png" alt>
              <img src="@/assets/ktp-2.png" alt>
            </div>
            <div class="preview-img" v-if="inputKTPURL">
              <img :src="inputKTPURL">
              <div class="remove-img">
                <close-icon @click="removeImage"/>
              </div>
            </div>
            <div class="upload-img" v-if="!inputKTPURL">
              <input
                type="file"
                name="picKTP"
                accept="image/*"
                @change="inputChange('inputKTP', $event)"
                :class="{'input': true, 'is-danger': errors.has('picKTP') }"
                data-vv-validate-on="input"
                v-validate="'required'"
              >
              <span v-show="errors.has('picKTP')" class="help is-danger">*Wajib Upload Gambar</span>
              <div class="upload-placeholder">
                <image-default/>
                <p>Upload Gambar</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-primary btn-block btn-submit"
            @click.prevent="inputKTPNext"
          >
          <span v-if="isSubmitting">Mengirim</span>
          <span v-else>Lanjut</span>
          </button>

        </div>

        <div v-if="this.$route.query.steps == 4">

          <div class="verified-steps">
            <div class="title">Verifikasi Akun (3/3)</div>
            <div class="thumb">
              <TtdLottie/>
            </div>
            <div class="text">
              <h4>Foto Tanda Tangan</h4>
              <p>Langkah terakhir verifikasi! Foto tandatangan kamu yang sama dengan KTP asli di atas kertas putih.</p>
            </div>
            <div class="preview-img" v-if="inputSignatureURL">
              <img :src="inputSignatureURL">
              <div class="remove-img">
                <close-icon @click="removeImage"/>
              </div>
            </div>
            <div class="upload-img" v-if="!inputSignatureURL">
              <input
                type="file"
                name="picSignature"
                accept="image/*"
                @change="inputChange('inputSignature', $event)"
                :class="{'input': true, 'is-danger': errors.has('picSignature') }"
                data-vv-validate-on="input"
                v-validate="'required'"
              >
              <span v-show="errors.has('picSignature')" class="help is-danger">*Wajib Upload Gambar</span>
              <div class="upload-placeholder">
                <image-default/>
                <p>Upload Gambar</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-primary btn-block btn-submit"
            @click.prevent="inputSignatureNext"
          >
          <span v-if="isSubmitting">Mengirim</span>
          <span v-else>Lanjut</span>
          </button>

        </div>

        <div v-if="this.$route.query.steps == 5">
          <div class="verified-steps finish-steps">
            <div class="thumb">
              <FinishLottie/>
            </div>
            <h4>Yaay! Akunmu sudah lengkap untuk proses verifikasi!</h4>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-block btn-submit"
            @click.prevent="$router.push({ path: '/profile'})"
          >OKE</button>
        </div>

      </template>
      <template slot="widget-wrapper">
        <div class="d-none d-lg-block">&nbsp;</div>
      </template>
    </LayoutTimeline>
  </div>
</template>

<script>
import { authLink } from '@/mixins/link'

import LayoutTimeline from '@/layout/Timeline'
import SelfieLottie from '@/pages/Profile/SelfieLottie'
import KtpLottie from '@/pages/Profile/KtpLottie'
import TtdLottie from '@/pages/Profile/TtdLottie'
import FinishLottie from '@/pages/Profile/FinishLottie'
import { VerifiedIconDefault, ImageDefault, CloseIcon } from '@/svg/icons'
export default {
  name: 'ProfileVerified',
  components: {
    LayoutTimeline,
    VerifiedIconDefault,
    ImageDefault,
    CloseIcon,
    SelfieLottie,
    KtpLottie,
    TtdLottie,
    FinishLottie
  },
  mixins: [authLink],
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
      inputSignatureFile: null,
      isSubmitting: false,
    }
  },
  methods: {
    KTPNumberNext() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isSubmitting = true
          this.$store
            .dispatch('profile/verifyKTPNumber', {
              ktp_number: this.inputKTPNumber
            })
            .then(() => {
              this.isSubmitting = false
              this.$store.dispatch('homeKenalan/updateKenalan', {
                id: 'c46bae56-8c87-4f54-8328-b959d89c931f'
              })
              this.$router.push({ path: '/profile/verified', query: { steps: 2 } })

          })
        }
      })
    },
    SelfieURLNext (){
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isSubmitting = true
          this.$store
            .dispatch('profile/verifySelfie', {
              ktp_selfie: this.inputSelfieFile
            })
            .then(() => {
              this.isSubmitting = false
              this.$router.push({ path: '/profile/verified', query: { steps: 3 } })
          })
        }
      })
    },
    inputKTPNext(){
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isSubmitting = true
          this.$store
            .dispatch('profile/verifyKTP', {
              ktp_photo: this.inputKTPFile
            })
            .then(() => {
              this.isSubmitting = false
              this.$router.push({ path: '/profile/verified', query: { steps: 4 } })
          })
        }
      })
    },
    inputSignatureNext() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isSubmitting = true
          this.$store
            .dispatch('profile/verifySignature', {
              signature: this.inputSignatureFile
            })
            .then(() => {
              this.isSubmitting = false
              this.$router.push({ path: '/profile/verified', query: { steps: 5 } })
          })
        }
      })
    },
    inputChange(type, event) {
      const file = Array.from(event.target.files).pop()
      if (this[`${type}URL`] != null) URL.revokeObjectURL(this[`${type}URL`])
      this[`${type}URL`] = URL.createObjectURL(file)
      this[`${type}File`] = file
    },
    removeImage() {
      this.inputSelfieURL = null,
      this.inputSelfieFile = null,
      this.inputKTPURL = null,
      this.inputKTPFile = null,
      this.inputSignatureURL = null,
      this.inputSignatureFile = null
    },
  }
}
</script>

<style lang="sass" scoped>
.finish-steps
  background-color: #fff
  h4
    margin-top: 30px
    @media (max-width: 767px)
      font-size: 1.3rem

.input-ktp
  position: relative
.help.is-danger
  top: auto
  bottom: -20px
  left: 0
.preview-img
  padding: 0 5px 0 25px
  border: none
  align-items: flex-start
  justify-content: center
  img
    max-height: 260px
  .remove-img
    svg
      width: 30px
</style>
