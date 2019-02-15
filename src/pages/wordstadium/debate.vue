<template>
  <layout-wordstadium>
    <template slot="main-content">
      <div class="container">
        <div class="heading">
          <div class="status">
            <live-red/>Live Now
          </div>
          <div class="detail">
            <div class="thumb left">
              <!-- <img src="@/assets/user.svg" alt="thumbnail"> -->
              <div class="user-title">
                <h5>Raja Kampreta</h5>
                <span>@raja_kampreta</span>
              </div>
            </div>
            <div class="thumb center">
              <div class="versus">VS</div>
              <div class="description">
                <p>
                  2018 pertumbuhan ekonomi Indonesia mengalami
                  pertumbuhan mencapai 5,27%.
                  2 periode yuk, biar 10,54%.
                </p>
              </div>
            </div>
            <div class="thumb right">
              <!-- <img src="@/assets/user.svg" alt="thumbnail"> -->
              <div class="user-title">
                <h5>Anik Kemala</h5>
                <span>@anik_kemala</span>
              </div>
            </div>
          </div>
        </div>
        <div class="heading-info">
          <div class="info-status">
            <status-wordstadium/>Status
          </div>
          <div class="info-placeholder">Giliran Anik Kemala menulis argumen...</div>
          <div class="info-action">
            <button class="btn" type="button" @click.prevent="showDetail = !showDetail">Detail debat
              <expand-more v-if="showDetail"/>
              <expand-collapse v-else/>
            </button>
          </div>
        </div>
        <div class="heading-detail" :class="{show: showDetail}">
          <table>
            <tbody>
              <tr>
                <td colspan="2">
                  <span>Bidang kajian</span>
                  <span class="badge">ekonomi</span>
                </td>
                <td>
                  <span>Published on</span>
                  <date-secondary/>20 Maret 2019
                </td>
              </tr>
              <tr>
                <td>
                  <span>Date</span>
                  <date-secondary/>Selasa, 24 Maret 2019
                </td>
                <td>
                  <span>Time</span>
                  <clock/>16.00 WIB
                </td>
                <td>
                  <span>Saldo Waktu</span>
                  <saldo/>120 menit
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="conversations">
          <div
            class="conversation"
            v-for="conversation in conversations"
            :class="conversation.in_right ? 'right' : 'left'"
            :key="conversation.id"
          >
            <div class="conversation-text">
              <p class="has--dashed" v-html="conversation.description"></p>
            </div>
            <div class="conversation-action">
              <div class="action-time">{{ conversation.created_at_in_word }}</div>
              <div class="action-info">
                <div class="info-duration">Estimasi baca {{ conversation.time }}</div>
                <div class="info-like">
                  <button class="btn">
                    <appreciate-yellow v-if="conversation.clapped"/>
                    <appreciate-black v-else/>
                  </button>
                  {{ conversation.like_count }}
                </div>
              </div>
              <div class="action-mine" v-if="conversation.clapped">You clapped to this argument</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="widget-wrapper">
      <div class="widget">&nbsp;</div>
    </template>
  </layout-wordstadium>
</template>

<script>
import {
  ExpandMore,
  ExpandCollapse,
  LiveRed,
  StatusWordstadium,
  AppreciateYellow,
  AppreciateBlack,
  DateSecondary,
  Clock,
  Saldo
} from '@/svg/icons'
import LayoutWordstadium from '@/layout/Wordstadium'

