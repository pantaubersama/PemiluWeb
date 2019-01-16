<template>
  <transition-group name="modal">
    <modal-toast key="modal-toast" v-if="modal === 'modalToast' && hide == true"/>
    <div key="modal-confirm" class="modal-mask" v-if="hide == false">
      <div class="modal-wrapper">
        <div class="modal-container modal-confirm">
          <h3>Apakah kamu yakin data yang
            <br>dikirim sudah benar ?
          </h3>
          <div class="button-options">
            <a href="#" class="cancel-modal" @click.prevent="$emit('close')">Tidak</a>
            <a href="#" @click.prevent="$emit('confirm')">Ya</a>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import ModalToast from '@/pages/Profile/ModalToast'
export default {
  name: 'ModalConfirm',
  data() {
    return {
      modal: false,
      hide: false
    }
  },
  components: {
    ModalToast
  },
  methods: {
    modalToast() {
      this.modal = 'modalToast'
      this.hide = true
      setTimeout(() => {
        this.modal = false
        document.documentElement.className = ''
      }, 3000)
    }
  },
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }
}
</script>
