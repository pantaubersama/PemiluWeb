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
              <input type="text" name="nama" placeholder="Nama">
            </div>
            <div class="card-column">
              <input type="text" name="komunitas" placeholder="Komunitan/Organisasi">
            </div>
            <div class="card-column">
              <input type="text" name="Email" placeholder="Komunitan/Organisasi">
            </div>
            <div class="card-column">
              <input type="text" name="handphone" placeholder="No Handphone">
            </div>
            <div class="card-column">
              <textarea
                rows="6"
                placeholder="Keperluan Penggunaan Data"
              ></textarea>
            </div>
          <button
            type="button"
            class="btn btn-block btn-submit"
            @click.prevent="submit"
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
    }
  },
  computed: {
  },
  methods: {
    submit(event) {
      this.isSubmitting = true

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
      transform: translateX(-7px)
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
  .btn-submit
    background-color: #08bda8
    color: #FFFFFF
    font-size: 13px
    text-transform: uppercase
    padding: 10px
.unduh-close-icon
  position: fixed
  width: 50px
  z-index: 9998
  right: 50px
  top: 30px
  cursor: pointer
  @media (max-width: 767px)
    right: 25px
    top: 20px
  svg
    width: 50px
    fill: #ffffff
</style>

