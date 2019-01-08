<template>
  <modal>
    <div slot="modal-content" class="modal-toast">
      <div class="validation-success lottie-card" ref="validationSuccess"></div>
      <p>Yapp, Selamat</p>
      <p>Tunggu datamu dalam proses
        <br>pengecekan
      </p>
    </div>
  </modal>
</template>

<script>
import lottie from 'lottie-web'
import Modal from '@/layout/Modal'
export default {
  name: 'ModalToast',
  components: {
    Modal,
    lottie
  },
  data() {
    return {
      validationSuccess: null
    }
  },
  mounted() {
    this.validationSuccess = lottie.loadAnimation({
      container: this.$refs.validationSuccess,
      path: '/lottie/validation-success.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
  },
  destroyed() {
    this.validationSuccess.destroy()
  }
}
</script>
