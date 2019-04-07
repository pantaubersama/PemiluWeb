<template>
  <layout-timeline>
    <template slot="main-content">
      <div>
        <debat-detail
          :title="$getChallengeTitle(debat.type)"
          :debat="debat"
          :with-source="false"
          :with-opponent="false"
          :challenger="challenger"
          :opponent="opponent"
          banner-text1="Ini tantangan buat kamu,"
          banner-text2="apakah dikonfirmasi?"
        >
        <template slot="debat-subcontent">
          <button type="button" class="accept-challenge"
            @click.prevent="modal = 'confirm'">
            <i class="icon icon-accept-challenge"></i>
            <div class="text">Terima tantangan</div>
          </button>
          <button type="button" class="reject-challenge"
            @click.prevent="modal = 'reject'">
            <div class="text">Tolak</div>
          </button>
        </template>
        </debat-detail>
        <modal-layout v-if="modal === 'confirm'" class="modal-confirm">
          <div slot="modal-content" class="modal-confirm-challenge">
            <div class="modal-body modal-body--confirm-challenge">
              <slot name="content">
                <img src="~@/assets/img-confirm-challenge.png" alt="img-confirm-challenge" class="illustration">
                <div class="text">
                  Kamu akan menerima Direct Challenge
                  dari <b>@{{challenger.username}}</b> untuk berdebat.
                </div>
                <div class="buttons">
                  <button type="button" @click="modal = null">Kembali</button>
                  <button type="button" @click="accept()" class="teal">Ya</button>
                </div>
              </slot>
            </div>
          </div>
        </modal-layout>
        <modal-layout v-if="modal === 'reject'" class="modal-confirm">
          <div slot="modal-content" class="modal-confirm-challenge">
            <div class="modal-body modal-body--confirm-challenge">
              <slot name="content">
                <img src="~@/assets/img-confirm-challenge.png" alt="img-confirm-challenge" class="illustration">
                <div class="text">
                  Kamu akan menolak Direct Challenge dari <b>@{{challenger.username}}</b> untuk berdebat.
                  Tulis pernyataan atau alasannya sebagai hak jawab penolakan kamu.
                </div>
                <textarea id="alasan" v-model="alasan" class="text-alasan"></textarea>
                <div class="buttons">
                  <button type="button" @click="modal = null">Kembali</button>
                  <button type="button" @click="reject()" class="red">Ya, Tolak</button>
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
import ModalLayout from '@/layout/Modal'
import LayoutTimeline from '@/layout/Timeline'
import DebatDetail from '@/components/debat-detail'
import * as WordstadiumAPI from '@/services/api/wordstadium'

export default {
  name: 'DebatDetailIncoming',
  props: ['debat'],
  components: {
    LayoutTimeline,
    DebatDetail,
    ModalLayout
  },
  data() {
    return {
      modal: null,
      alasan: ''
    }
  },
  computed: {
    challenger() {
      return this.debat.audiences.find(it => it.role === 'challenger')
    },
    opponent() {
      return this.debat.audiences.find(it => it.role === 'opponent_candidate')
    }
  },
  methods: {
    openModal(kind) {
      this.isModalOpen = kind
    },
    async accept() {
      return WordstadiumAPI.approve(this.debat.id)
        .then((res) => {
          console.log('success approving', res)
          this.modal = null
          window.location.reload()
        })
    },
    async reject() {
      return WordstadiumAPI.reject(this.debat.id, this.alasan)
        .then((res) => {
          console.log('success rejecting', res)
          this.modal = null
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
  // background-image: url(~@/assets/bg-debat-detail-waiting.svg)
  background-image: url(~@/assets/bg-debat-detail-expired.svg)

.debat-detail-container /deep/ .debat-subcontent
  margin-top: 20px
  display: flex
  height: 300px
  align-items: flex-end
  justify-content: center

.accept-challenge,
.reject-challenge
  background: #08bda8
  border: none
  cursor: pointer
  display: flex
  height: 40px
  width: 300px
  align-items: center
  border-radius: 2px

  .icon
    flex: 0 0 25px
    background-image: url(~@/assets/icon-accept-challenge.svg)
  .text
    flex: 1
    text-indent: -25px
    font-size: 12px
    font-weight: bold
    font-stretch: condensed
    line-height: 1.25
    letter-spacing: 0.5px
    text-align: center
    color: #ffffff

.reject-challenge
  border-radius: 2px
  border: solid 1px #08bda8
  background: white
  flex-basis: 170px
  margin-left: 10px
  .text
    text-indent: 0px
    color: #08bda8


.modal-confirm
  & /deep/ .modal-container
    padding: 0
    width: 318px
    // height: 337px
    height: auto
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
  .text-alasan
    height: 55px
    width: 195px
    flex: 0 0 auto
    border: none
    margin-bottom: 10px
    margin-top: 10px
    border-radius: 4px
    background: #f9f9f9
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
      &.red
        background: #eb3037
        color: white

</style>
