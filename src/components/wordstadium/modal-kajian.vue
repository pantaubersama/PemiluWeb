<template>
  <transition-group name="modal">
    <div key="2" class="modal-wrapper">
      <div class="modal-full">
        <div class="modal-header">
          <div class="input-group input-modal">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <search-icon/>
              </span>
            </div>
            <input type="text" class="form-control" placeholder="Pilih bidang kajian">
          </div>
        </div>
        <div class="modal-content">
          <ul>
            <li v-for="b in bidang" :key="b.id">
              <a href="javascript:void(0)" @click="$emit('onSelect', b)">{{ b.name }}</a>
            </li>
          </ul>
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
  props: {
    bidang: Array
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
  padding: 16px 18px
  margin: 0
  background-color: #f4f4f4
  border: 1px solid #ececec
  border-radius: 8px
  width: 328px

.input-modal
    width: 100%
    margin-bottom: 17px

    .form-control, .input-group-text
      background-color: #ffffff
      // border: 1px solid #ececec
      padding: 0 12px

    .form-control
      padding-left: 2px
      font-family: Lato
      font-size: 12px
      font-style: italic
      font-weight: normal
      color: #212121
      border-left: none

      &::placeholder
        color: #cbcbcb

    .input-group-prepend
      .input-group-text
        svg
          width: 24px
          height: 24px

    .input-group-append
      .input-group-text
        font-family: Lato
        font-size: 11px
        color: #7c7c7c

.modal-content
  border: none;
  background-color: #ffffff

  ul
    padding: 16px
    list-style: none

    li
      display: block

      a
        text-decoration: none
        color: #4f4f44
        font-family: Lato
        font-size: 14px
        font-style: italic
        line-height: 32px
        display: block

        &:hover
          text-decoration: underline
          font-weight: bold
</style>
