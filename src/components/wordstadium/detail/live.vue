<template>
  <layout-wordstadium>
    <template slot="main-content">
      <div class="container">
        <div class="heading">
          <img v-if="challenger.avatar == null" src="@/assets/user.svg" alt="thumbnail" class="img-float left">
          <img v-else :src="challenger.avatar.url" :alt="challenger.username" class="img-float left">
          <img v-if="opponent.avatar == null" src="@/assets/user.svg" alt="thumbnail" class="img-float left">
          <img v-else :src="opponent.avatar.url" :alt="opponent.username" class="img-float right">
          <div class="status">
            <live-red/>Live Now
          </div>
          <div class="detail">
            <div class="thumb left">
              <div class="user-title">
                <h5>{{challenger.full_name}}</h5>
                <span>@{{challenger.username}}</span>
              </div>
            </div>
            <div class="thumb center">
              <div class="versus">
                <vs-icon/>
              </div>
              <div class="description">
                <p>
                  {{debat.statement}}
                </p>
              </div>
            </div>
            <div class="thumb right">
              <div class="user-title">
                <h5 class="in--active">{{opponent.full_name}}</h5>
                <span>@{{opponent.username}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="heading-info">
          <div class="info-status">
            <status-wordstadium/>Status
          </div>
          <div class="info-placeholder">Giliran {{opponent.full_name}} menulis argumen...</div>
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
                  <span class="badge">{{debat.topic_list[0]}}</span>
                </td>
                <td>
                  <span>Published on</span>
                  <date-secondary/>{{debat.created_at | dateFormat('DD MMMM YYYY')}}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Date</span>
                  <date-secondary/>{{debat.show_time_at | dateFormat('dddd, DD MMMM YYYY')}}
                </td>
                <td>
                  <span>Time</span>
                  <clock/>16.00 WIB
                  <clock/>{{debat.show_time_at | dateFormat('HH.mm')}} WIB
                </td>
                <td>
                  <span>Saldo Waktu</span>
                  <saldo/>{{debat.time_limit}} menit
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="conversations">
          <div class="conversation"
            v-for="word in words"
            :class="word.in_right ? 'right' : 'left'"
            :key="word.id">
            <div class="conversation-text">
              <p class="has--dashed" v-html="word.body"></p>
            </div>
            <div class="conversation-action">
              <div class="action-time">{{ word.created_at | dateDistanceFromNow }}</div>
              <div class="action-info">
                <div class="info-duration">Estimasi baca {{ word.read_time }}</div>
                <div class="info-like">
                  <button class="btn" type="button"
                    :disabled="word.is_clap"
                    @click.prevent="clap(word)">
                    <appreciate-yellow v-if="word.is_clap"/>
                    <appreciate-black v-else/>
                  </button>
                  {{ word.clap_count }}
                </div>
              </div>
              <div class="action-mine" v-if="word.is_clap">You clapped to this argument</div>
            </div>
          </div>
        </div>
      </div>
      <div class="container row conversation--area"
        v-if="isOwned">
        <div class="conversation-area">
          <div class="conversation-textarea">
            <!-- Using @paste.prevent to disallow paste -->
            <textarea
              ref="inputArgument"
              placeholder="Tulis argumen anda di sini..."
              name="komentar"
              cols="30"
              rows="4"
              v-model="argument"
              @keydown.enter="onSubmitArgument($event)"
            ></textarea>
            <span
              class="conversation-textarea__info"
            >{{ argument.length }} / 255</span>
          </div>
          <div class="conversation-action">
            <button class="btn cancel">BATAL</button>
            <button class="btn publish"
              :class="{enabled: argument.length > 0}"
              @click.prevent="onSubmitArgument($event)"
            >PUBLISH</button>
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
        <div v-if="!isOwned" class="comment-area">
          <img src="@/assets/user.svg" alt="user">
          <textarea placeholder="Tulis komentar"
            ref="inputComment"
            name="komentar"
            cols="30"
            rows="3"
            v-model="comment"
            @keydown.enter="onSubmitComment($event)"
          ></textarea>
        </div>
        <div class="activity-list">
          <button v-if="commentSort === 'asc'"
            type="button"
            class="activity-collapse"
            @click.prevent="commentSort = 'desc'">Paling baru
            <filter-icon class="comment-sort" :class="commentSort"/>
          </button>
          <button v-if="commentSort === 'desc'"
            type="button"
            class="activity-collapse"
            @click.prevent="commentSort = 'asc'">Paling lama
            <filter-icon class="comment-sort" :class="commentSort"/>
          </button>
          <div class="activity-content" v-for="comment in comments" :key="comment.id">
            <div class="activity-thumbnail">
              <img :src="comment.author.avatar.url" :alt="comment.user" v-if="comment.author.avatar">
              <img class="image" src="@/assets/user.svg" alt="avatar" v-else>
            </div>
            <div class="activity-description">
              <p>
                <strong>{{ comment.author.full_name }}</strong>
                {{ comment.body }}
              </p>
              <span class="activity-time">{{ comment.created_at | dateDistanceFromNow }}</span>
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
  Comment,
  FilterIcon,
  VsIcon
} from '@/svg/icons'
import LayoutWordstadium from '@/layout/Wordstadium'
import {mapGetters, mapActions} from 'vuex'
import * as WordstadiumAPI from '@/services/api/wordstadium'

