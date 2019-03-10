<template>
  <layout-timeline>
    <template slot="main-content">
      <debat-detail
        title="Open Challenge"
        :debat="debat"
        :with-source="false"
        :with-opponent="true"
        :challenger="challenger"
        :opponent="opponent"
        banner-text1="Tantangan tidak valid!"
        banner-text2="Tantangan melebihi batas waktu :("
      >
      <template slot="debat-subcontent">
          <confirmation-panel></confirmation-panel>
          <confirmation-panel></confirmation-panel>
      </template>
      </debat-detail>
    </template>
  </layout-timeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
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
  name: 'DebatDetailExpired',
  components: {
    LayoutTimeline,
    DebatDetail,
    ConfirmationPanel
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
</style>
