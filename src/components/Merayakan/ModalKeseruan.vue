<template>
  <transition-group name="modal">
    <div key="1" class="keseruan-close-icon" @click.prevent="$emit('close-request')">
      <close-icon></close-icon>
    </div>
    <div key="2" class="modal-wrapper keseruan-wrapper" @click.stop>
      <div class="modal-container">
        <div class="modal-keseruan">
          <img src="@/assets/thumb-img.png" alt>
        </div>
      </div>
    </div>
    <div key="3" class="modal-mask" @click.stop="$emit('close-request')"></div>
  </transition-group>
</template>

<script>
import { CloseIcon } from '@/svg/icons'
export default {
  name: 'ModalKeseruan',
  components: { CloseIcon },
  data() {
    return {

    }
  },
  computed: {
  },
  methods: {

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
.keseruan-wrapper
  max-width: 720px
  @media (max-width: 767px)
    padding: 0
    .modal-container
      // transform: translateX(-7px)
      max-width: 90vw
.keseruan-close-icon
  position: fixed
  width: 50px
  z-index: 9998
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