export default {
  name: 'WordStadiumDebate',
  components: {
    ExpandMore,
    ExpandCollapse,
    LiveRed,
    StatusWordstadium,
    LayoutWordstadium,
    AppreciateYellow,
    AppreciateBlack,
    DateSecondary,
    Clock,
    Saldo
  },
  data() {
    return {
      showDetail: false,
      conversations: [
        {
          id: 1,
          in_right: true,
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.',
          created_at_in_word: '40 menit yang lalu',
          time: '5 menit',
          like_count: 20,
          clapped: true
        },
        {
          id: 2,
          in_right: false,
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.',
          created_at_in_word: '40 menit yang lalu',
          time: '5 menit',
          like_count: 20,
          clapped: false
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  color: #999999
  background-color: #ffffff
  border-radius: 8px
  border: 1px solid #ececec
  padding: 0
  margin: 0

.heading
  height: 192px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background-color: #512da8
  border-top-left-radius: 8px
  border-top-right-radius: 8px

  // .img-float
  //   width: 88px
  //   height: 88px
  //   border-radius: 60px
  //   position: fixed

  //   &.left
  //     float: left

  //   &.right
  //     float: right

  .status
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    color: #ffffff
    text-transform: uppercase
    height: 54px
    font-family: Lato
    font-size: 12px
    font-weight: 400
    line-height: 12px

    svg
      width: 18px
      height: 18px
      margin-right: 10px

  .detail
    display: flex
    flex-direction: row
    align-items: space-between
    justify-content: center
    height: 100%
    width: 75%
    border-top: 1px solid #ffffff
    margin: 0

    .thumb
      flex: 0 27%
      // border: 1px solid #ffffff

      img
        width: 88px
        height: 88px
        border-radius: 60px
        // position: fixed

      &.left, &.right
        padding: 14px

      &.left
        text-align: left

      &.right
        text-align: right

      &.center
        flex: 1
        display: flex
        text-align: center
        align-items: center
        flex-direction: column
        justify-content: space-between
        margin: 0

      .versus
        height: 56px
        width: 56px
        border: 1px solid #ffffff
        border-top: none
        color: #ffffff
        font-weight: 800
        font-size: 24px
        text-transform: uppercase
        display: flex
        align-items: center
        justify-content: center

      .description
        font-family: BwModelicaSS01, Lato
        font-size: 14px
        font-weight: 700
        line-height: 16px
        letter-spacing: 0.34px
        color: #ffffff

.user-title
  h5
    font-family: BwModelicaSS01, Lato
    font-size: 14px
    font-weight: 800
    line-height: 16px
    color: #ffffff
    margin: 0
    padding: 0

  span
    font-family: Lato
    font-weight: bold
    font-size: 12px
    line-height: 25px
    color: #ffffff

.heading-info
  display: flex
  align-items: center
  justify-content: center
  flex-direction: row
  height: 40px
  background-color: #f9f9f9

  .info-status, .info-action
    font-family: BwModelicaSS01, Lato
    font-size: 14px
    font-weight: 800
    line-height: 33px
    color: #212121
    flex: 0 120px
    display: flex
    justify-content: center
    align-items: center

    svg
      width: 24px
      height: 24px
      margin-right: 8px

  .info-placeholder
    font-family: Lato
    font-style: italic
    font-size: 14px
    font-weight: 400
    line-height: 33px
    color: #7c7c7c
    flex: 1

  .info-action
    .btn
      background-color: transparent

.heading-detail
  padding: 22px
  opacity: 0
  display: none
  align-items: center
  justify-content: center
  visibility: hidden
  transition: 0.3s ease-in-out

  &.show
    display: flex
    opacity: 1
    visibility: visible

  table
    border-collapse: collapse
    // border-radius: 8px
    overflow: hidden

    tr
      td
        // background-color: #e9ebeb
        // border: 1px solid #ffffff
        border: 1px solid #ececec
        color: #212121
        min-width: 200px
        padding: 14px
        font-weight: 700
        font-size: 14px
        letter-spacing: 0.34px
        line-height: 16px

        span
          font-size: 12px
          font-weight: 400
          line-height: 21px
          display: block
          color: #aaaaaa

        .badge
          font-family: Lato
          font-size: 10px
          font-weight: 400
          font-style: italic
          line-height: 10px
          height: 16px
          border-radius: 4px
          display: inline-block
          border: 1px solid #f9d65c
          padding: 2px
          min-width: 56px
          text-align: center
          color: #4f4f4f
          // display: inline-lo

        svg
          width: 16px
          height: 16px
          margin-right: 8px

.widget
  background-color: #ffffff
  width: 100%
  height: 100%
  border-radius: 8px

.conversations
  background-color: #ffffff
  min-height: 300px

  .conversation
    font-family: Lato
    font-weight: 400
    width: 50%
    padding: 16px
    margin-top: -80px

    &.right
      margin-left: auto

      .has--dashed
        padding-right: 18px
        border-right: 5px solid #eb3037

    &.left
      margin-left: 0

      .has--dashed
        padding-left: 18px
        border-left: 5px solid #08bda8

    &:first-child
      margin-top: 0

    .conversation-text
      font-size: 14px
      line-height: 21px
      display: flex
      align-items: center
      justify-content: center
      flex-direction: row
      color: #212121

      // .line
      //   background-color: #eb3037
      //   width: 5px
      //   height: 100%
      //   border-radius: 2px

      // &:after
      //   content: ''
      //   background-color: #eb3037
      //   width: 5px
      //   height: 100%
      //   border-radius: 2px

    .conversation-action
      font-size: 10px
      line-height: 12px
      letter-spacing: 0.15px
      color: #7c7c7c

      .action-time
        text-align: right
        letter-spacing: 0

      .action-info
        height: 40px
        background-color: #f4f4f4
        display: flex
        align-items: center
        justify-content: space-between
        padding: 0 14px
        margin: 8px 0

        .info-duration
          flex: 1

        .info-like
          flex: 0 55px

          .btn
            background-color: transparent
            height: 30px
            width: 30px
            padding: 0

          svg
            width: 24px
            height: 24px

      .action-mine
        font-size: 10px
        line-height: 12px
        letter-spacing: 0.15px
        text-align: right

</style>
