<template>
  <layout-timeline>
    <template slot="main-content">
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
        <button type="button" class="accept-challenge">
          <i class="icon icon-accept-challenge"></i>
          <div class="text">Terima tantangan</div>
        </button>
      </template>
      </debat-detail>
    </template>
  </layout-timeline>
</template>

<script>
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
    DebatDetail
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
</style>
