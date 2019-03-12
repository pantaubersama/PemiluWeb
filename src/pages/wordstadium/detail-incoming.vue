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
          :opponent="opponent"
          banner-text1="Ini adalah Open Challenge,"
          banner-text2="Terima tantangan ini?"
        >
        <template slot="debat-subcontent">
          <button type="button" class="accept-challenge"
            @click.prevent="isModalOpen = !isModalOpen">
            <i class="icon icon-accept-challenge"></i>
            <div class="text">Terima tantangan</div>
          </button>
        </template>
        </debat-detail>
        <modal-layout v-if="isModalOpen" class="modal-confirm">
          <div slot="modal-content" class="modal-confirm-challenge">
            <div class="modal-body modal-body--confirm-challenge">
              <slot name="content">
                <img src="~@/assets/img-confirm-challenge.png" alt="img-confirm-challenge" class="illustration">
                <div class="text">
                  Kamu akan menerima tantangan dari
                  <b>@raja_kampreta</b> untuk berdebat
                  sesuai dengan detail yang tertera.
                  Tindakan ini tidak bisa dibatalkan.
                  Apakah kamu yakin?
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
import ModalLayout from '@/layout/Modal'
import LayoutTimeline from '@/layout/Timeline'
import DebatDetail from '@/components/debat-detail'
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
  name: 'DebatDetailIncoming',
  components: {
    LayoutTimeline,
    DebatDetail,
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
      return null
    }
  }
}
</script>

<style lang="sass" scoped>
.debat-detail-container /deep/ .header
  background-image: url(~@/assets/bg-debat-detail-banner-challenge.svg)
.debat-detail-container /deep/ .debat-banner
  background-image: url(~@/assets/bg-debat-detail-waiting.svg)

.debat-detail-container /deep/ .debat-subcontent
  margin-top: 20px
  display: flex
  height: 300px
  align-items: flex-end
  justify-content: center

.accept-challenge
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
