<template>
  <div class="DetailDebat">
    <layout-timeline>
      <template slot="main-content">
        <debat-detail
          title="Coming Soon"
          :debat="debat"
          :with-source="true"
          :with-opponent="true"
          :challenger="challenger"
          :opponent="opponent"
          banner-text1="Siap-siap!"
          :banner-text2="`Debat akan berlangsung ${distance} lagi!`">
          <template slot="debat-subcontent"></template>
        </debat-detail>
      </template>
    </layout-timeline>
  </div>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import DebatDetail from '@/components/debat-detail'

export default {
  name: 'DetailDebat',
  props: ['debat'],
  components: {
    LayoutTimeline,
    DebatDetail
  },
  computed: {
    distance() {
      // return this.$datefns.distanceInWords(this.debat.show_time_at, new Date())
      return this.$options.filters.dateDistance(this.debat.show_time_at)
    },
    challenger() {
      if (this.debat == null) return null
      return this.debat.audiences.find(it => it.role === 'challenger')
    },
    opponent() {
      if (this.debat == null) return null
      return this.debat.audiences.find(it => it.role === 'opponent' || it.role === 'opponent_candidate')
    },
  }
}
</script>

<style lang="sass" scoped>
.icon
  background-repeat: no-repeat
  background-size: contain
  background-position: center
  display: block
  height: 22px
  width: 22px
  &.icon-twitter
    background-image: url(~@/assets/icon-twitter-round.svg)
  &.icon-calendar
    background-image: url(~@/assets/icon-calendar.svg)
  &.icon-clock
    background-image: url(~@/assets/icon-clock.svg)
  &.icon-hourglass
    background-image: url(~@/assets/icon-hourglass.svg)
.header
  background-image: url(~@/assets/bg-debat-detail-coming-soon.svg)
  background-repeat: no-repeat
  display: flex
  flex-direction: column
  padding: 10px
  height: 203px
  overflow: hidden
  background-size: 120%
  background-position-x: 50%
  border-top-left-radius: 10px
  border-top-right-radius: 10px
  border-bottom: none
  .title
    flex: 0 0 40px
    font-family: BwModelica, Lato
    font-size: 22px
    font-weight: bold
    font-stretch: condensed
    line-height: 1.23
    text-align: center
    color: #ffffff
    display: flex
    align-items: flex-end
    justify-content: center
  .challenge-detail
    flex: 1
    display: flex
    justify-content: space-between
    .challenger-info,
    .opponent-info
      display: flex
      flex-direction: column
      align-items: center
      width: 90px
      overflow: hidden
      .avatar-container
        height: 64px
        width: 64px
        border-radius: 50%
        border: 2px solid white
        overflow: hidden
        img.avatar
          height: 100%
          width: 100%
          object-fit: cover
      .profile-info
        width: 100%
        margin-top: 5px
        .name,
        .username
          text-align: center
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          color: white
        .name
          font-size: 14px
          font-weight: bold
          font-stretch: condensed
          line-height: 1.14
        .username
          font-size: 12px
          font-weight: bold
          line-height: 2.08
          letter-spacing: 0.2px

.share-menu
  flex: 0 0 56px
  height: 56px
  display: flex
  justify-content: flex-end
  align-items: center
  background: white
  .share-btn,
  .menu-btn
    display: flex
    align-items: center
    justify-content: center
    font-size: 12px
    font-weight: bold
    line-height: 1
    letter-spacing: 1.2px
    color: #212121
    text-transform: uppercase
    background: none
    border: none
    cursor: pointer
  .icon
    display: inline-block
    height: 25px
    width: 25px
    &.icon-share
      background-image: url(~@/assets/icon-share.svg)
    &.icon-menu
      background-image: url(~@/assets/icon-menu.svg)

.debat-banner
  background-image: url(~@/assets/img-debat-detail-banner.svg)
  background-color: white
  background-repeat: no-repeat
  background-size: 100%
  flex: 0 0 480px
  display: flex
  flex-direction: column
  height: 390px
  padding: 20px
  .siap,
  .text-yellow
    font-size: 32px
    font-weight: 800
    font-stretch: condensed
    line-height: 1.19
    text-align: left
    color: #f6b42a
  .siap
    font-weight: 300
    color: #212121

