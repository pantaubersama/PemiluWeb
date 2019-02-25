<template>
  <layout-wordstadium>
    <template slot="main-content">
      <div class="container">
        <div class="heading">
          <div class="status">
            <live-red/>Live Now
          </div>
          <div class="detail">
            <img src="@/assets/dildo.jpg" alt="thumbnail" class="img-float left">
            <img src="@/assets/dildo.jpg" alt="thumbnail" class="img-float right">
            <div class="thumb left">
              <div class="user-title">
                <h5 class="in--active">Ratu CebonganYK</h5>
                <span>@ratu_cebonganYK</span>
              </div>
            </div>
            <div class="thumb center">
              <div class="versus">
                <vs-icon/>
              </div>
              <div class="description">
                <p>
                  2018 pertumbuhan ekonomi Indonesia mengalami
                  pertumbuhan mencapai 5,27%.
                  2 periode yuk, biar 10,54%.
                </p>
              </div>
            </div>
            <div class="thumb right">
              <div class="user-title">
                <h5>Raja Kampreta</h5>
                <span>@raja_kampreta</span>
              </div>
            </div>
          </div>
        </div>
        <div class="heading-duration">
          <div class="duration-icon">
            <saldo-clock/>
          </div>
          <div class="duration-time">
            <span class="duration-text">sisa waktu anda</span>
            <span class="duration-clock">40 Menit</span>
          </div>
        </div>
        <div class="heading-info">
          <div class="info-status">
            <status-wordstadium/>Status
          </div>
          <div class="info-placeholder">Giliran Raja Kampreta menulis argumen...</div>
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
      <div class="container row">
        <div class="conversation-area">
          <div class="conversation-textarea">
            <!-- Using @paste.prevent to disallow paste -->
            <textarea
              placeholder="Tulis argumen anda di sini..."
              name="komentar"
              cols="30"
              rows="4"
              v-model="argument"
            ></textarea>
            <span
              class="conversation-textarea__info"
            >{{ argumentCharacters.count }} / {{ argumentCharacters.max }}</span>
          </div>
          <div class="conversation-action">
            <button class="btn cancel">BATAL</button>
            <button class="btn publish">PUBLISH</button>
          </div>
        </div>
      </div>
    </template>
    <template slot="widget-wrapper">
      <div class="sidebar-activity">
        <div class="activity-title">
          <div class="icon">
            <comment/>
          </div>
          <h5>Komentar ({{ comments.length }})</h5>
        </div>
        <div class="comment-area">
          <img src="@/assets/dildo.jpg" alt="user">
          <textarea placeholder="Tulis komentar" name="komentar" cols="30" rows="3"></textarea>
        </div>
        <div class="activity-list">
          <div class="activity-collapse">Paling baru
            <filter-icon/>
          </div>
          <div class="activity-content" v-for="comment in comments" :key="comment.id">
            <div class="activity-thumbnail">
              <img :src="comment.avatar" :alt="comment.user" v-if="comment.avatar">
              <!-- TODO: Please change this image with default avatar -->
              <img src="@/assets/dildo.jpg" alt="avatar" v-else>
            </div>
            <div class="activity-description">
              <p>
                <strong>{{ comment.user }}</strong>
                {{ comment.text }}
              </p>
              <span class="activity-time">{{ comment.created_at_in_word }}</span>
            </div>
          </div>
        </div>
      </div>
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
  Saldo,
  SaldoClock,
  Comment,
  FilterIcon,
  VsIcon
} from '@/svg/icons'
import LayoutWordstadium from '@/layout/Wordstadium'

