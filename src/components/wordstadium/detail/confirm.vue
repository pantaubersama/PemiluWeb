<template>
  <layout-timeline>
    <template slot="main-content">
      <div>
        <debat-detail
          title="Open Challenge"
          :debat="debat"
          :with-source="false"
          :with-opponent="false"
          :challenger="challenger"
          :opponent="null"
          banner-text1="Tantangan diterima!"
          banner-text2="Segera konfirmasi sebelum batas akhir waktunya!"
        >
        <template slot="debat-subcontent">
            <confirmation-panel
              v-for="user in candidates"
              :key="user.id"
              :user="user"
              :with-button="true"
              @confirm="openModal(user)"
            ></confirmation-panel>
        </template>
        </debat-detail>
        <modal-layout v-if="isModalOpen" class="modal-confirm">
          <div slot="modal-content" class="modal-confirm-challenge">
            <div class="modal-body modal-body--confirm-challenge">
              <slot name="content">
                <img src="~@/assets/img-confirm-challenge.png" alt="img-confirm-challenge" class="illustration">
                <div class="text">
                  Kamu akan mengkonfirmasi <b>@{{candidate.username}}</b> sebagai
                  lawan debat anda sesuai detail yang tertera
                </div>
                <div class="buttons">
                  <button type="button" @click="closeModal()">Kembali</button>
                  <button type="button" @click="accept()" class="teal">Ya</button>
                </div>
              </slot>
            </div>
          </div>
        </modal-layout>
      </div>
    </template>
  </layout-timeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import ModalLayout from '@/layout/Modal'
import DebatDetail from '@/components/debat-detail'
import ConfirmationPanel from '@/components/wordstadium/confirmation-panel'
import * as WordstadiumAPI from '@/services/api/wordstadium'

export default {
  name: 'DebatDetailConfirm',
  props: ['debat'],
  components: {
    LayoutTimeline,
    DebatDetail,
    ConfirmationPanel,
    ModalLayout
  },
  data() {
    return {
      isModalOpen: false,
      candidate: null
    }
  },
  computed: {
    candidates() { return this.debat.audiences.filter(it => it.role === 'opponent_candidate') },
    challenger() { return this.debat.audiences.find(it => it.role === 'challenger') }
  },
  methods: {
    openModal(user) {
      this.candidate = user
      this.isModalOpen = true
    },
    closeModal() {
      this.candidate = null
      this.isModalOpen = false
    },
    accept(user) {
      return WordstadiumAPI.accept(this.debat.id, this.candidate.id)
        .then((res) => {
          console.log('candidate accepted', res)
          this.isModalOpen = false
          this.candidate = null
          window.location.reload()
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.debat-detail-container /deep/ .header
  background-image: url(~@/assets/bg-debat-detail-banner-challenge.svg)
.debat-detail-container /deep/ .debat-banner
  background-image: url(~@/assets/bg-debat-detail-expired.svg)
.debat-detail-container /deep/ .debat-banner .banner-text-2
    color: #bd081c

.debat-subcontent .confirmation-panel
  margin-top: 20px

.modal-confirm
  & /deep/ .modal-container
    padding: 0
    width: 318px
    height: 337px
    border-radius: 16px
    overflow: hidden
  & /deep/ .modal-confirm-challenge
    height: 100%
    width: 100%
  & /deep/ .modal-body
    display: flex
    flex-direction: column
    align-items: center
    height: 100%
    padding: 0
  img.illustration
    flex: 0 0 160px
    height: 160px
    width: 160px
    margin-top: 40px
  .text
    flex: 1
    text-align: center
    font-size: 15px
    font-weight: 500
    line-height: 1.2
    color: #5c5d62
    padding: 0 20px
    b
      font-weight: bold
      color: #212121
  .buttons
    flex: 0 0 48px
    height: 48px
    display: flex
    width: 100%
    button
      flex: 1
      display: flex
      justify-content: center
      align-items: center
      text-align: center
      background: #f4f4f4
      border: 0
      font-size: 14px
      line-height: 0.86
      letter-spacing: 1.4px
      text-align: center
      color: #212121
      text-transform: uppercase
      cursor: pointer
      &.teal
        background: #08bda8
        color: white

</style>