.debat-detail
  flex: 0 0 auto
  display: flex
  flex-direction: column
  background: white
  padding: 20px
  .title
    flex: 0 0 24px
    font-size: 14px
    font-weight: 800
    font-stretch: condensed
    line-height: 0.86
    letter-spacing: 0.7px
    text-align: center
    color: #212121
    text-transform: uppercase
  .tag-list
    flex: 0 0 25px
    list-style: none
    padding: 0
    margin: 0
    display: flex
    .tag-item
      border: 1px solid #f9d65c
      border-radius: 4px
      padding: 1px 5px
  .source
    margin-top: 10px
    flex: 0 0 150px
    display: flex
    flex-direction: column
    padding: 10px
    background: #f9f9f9
    .source-link
      flex: 0 0 25px
      font-size: 10px
      line-height: 1.6
      text-align: left
      color: #1da1f2
      text-decoration: underline
      padding: 5px 10px
    .source-detail
      display: flex
      padding: 10px
      .source-avatar-container
        flex: 0 0 40px
        height: 40px
        width: 40px
        border: 2px solid white
        border-radius: 50%
        position: relative
        img.source-avatar
          height: 36px
          width: 36px
          object-fit: cover
          border-radius: 50%
          overflow: hidden
        .icon.icon-twitter
          position: absolute
          bottom: -5px
          left: 0px
      .detail-container
        display: flex
        flex-direction: column
        margin-left: 10px
        .meta-container
          flex: 0 0 25px
          display: flex
          .name,
          .username,
          .date
            font-size: 12px
            font-weight: bold;
            line-height: 2;
            color: #aaaaaa
            margin-left: 5px
            &:first-child
              margin-left: 0
          .name
            color: #212121
        .content
          font-size: 11px
          line-height: 1.18
          letter-spacing: 0.2px
          color: #212121
  .debat-subtitle
    margin-top: 10px
    font-size: 12px
    font-weight: bold
    font-stretch: condensed
    line-height: 1.17
    text-align: left
    color: #212121
  .detail-lawan
    margin-top: 20px
    display: flex
    flex-direction: column
    .detail-lawan-title
      flex: 0 0 25px
      font-size: 13px
      font-weight: 600
      line-height: 2.31
      text-align: left
      color: #aaaaaa
    .meta
      flex: 1
      display: flex
      .avatar-container
        flex: 0 0 32px
        position: relative
        height: 32px
        width: 32px
        border: 2px solid white
        border-radius: 50%;
        img.avatar
          height: calc(32px - 4px)
          width: calc(32px - 4px)
          object-fit: cover
          border-radius: 50%
        .icon.icon-twitter
          position: absolute
          bottom: -7px
          left: -2px
          height: 18px
          width: 18px
      .user-data
        margin-left: 5px
        display: flex
        flex-direction: column
        .name
          font-size: 12px
          font-weight: bold
          line-height: 1.33
          text-align: left
          color: #000000
        .username
          font-size: 10px
          line-height: 1.5
          letter-spacing: 0.2px
          text-align: left
          color: #757575
  .time-container
    margin-top: 10px
    .title
      font-size: 13px
      font-weight: 600
      line-height: 2.31
      text-align: left
      color: #aaaaaa
    .date,
    .time
      display: flex
      align-items: center
      .date-value,
      .time-value
        margin-left: 5px
  .time-saldo
    margin-top: 10px
    display: flex
    flex-direction: column
    .title
      font-size: 13px
      font-weight: 600
      line-height: 2.31
      text-align: left
      color: #aaaaaa
    .description
      font-size: 12px
      line-height: 1.25
      text-align: left
      color: #7c7c7c
    .saldo-value
      margin-top: 5px
      font-size: 11px
      line-height: 1.18
      letter-spacing: normal
      text-align: left
      color: #7c7c7c
      display: flex
      align-items: center
      b
        font-size: 12px
        font-weight: bold
        font-stretch: condensed
        line-height: 1.17
        text-align: left
        color: #212121
.posting-list
  margin-top: 20px
  background: white
  list-style: none
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 20px
  .posting-item
    margin-top: 20px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    &:first-child
      margin-top: 0
    .avatar-container
      flex: 0 0 36px
      height: 36px
      width: 36px
      border-radius: 50%
      overflow: hidden
      img.avatar
        height: 100%
        width: 100%
        object-fit: cover
    .name
      margin-top: 10px
      font-size: 14px
      font-weight: bold
      line-height: 1.21
      text-align: center
      color: #212121
    .text
      font-family: Lato
      font-size: 14px
      line-height: 1.21
      text-align: center
      color: #4f4f4f
    .time
      margin-top: 10px
      font-size: 12px
      line-height: 1.08
      text-align: center
      color: #7c7c7c
</style>