export default {
  name: 'WordStadiumOwnDebate',
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
    Saldo,
    SaldoClock,
    Comment,
    FilterIcon,
    VsIcon
  },
  data() {
    return {
      argument: '',
      argumentCharacters: {
        count: 0,
        max: 255
      },
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
      ],
      comments: [
        {
          id: 1,
          user: 'Ratu CebonganYK',
          avatar: null,
          text:
            'aku memberikan komentar pada debat ini. Komentar yang sangat komentar sekali.',
          created_at_in_word: '5 menit yang lalu'
        },
        {
          id: 2,
          user: 'Ratu CebonganYK',
          avatar: null,
          text:
            'aku memberikan komentar lagi pada debat ini. Komentar yang sangat komentar sekali.',
          created_at_in_word: '7 menit yang lalu'
        }
      ]
    }
  },
  watch: {
    argument(text, oldText) {
      this.argumentCharacters.count = text.length
      if (text.length > this.argumentCharacters.max) {
        this.argument = oldText
      }
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
  overflow: hidden

  &.row
    margin-top: 16px

.heading
  height: 192px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background-color: #512da8
  border-top-left-radius: 8px
  border-top-right-radius: 8px
  z-index: 1

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

    .img-float
      width: 88px
      height: 88px
      top: auto
      left: auto
      right: auto
      position: fixed
      z-index: 4

      &.left
        transform: translate(-364px, -44px)
        border-radius: 8px 0 60px 0

      &.right
        transform: translate(364px, -44px)
        border-radius: 0 8px 0 60px

    .thumb
      flex: 0 27%

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
        color: #ffffff
        font-weight: 800
        font-size: 24px
        text-transform: uppercase
        display: flex
        align-items: center
        justify-content: center
        position: relative
        top: -1px

      .description
        font-family: BwModelica, Lato
        font-size: 14px
        font-weight: 400
        line-height: 16px
        letter-spacing: 0.34px
        color: #ffffff

.left
  .user-title
    h5
      &:after
        position: absolute
        content: ''
        background-color: #eb3037
        height: 8px
        width: 8px
        z-index: 2
        margin: 4px 0 0 8px
        border-radius: 100%
        z-index: 2

      &.in--active
        &:after
          background-color: #08bda8

.right
  .user-title
    h5
      &:before
        position: absolute
        content: ''
        background-color: #eb3037
        height: 8px
        width: 8px
        z-index: 2
        margin: 4px 0 0 -15px
        border-radius: 100%
        z-index: 2

      &.in--active
        &:before
          background-color: #08bda8

.user-title
  h5
    font-family: BwModelicaSS01, Lato
    font-size: 14px
    font-weight: 500
    line-height: 16px
    color: #ffffff
    margin: 0
    padding: 0

  span
    font-family: Lato
    font-weight: 400
    font-size: 12px
    line-height: 25px
    color: #ffffff

.heading-duration
  display: flex
  align-items: center
  justify-content: center
  flex-direction: row
  height: 72px
  background-color: #7c5bc0

  .duration-icon
    height: 30px
    width: 34px
    padding: 0
    margin: 0
    display: flex
    justify-content: center
    align-items: center

    svg
      width: 32px
      height: 32px
      fill: #ffffff

  .duration-time
    width: 100px
    height: 32px
    display: flex
    align-items: center
    justify-content: space-around
    flex-direction: column
    color: #ffffff

    .duration-text
      font-family: BwModelicaSS01, Lato
      font-size: 10px
      font-weight: 400
      line-height: 12px
      height: 14px
      letter-spacing: 0.5px
      text-transform: lowercase

    .duration-clock
      font-family: BwModelicaSS01, Lato
      font-size: 16px
      font-weight: 700
      line-height: 12px
      height: 16px
      letter-spacing: 0.8px
      text-transform: uppercase

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
    overflow: hidden

    tr
      td
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

.conversation-area
  padding: 16px
  width: 100%

  .conversation-textarea
    margin: 0
    padding: 0

    &:before
      position: absolute
      content: ''
      background-color: #cbcbcb
      height: 96px
      width: 5px
      z-index: 2
      margin: 0
      border-radius: 2px

    textarea
      font-family: Lato
      font-style: italic
      font-size: 14px
      line-height: 16px
      border: none
      overflow: auto
      outline: none
      box-shadow: none
      resize: none
      background: #f9f9f9
      width: calc(100% - 16px)
      padding: 16px
      margin-left: 16px

      &::placeholder
        color: #aaaaaa

    &__info
      color: #aaaaaa
      font-family: Lato
      font-size: 10px
      line-height: 12px
      display: block
      text-align: right

  .conversation-action
    display: flex
    justify-content: flex-end
    align-items: center
    flex-direction: row
    margin-top: 16px

    .btn
      font-family: Lato
      font-size: 12px
      line-height: 15px
      height: 40px
      width: 120px
      border-radius: 2px
      letter-spacing: 1.2px
      transition: all .3s ease

      &:hover, &:active, &:focus
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33)

      &.cancel
        color: #cbcbcb
        background-color: transparent
        margin-right: 8px

      &.publish
        color: #ffffff
        background-color: #cbcbcb

.sidebar-activity
  background-color: #ffffff
  width: 100%
  border: 1px solid #ececec
  border-radius: 8px

  img
    width: 24px
    height: 24px
    border-radius: 50%

.activity-title
  height: 55px
  display: flex
  justify-content: space-between
  align-items: center
  flex-direction: row

  .icon
    display: flex
    justify-content: center
    align-items: center
    width: 60px
    height: 100%

    svg
      width: 24px
      height: 24px

  h5
    font-family: BwModelica, Lato
    font-size: 14px
    font-weight: 400
    line-height: 22px
    display: inline-block
    flex: 1
    align-self: center
    height: 28px
    margin: 0
    padding-left: 40px
    text-transform: uppercase

.comment-area
  background-color: #f9f9f9
  display: flex
  justify-content: center
  align-items: flex-start
  flex-direction: row
  border-radius: 2px
  margin-bottom: 25px
  min-height: 55px

  img
    margin: 6px

  textarea
    font-family: Lato
    font-style: italic
    font-size: 12px
    line-height: 16px
    letter-spacing: 0.29px
    border: none
    overflow: auto
    outline: none
    box-shadow: none
    resize: none
    background: #f9f9f9
    margin: 6px

    &::placeholder
      color: #aaaaaa

.activity-list
  margin: 0

  .activity-collapse
    font-family: Lato
    font-weight: 500
    font-size: 11px
    line-height: 13px
    text-align: right
    color: #aaaaaa
    margin: 4px 16px 10px

    svg
      width: 14px
      height: 14px
      margin-left: 8px

  .activity-content
    display: flex
    justify-content: center
    align-items: flex-start
    flex-direction: row

    .activity-thumbnail
      flex: 0 80px
      height: 100%
      padding: 4px 6px 0 10px

    .activity-description
      color: #4f4f4f
      font-family: Lato
      font-weight: 400
      font-size: 12px
      line-height: 14px

      p
        margin: 0
        padding: 0

        strong
          color: #212121
          letter-spacing: 0.29px

      .activity-time
        color: #aaaaaa
        font-size: 10px
        line-height: 12px
        text-align: right
        float: right
        padding: 4px 12px
        margin-bottom: 16px

</style>