export default {
  name: 'DetailLive',
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
    Comment,
    FilterIcon,
    VsIcon
  },
  data() {
    return {
      showDetail: false,
      argument: '',
      comment: '',
      commentSort: 'asc',
    }
  },
  computed: {
    ...mapGetters({
      challenge: 'wordstadium/challengeById',
      wordsById: 'wordstadium/wordsById',
      commentsById: 'wordstadium/commentsById'
    }),
    debatId() { return this.$route.params.id },
    debat() { return this.challenge(this.debatId) },
    challenger() { return this.debat.audiences.find(it => it.role === 'challenger') },
    opponent() { return this.debat.audiences.find(it => it.role === 'opponent') },
    words() { return this.wordsById(this.debatId) },
    comments() {
      const comments = (this.commentsById(this.debatId) || [])
        .map((it) => ({ ...it, date: new Date(it.created_at) }))
      if (this.commentSort === 'asc') {
        return comments.slice().sort((a, b) => b.date - a.date)
      }
      return comments.slice().sort((a, b) => a.date - b.date)
    },
    me() { return this.$store.state.profile.user },
    isOwned() {
      return this.challenger.username === this.me.username || this.opponent.username === this.me.username
    }
  },
  methods: {
    ...mapActions({
      getChallenge: 'wordstadium/getChallengeById',
      getWords: 'wordstadium/getWords',
      getComments: 'wordstadium/getComments',
      clap: 'wordstadium/clap',
      postComment: 'wordstadium/postComment',
      postArgument: 'wordstadium/postArgument'
    }),
    onSubmitComment(event) {
      if (event.shiftKey) return false
      event.preventDefault()
      this.$refs.inputComment.disabled = true
      this.postComment({ challenge_id: this.debat.id, words: this.comment })
        .then(() => {
          this.comment = ''
          this.$refs.inputComment.disabled = false
        })
        .catch(() => {
          this.$refs.inputComment.disabled = false
        })
    },
    onSubmitArgument(event) {
      if (event.shiftKey) return false
      event.preventDefault()
      this.$refs.inputArgument.disabled = true
      this.postArgument({ challenge_id: this.debat.id, words: this.argument })
        .then(() => {
          this.argument = ''
          this.$refs.inputArgument.disabled = false
        })
        .catch(() => {
          this.$refs.inputArgument.disabled = false
        })
    },
  },
  mounted() {
    this.getChallenge(this.debatId)
    this.getWords({ id: this.debatId })
    this.getComments({ id: this.debatId })
  }
}
</script>

<style lang="sass" scoped>
.comment-sort
  &.asc
    transform: scaleY(1)
  &.desc
    transform: scaleY(-1)

.container.row.conversation--area
  margin-top: 20px

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
        &.enabled
          background-color: #08bda8

.container
  color: #999999
  background-color: #ffffff
  border-radius: 8px
  border: 1px solid #ececec
  padding: 0
  margin: 0
  overflow: hidden

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
  background: url('~@/assets/banner-live-now-full.svg') no-repeat center
  background-size: cover
  position: relative
  overflow: hidden
  .img-float
    width: 88px
    height: 88px
    top: -15px
    left: auto
    right: auto
    position: absolute
    z-index: 4
    border-radius: 50%
    &.left
      left: -15px
      border-radius: 0 8px 60px 0
    &.right
      right: -15px
      border-radius: 8px 0 0 60px

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
      top: -20px
      left: auto
      right: auto
      position: absolute
      z-index: 4
      border-radius: 50%
      &.left
        left: -15px
      &.right
        right: -5px

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
        flex: 1 0 100%
    &.left
      margin-left: 0
      .has--dashed
        padding-left: 18px
        border-left: 5px solid #08bda8
        flex: 1 0 100%

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
    margin: 0 0 20px
    background: none
    border: none
    width: 100%
    padding: 5px 10px
    cursor: pointer

    svg
      width: 14px
      height: 14px
      margin-left: 8px

  .activity-content
    display: flex
    justify-content: flex-start
    align-items: flex-start
    flex-direction: row

    .activity-thumbnail
      flex: 0 0 40px
      height: 40px
      padding: 4px 6px 0 10px

    .activity-description
      color: #4f4f4f
      font-family: Lato
      font-weight: 400
      font-size: 12px
      line-height: 14px
      flex: 1 0 auto
      margin-left: 10px
      p
        margin: 0
        padding: 0
        max-width: 150px
        white-space: pre-line
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
