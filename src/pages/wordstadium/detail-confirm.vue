<template>
  <layout-timeline>
    <template slot="main-content">
      <div>
        <debat-detail
          title="Open Challenge"
          :debat="debat"
          :with-source="false"
          :with-opponent="true"
          :challenger="challenger"
          :opponent="opponent"
          banner-text1="Tantangan diterima!"
          banner-text2="Segera konfirmasi sebelum batas akhir waktunya!"
        >
        <template slot="debat-subcontent">
            <confirmation-panel @confirm="isModalOpen = !isModalOpen">
            </confirmation-panel>
            <confirmation-panel @confirm="isModalOpen = !isModalOpen">
            </confirmation-panel>
        </template>
        </debat-detail>
        <modal-layout v-if="isModalOpen" class="modal-confirm">
          <div slot="modal-content" class="modal-confirm-challenge">
            <div class="modal-body modal-body--confirm-challenge">
              <slot name="content">
                <img src="~@/assets/img-confirm-challenge.png" alt="img-confirm-challenge" class="illustration">
                <div class="text">
                  Kamu akan mengkonfirmasi <b>@raja_kampreta</b> sebagai
                  lawan debat anda sesuai detail yang tertera
                </div>
                <div class="buttons">
                  <button type="button" @click="isModalOpen = false">Kembali</button>
                  <button type="button" @click="isModalOpen = false" class="teal">Ya</button>
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
import dummyDebat from '@/pages/wordstadium/dummy-debat.json'

const dummyUser = {
  "id": "45a51cb5-4dbb-4958-b57d-8414fecbfa65",
  "role": "challenger",
  "user_id": null,
  "email": "hanif@extrainteger.com",
  "full_name": "Hanif Sugiyanto",
  "username": "Hanifdev",
  "avatar": {
    "url": "https://pantau-test.s3.amazonaws.com/uploads/user/avatar/3fcbf2f3-0a31-4e39-aaa9-e2b6340a8178/pantau-ios-01012019005053.jpg",
    "thumbnail": {
      "url": "https://pantau-test.s3.amazonaws.com/uploads/user/avatar/3fcbf2f3-0a31-4e39-aaa9-e2b6340a8178/thumbnail_pantau-ios-01012019005053.jpg"
    },
    "thumbnail_square": {
      "url": "https://pantau-test.s3.amazonaws.com/uploads/user/avatar/3fcbf2f3-0a31-4e39-aaa9-e2b6340a8178/thumbnail_square_pantau-ios-01012019005053.jpg"
    },
    "medium": {
      "url": "https://pantau-test.s3.amazonaws.com/uploads/user/avatar/3fcbf2f3-0a31-4e39-aaa9-e2b6340a8178/medium_pantau-ios-01012019005053.jpg"
    },
    "medium_square": {
      "url": "https://pantau-test.s3.amazonaws.com/uploads/user/avatar/3fcbf2f3-0a31-4e39-aaa9-e2b6340a8178/medium_square_pantau-ios-01012019005053.jpg"
    }
  },
  "about": "android"
}

export default {
  name: 'DebatDetailConfirm',
  components: {
    LayoutTimeline,
    DebatDetail,
    ConfirmationPanel,
    ModalLayout
  },
  data() {
    return {
      isModalOpen: false
    }
  },
  computed: {
    debat() { return dummyDebat },
    challenger() {
      return dummyUser
    },
    opponent() {
      return dummyUser
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
