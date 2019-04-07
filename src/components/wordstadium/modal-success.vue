<template>
  <transition-group name="modal">
    <div key="2" class="modal-wrapper">
      <div class="modal-full">
        <div class="modal-content">
          <img src="@/assets/user.svg" alt="user">
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
    <div key="1" class="modal-mask" @click.stop="$emit('close-request')"></div>
  </transition-group>
</template>

<script>
import { SearchIcon } from '@/svg/icons'

export default {
  name: 'ModalKajian',
  props: {
    text: { type: String, default: 'Laporan Kamu Berhasil Dipublish' }
  },
  data() {
    return {}
  },
  components: {
    SearchIcon
  },
  methods: {},
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }
}
</script>

<style lang="sass" scoped>
.modal-full
  padding: 38px
  margin: 0
  background-color: #ffffff
  border: 1px solid #ececec
  border-radius: 15px
  width: 318px

.modal-content
  font-family: 'Bw Modelica'
  font-size: 16px
  line-height: 20px
  font-weight: bold
  display: flex
  align-items: center
  justify-content: center
  color: #111111
  margin: 0
  padding: 0
  text-align: center
  border: none

  img
    width: 100px
    height: 100px
    margin-bottom: 22px
    border-radius: 50%

</style>
