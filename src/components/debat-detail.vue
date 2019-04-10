<template>
<div class="debat-detail-container">
  <div class="header">
    <div class="title">{{title}}</div>
    <div class="challenge-detail">
      <div class="challenger-info">
        <div class="avatar-container">
          <img :src="challenger.avatar.url" :alt="challenger.username">
        </div>
        <div class="profile-info">
          <div class="name">{{challenger.name}}</div>
          <div class="username">{{challenger.username}}</div>
        </div>
      </div>
      <div v-if="opponent != null" class="challenger-info --opponent">
        <div class="avatar-container">
          <img v-if="opponent.avatar == null" src="~@/assets/user.svg" alt="opponent">
          <img v-else :src="opponent.avatar.url" :alt="opponent.username">
        </div>
        <div class="profile-info">
          <div class="name">{{opponent.name}}</div>
          <div class="username">{{opponent.username}}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <slot name="header-footer"></slot>
    </div>
  </div>
  <div class="share-menu" style="position:relative">
    <button type="button" class="share-btn"
      @click.prevent="isSharing = true">
      <i class="icon icon-share"></i> Bagikan
    </button>
    <button type="button" class="menu-btn"
      :class="{ 'active': isDropdownActive }"
      @click.prevent="isDropdownActive = !isDropdownActive">
      <i class="icon icon-menu"></i>
    </button>
    <div class="dropdown-content">
      <ul>
        <li>
          <button @click.stop="copy()">
            <link-icon></link-icon> Salin Tautan
          </button>
        </li>
        <li>
          <button @click.stop="share()">
            <share-icon></share-icon> Bagikan
          </button>
        </li>
      </ul>
    </div>
  </div>
  <div class="debat-banner debat-content">
    <div class="banner-text-1">{{bannerText1}}</div>
    <div class="banner-text-2">{{bannerText2}}</div>
    <div class="debat-subcontent">
      <slot name="debat-subcontent" :debat="debat"></slot>
    </div>
  </div>
  <div class="debat-detail">
    <div class="title">Challenge Detail</div>
    <ul class="tag-list">
      <li class="tag-item">{{debat.topic_list[0]}}</li>
    </ul>
    <debat-source-panel
      v-if="withSource">
    </debat-source-panel>
    <div class="debat-subtitle">
      {{debat.statement}}
    </div>
    <div v-if="withOpponent" class="detail-lawan">
      <div class="detail-lawan-title">
        Lawan debat
      </div>
      <div class="meta">
        <div class="avatar-container">
          <img v-if="opponent.avatar == null" src="~@/assets/user.svg" alt="trump" class="avatar">
          <img v-else :src="opponent.avatar.url" :alt="opponent.username" class="avatar">
          <i class="icon icon-twitter"></i>
        </div>
        <div class="user-data">
          <div class="name">{{opponent.full_name}}</div>
          <div class="username">@{{opponent.username}}</div>
        </div>
      </div>
    </div>
    <div class="time-container">
      <div class="title">Date & Time</div>
      <div class="date">
        <i class="icon icon-calendar"></i>
        <div class="date-value">
          <!-- Selasa, 24 Maret 2019 -->
          {{debat.show_time_at | dateFormat('dddd, DD MMMM YYYY')}}
        </div>
      </div>
      <div class="time">
        <i class="icon icon-clock"></i>
        <div class="time-value">
          <!-- 16.00 -->
          {{debat.show_time_at | dateFormat('HH.mm')}}
        </div>
      </div>
    </div>
    <div class="time-saldo">
      <div class="title">Saldo Waktu</div>
      <div class="description">Kamu dan lawan debatmu mendapat saldo waktu yang sama:</div>
      <div class="saldo-value">
        <i class="icon icon-hourglass"></i> <b>{{debat.time_limit}}</b>&nbsp;menit
      </div>
    </div>
  </div>
  <ul class="posting-list">
    <li class="posting-item">
      <div class="avatar-container">
        <img class="avatar" src="~@/assets/user.svg" alt="avatar-username">
      </div>
      <div class="name">Raja Kampreta</div>
      <div class="text">
        Berjuang bersama untuk Umat
      </div>
      <div class="time">
        Posted 8 days ago
      </div>
    </li>
    <li class="posting-item">
      <div class="avatar-container">
        <img class="avatar" src="~@/assets/user.svg" alt="avatar-username">
      </div>
      <div class="name">Raja Kampreta</div>
      <div class="text">
        Berjuang bersama untuk Umat
      </div>
      <div class="time">
        Posted 8 days ago
      </div>
    </li>
  </ul>

  <modal-share v-if="isSharing"
    @close="isSharing = false"
    :url="shareURL"
    :id="shareID"
    :title="shareTitle"
  ></modal-share>
</div>
</template>

<script>
import { cleanURL } from '@/utils'
import { LinkIcon, ShareIcon } from '@/svg/icons'
import ModalShare from '@/components/modal-share'
import DebatSourcePanel from '@/components/debat-source-panel'
export default {
  name: 'DebatDetail',
  props: {
    debat: Object,
    title: String,
    withSource: Boolean,
    withOpponent: Boolean,
    bannerText1: String,
    bannerText2: String,
    shareTitle: String,
    shareID: String,
    challenger: {
      required: true,
      type: Object,
      validator(value) {
        return value.avatar && value.username && value.id && value.full_name
      }
    },
    opponent: Object
  },
  components: {
    DebatSourcePanel,
    ModalShare,
    LinkIcon,
    ShareIcon
  },
  data() {
    return {
      isSharing: false,
      isDropdownActive: false
    }
  },
  computed: {
    shareURL() {
      return `${location.pathname}`
    }
  },
  methods: {
    share() {
      this.isSharing = true
    },
    copy() {
      this.isDropdownActive = false
      const url = cleanURL(`${process.env.SHARE_DOMAIN}${location.pathname}`)
      this.$clipboard(url)
      this.$toaster.info('Berhasil menyalin teks.')
    }
  }
}
</script>


<style lang="sass" scoped>
.debat-detail-container
  display: flex
  flex-direction: column
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
    font-family: 'Bw Modelica'
    font-size: 22px
    font-weight: bold
    font-stretch: condensed
    line-height: 1.23
    text-align: center
    color: #ffffff
    display: flex
    align-items: flex-end
    justify-content: center
  .footer
    text-transform: uppercase
    font-size: 14px
    font-weight: 800
    font-stretch: condensed
    line-height: 0.86
    letter-spacing: 0.7px
    text-align: center
    color: #ffffff
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
        img
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
  .dropdown-content
    padding: 5px 10px
  .menu-btn.active + .dropdown-content
    display: block
  .dropdown-content button
    width: 100%
    display: flex
    justify-content: flex-start
    align-items: center
    text-indent: 10px
    background: white
    padding: 10px 5px
    border: none
    cursor: pointer
    svg
      flex: 0 0 25px

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
  .banner-text-1,
  .banner-text-2
    font-size: 32px
    font-weight: 800
    font-stretch: condensed
    line-height: 1.19
    text-align: left
    color: #f6b42a
  .banner-text-1
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
