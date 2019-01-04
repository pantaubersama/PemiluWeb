<template>
  <modal @close-request="() => $emit('close-request')" class="modal-confirm-request-cluster">
    <div slot="modal-content" class="card">
      <div class="modal-content">Apa kamu yakin data cluster sudah benar?
        <div class="confirm-button-container">
          <button class="back" @click="$emit('back')">Kembali</button>
          <button class="confirm" @click="$emit('confirm')">Ya</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '@/layout/Modal'
export default {
  name: 'ModalConfirmRequestCluster',
  components: { Modal }
}
</script>

<style lang="sass" scoped>
.modal-confirm-request-cluster
  & /deep/ .modal-container
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    padding: 20px
    height: 247px
    width: 536px
  .card
    width: 100%
    height: 100%
    border-radius: 0
    margin: 0
    justify-content: space-evenly
  .modal-content
    // flex: 1
    justify-content: center
    align-items: center
    border: none
    font-size: 16px
    font-weight: bold
    line-height: 1.19
    color: #111111
    padding: 0 35px
  .confirm-button-container
    margin-top: 30px
    align-self: flex-end
  button.back,
  button.confirm
    background: none
    border: none
    padding: 10px 20px
    font-size: 18px
    font-weight: bold
    line-height: 1.22
    text-align: center
    cursor: pointer
  button.back
    color: #7c7c7c
  button.confirm
    color: #bd081c
</style>
