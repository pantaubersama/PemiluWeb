<template>
  <transition-group name="modal">
    <div key="2" class="modal-wrapper">
      <div class="modal-full">
        <div class="modal-content">
          <h6>Input Link</h6>
          <p>Sertakan tautan/link ke pernyataan kamu</p>
          <input ref="link" type="text" class="form-control" placeholder="Tempel disini...">
        </div>
        <div class="modal-footer">
          <button class="btn" @click.stop="$emit('close-request')">BATAL</button>
          <button class="btn" @click.stop="$emit('input', $refs.link.value)">OKE</button>
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
  padding: 0
  margin: 0
  background-color: #ffffff
  border: 1px solid #ececec
  border-radius: 8px
  width: 250px

.modal-content
  font-family: Lato
  font-size: 12px
  font-weight: normal
  color: #5c5d62
  margin: 0
  padding: 16px
  text-align: center
  border: none

  h6
    margin: 4px 0
    font-family: BwModelicaSS01, Lato
    font-size: 14px
    font-weight: bold
    line-height: 16px
    letter-spacing: 0.34px
    color: #000000

  .form-control
    font-family: Lato
    font-size: 12px
    font-style: normal
    font-weight: normal
    color: #212121
    margin-top: 16px

    &::placeholder
      color: #cbcbcb

/deep/ .modal-footer
  display: flex
  justify-content: space-betweeb
  align-items: center
  flex-direction: row
  height: 40px
  border-top: 1px solid #dfdfdf
  padding: 0
  margin: 0
  background: transparent

  .btn
    background: transparent
    font-family: Lato
    font-size: 12px
    letter-spacing: 1.2px
    width: 100%
    height: 100%
    padding: 0
    margin: 0
    border-radius: 0

    &:first-child
      border-right: 1px solid #dfdfdf
</style>
