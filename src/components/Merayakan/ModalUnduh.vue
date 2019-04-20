<template>
  <transition-group name="modal">
    <div key="1" class="unduh-close-icon" @click.prevent="$emit('close-request')">
      <close-icon></close-icon>
    </div>
    <div key="2" class="modal-wrapper unduh-wrapper">
      <div class="modal-container">
        <div class="modal-unduh">
          <div class="thumb">
            <UnduhIllustration />
          </div>
          <div class="title">
            Silahkan melakukan request terlebih dahulu dengan mengisi data diri kamu. Untuk info lebih lanjut silahkan hubungi :
            <a href="mailto:contact@pantaubersama.com">contact@pantaubersama.com</a>
          </div>
          <form>
            <div class="card-column">
              <input type="text" v-model="name" name="nama" placeholder="Nama">
            </div>
            <div class="card-column">
              <input type="text" v-model="organization" name="komunitas" placeholder="Komunitas/Organisasi">
            </div>
            <div class="card-column">
              <input
                type="text"
                v-model="email"
                name="email"
                placeholder="Email"
                v-validate="'required|email'"
                :class="{'input': true, 'is-danger': errors.has('email') }"
                data-vv-validate-on="blur|input"
              >
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </div>
            <div class="card-column">
              <input
                type="text"
                v-model="phone"
                v-validate="'numeric'"
                :class="{'input': true, 'is-danger': errors.has('handphone') }"
                data-vv-validate-on="blur|input"
                name="handphone"
                placeholder="No Handphone"
              >
              <span v-show="errors.has('handphone')" class="help is-danger">{{ errors.first('handphone') }}</span>
            </div>
            <div class="card-column">
              <textarea
                v-model="necessity"
                rows="6"
                placeholder="Keperluan Penggunaan Data"
              ></textarea>
            </div>
          <button
            type="button"
            class="btn btn-block btn-submit"
            @click.prevent="submit()"
          >
          <span v-if="isSubmitting">Mengirim</span>
          <span v-else>Kirim</span>
          </button>
          </form>
        </div>
      </div>
    </div>
    <div key="3" class="modal-mask" @click.stop="$emit('close-request')"></div>
  </transition-group>
</template>

<script>
import { CloseIcon } from '@/svg/icons'
import { UnduhIllustration } from '@/svg/illustrations'
export default {
  name: 'ModalUnduh',
  components: { CloseIcon, UnduhIllustration },
  data() {
    return {
      isSubmitting: false,
      name: '',
      organization: '',
      email: '',
      phone: '',
      necessity: ''
    }
  },
  computed: {
  },
  methods: {
    submit(event) {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isSubmitting = true
          this.$store
            .dispatch('requestData/requestData',{
              name: this.name,
              organization: this.organization,
              email: this.email,
              phone: this.phone,
              necessity: this.necessity
            })
            .then(() => {
              this.isSubmitting = false
              this.$emit('close-request')
              this.$toaster.info('Berhasil Melakukan Request Data.')
            })
        }
      })
    },
  },
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }

}
</script>

<style lang="sass" scoped>
.unduh-wrapper
  max-width: 400px
  max-height: 95vh
  overflow-y: auto
  @media (max-width: 767px)
    padding: 0
  .modal-container
    overflow-y: unset
    max-height: none
    margin-top: 70px
    transform: translateX(0)
    padding-bottom: 20px
    @media (max-width: 767px)
      // transform: translateX(-7px)
      max-width: 90vw
.modal-unduh
  text-align: center
  .thumb
    width: 120px
    height: 120px
    background-color: #f4f4f4
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    margin: -70px auto 20px
  .title
    color: #707070
    font-size: 13px
    margin-bottom: 20px
  .card-column
    margin-bottom: 15px
    position: relative
    input, textarea
      width: 100%
      border: 1px solid #cbcbcb
      border-radius: 4px
      padding: 10px 15px
      font-size: 13px
      line-height: 1.5
      letter-spacing: 0.3px
      color: #111111
      &:focus
        border-color: #6ccfc0
    textarea
      resize: none
    .help.is-danger
      top: 100%
      left: 0
      font-size: 10px
  .btn-submit
    background-color: #08bda8
    color: #FFFFFF
    font-size: 13px
    text-transform: uppercase
    padding: 10px
.unduh-close-icon
  position: fixed
  width: 50px
  z-index: 9999
  right: 50px
  top: 30px
  cursor: pointer
  @media (max-width: 767px)
    right: 10px
    top: 20px
    width: 35px
  svg
    width: 100%
    fill: #ffffff
</style>

