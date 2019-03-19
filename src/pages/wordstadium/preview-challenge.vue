<template>
  <timeline-layout>
    <div slot="main-content" class="page card card-tabs container">
      <div class="heading">
        <div class="status">Promote Your Challenge</div>
        <div class="detail">
          <div class="versus">
            <vs-icon/>
          </div>
          <div class="description">OPEN CHALLENGE</div>
        </div>
        <div class="user-info">
          <router-link to="/profile">
            <img src="@/assets/user.svg" alt="user">
            <div class="user-title">
              <h5>Ratu CebonganYK</h5>
              <span>@ratu_cebonganYK</span>
            </div>
          </router-link>
        </div>
        <div class="user-info user-info__right">
          <router-link to="/profile/raja_kampreta">
            <div class="mask-avatar">
              <span>?</span>
              <img src="@/assets/user.svg" alt="user">
            </div>
            <div class="user-title">
              <h5>Raja Kampreta</h5>
              <span>@raja_kampreta</span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="content-preview">
        <h2 class="head head--default">Selangkah lagi,</h2>
        <h2 class="head head--primary">
          Promosikan tantangan
          debat kamu!
        </h2>
        <div class="content-sosmed">
          <div class="sosmed sosmed--twitter">
            <div class="sosmed-icon">
              <twitter-icon/>
            </div>
            <div class="sosmed-title">
              <h5>Twitter</h5>
              <p>Tweet tantangan kamu sekarang. Undang temanmu untuk berdebat di sini.</p>
            </div>
            <div class="sosmed-switch">
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class="sosmed sosmed--facebook">
            <div class="sosmed-icon">
              <facebook-icon/>
            </div>
            <div class="sosmed-title">
              <h5>Facebook</h5>
              <p>Post tantangan debatmu melalui Facebook. Undang temanmu untuk berdebat di sini.</p>
            </div>
            <div class="sosmed-switch">
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class="centered sosmed-action">
            <a href="javascript:void(0)" class="center btn btn-primary">PUBLIKASIKAN</a>
          </div>
        </div>
      </div>
      <div class="content-detail">
        <h5>CHALLENGE DETAIL</h5>
        <div class="detail-row">
          <span class="badge">ekonomi</span>
          <div class="alert alert-preview alert-secondary fade show" role="alert">
            <div class="link">https://twitter.com/ident_it/status/997050576012591104</div>
            <div class="preview-content">
              <div class="thumbnail-avatar thumbnail-avatar__large">
                <icon-twitter/>
                <img src="@/assets/user.svg" alt="user">
              </div>
              <div class="preview-content__info">
                <h5>
                  Raja Kampreta
                  <small>@raja_kampreeta . 5 des</small>
                </h5>
                <p>
                  Prabowo berbasis militer. Disiplin. Sandiaga berbasis wiraswasta.
                  Kreatif. Perpaduan keduanya akan sangat dibutuhkan Indonesia
                  untuk ekonomi ke depannya. #2019gantipresiden yuk!
                </p>
              </div>
            </div>
          </div>
          <p>
            2018 pertumbuhan ekonomi Indonesia mengalami pertumbuhan mencapai 5,27%.
            2 periode yuk, biar 10,54%.
          </p>
        </div>
        <div class="detail-row">
          <h6>Lawan Debat</h6>
          <div class="detail-lawan">
            <div class="thumbnail-avatar">
              <icon-twitter/>
              <img src="@/assets/user.svg" alt="user">
            </div>
            <div class="detail-lawan__user">
              <h5>Raja Kampreta</h5>
              <small>@raja_kampreeta</small>
            </div>
          </div>
        </div>
        <div class="detail-row">
          <h6>Date & Time</h6>
          <div class="input-group input-bidang">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <date-secondary/>
              </span>
            </div>
            <input
              value="Selasa, 24 Maret 2019"
              type="text"
              class="form-control"
              placeholder="Tanggal"
              readonly
            >
          </div>
          <div class="input-group input-bidang">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <clock/>
              </span>
            </div>
            <input value="16.00" type="text" class="form-control" placeholder="Waktu" readonly>
          </div>
        </div>
        <div class="detail-row">
          <h6>Saldo Waktu</h6>
          <p>Kamu dan lawan debatmu mendapat saldo waktu yang sama:</p>
          <div class="input-group input-bidang input-bidang__saldo">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <saldo/>
              </span>
            </div>
            <input
              value="120"
              type="text"
              class="form-control"
              placeholder="Pilih saldo waktu"
              readonly
            >
            <div class="input-group-append">
              <span class="input-group-text">menit</span>
            </div>
          </div>
        </div>
      </div>
      <div class="separator">&nbsp;</div>
      <div class="content-user">
        <img src="@/assets/user.svg" alt="user">
        <h5>Ratu CebonganYK</h5>
        <p>Berjuang bersama untuk Indonesia</p>
        <span>Posted 8 days ago</span>
      </div>
    </div>
    <div slot="widget-wrapper">&nbsp;</div>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/Timeline'
import { OrangeStadiumBackground } from '@/svg/backgrounds'
import {
  DateSecondary,
  Clock,
  Saldo,
  FacebookIcon,
  TwitterIcon,
  IconTwitter,
  VsIcon
} from '@/svg/icons'

export default {
  name: 'WordStadiumCreateChallenge',
  components: {
    TimelineLayout,
    OrangeStadiumBackground,
    DateSecondary,
    Clock,
    Saldo,
    FacebookIcon,
    TwitterIcon,
    IconTwitter,
    VsIcon
  },
  data() {
    return {}
  },
  computed: {
    formCompleted() {
      return (
        this.kajian &&
        (this.pernyataan.text || this.pernyataan.link) &&
        (this.dateTime.date && this.dateTime.time) &&
        this.saldo
      )
    }
  },
  methods: {
    showModal(name = 'modal-bidang') {
      this.modal = name
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
  min-height: 400px

.heading
  height: 203px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background-color: #fe7f5e
  border-top-left-radius: 8px
  border-top-right-radius: 8px
  z-index: 1
  background: url('~@/assets/orange-stadium.svg') no-repeat center
  background-size: cover

  .status
    height: 95px
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    color: #ffffff
    font-family: BwModelica, Lato
    font-size: 22px
    font-weight: 400
    line-height: 27px
    text-transform: capitalize

    svg
      width: 18px
      height: 18px
      margin-right: 10px

  .detail
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-between
    height: 100%
    width: 100%
    border-top: 2px solid #ffffff
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
      display: flex
      justify-content: center
      align-items: center
      height: calc(100% - 56px)
      font-family: BwModelica, Lato
      font-size: 14px
      font-weight: 400
      line-height: 16px
      letter-spacing: 0.7px
      color: #ffffff
      text-transform: uppercase

  .user-info
    position: absolute
    left: 16px
    top: 32px

    img
      width: 64px
      height: 64px
      border: 2px solid #ffffff
      border-radius: 50%

    .user-title
      h5
        font-family: BwModelicaSS01, Lato
        font-size: 14px
        font-weight: 500
        line-height: 16px
        color: #ffffff
        margin: 8px 0 0
        padding: 0

      span
        font-family: Lato
        font-weight: 400
        font-size: 12px
        line-height: 25px
        color: #ffffff
        letter-spacing: 0.18px

    &__right
      left: auto
      right: 16px
      top: 32px
      text-align: right

.switch
  position: relative
  display: inline-block
  width: 34px
  height: 14px
  input
    opacity: 0
    width: 0
    height: 0

.switch
  .slider
    position: absolute
    cursor: pointer
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: #ccc
    transition: .4s
    &:before
      position: absolute
      content: ''
      height: 20px
      width: 20px
      left: -1px
      bottom: -2px
      background-color: #f1f1f1
      transition: .4s

  input
    &:checked + .slider
      background-color: rgba(246, 180, 42, 0.26);

      &:before
        background-color: #f6b42a

    &:focus + .slider
      box-shadow: 0 0 1px rgba(246, 180, 42, 0.26);
    &:checked + .slider:before
      transform: translateX(26px)

  .slider.round
    border-radius: 14px
    &:before
      border-radius: 50%

.content-preview
  padding: 40px 30px 0
  background-image: url(~@/assets/mask-group-7.svg)
  background-repeat: no-repeat
  background-position: center
  background-size: contain

  .head
    font-family: BwModelicaSS01, Lato
    font-size: 32px
    font-weight: 300
    font-style: normal
    font-stretch: condensed
    line-height: 1.19
    margin: 0

    &--default
      color: #212121

    &--primary
      color: #f6b42a
      font-weight: 800

  .content-sosmed
    margin: 40px 0

    h5
      font-family: Lato
      font-size: 20px
      font-weight: bold
      font-style: normal
      font-stretch: normal
      line-height: 1.2
      letter-spacing: normal

    .sosmed
      display: flex
      justify-content: center
      align-items: center
      flex-direction: row

      &--twitter
        h5
          color: #059ff5

      &--facebook
        h5
          color: #4267b2

      .sosmed
        &-icon
          align-self: flex-start
          margin-top: 0

          img, svg
            width: 32px
            height: 32px

        &-title
          margin-left: 16px
          margin-right: 58px
          p
            font-family: Lato
            font-size: 14px
            line-height: 1.14
            color: #212121

.sosmed-action
  margin: 70px 0 40px

.btn-primary
  width: 300px
  height: 40px
  border-radius: 2px
  background-color: #08bda8
  color: #ffffff
  border: 1px solid #08bda8

  &:hover, &:focus, &:active
    background-color: darken(#08bda8, 5%)

.centered
  display: flex
  justify-content: center
  align-items: center

.content-detail
  padding: 0 32px 0
  margin: 0

  h5
    text-align: center
    font-family: BwModelicaSS02, lato
    font-size: 14px
    font-weight: 800
    font-style: normal
    font-stretch: condensed
    line-height: 0.86
    letter-spacing: 0.7px
    color: #212121
    margin: 0

  .detail-row
    margin: 32px 0 30px

    p
      color: #212121
      font-weight: bold
      margin: 0

    .input-bidang
      width: 280px
      margin: 2px 0

      &__saldo
        width: 100px

      .form-control, .input-group-text
        background-color: #ffffff
        border-width: 0
        padding: 0 8px 0 0

      .form-control
        padding-left: 2px
        font-family: Lato
        font-size: 12px
        font-weight: bold
        color: #212121

        &::placeholder
          color: #cbcbcb

      .input-group-prepend
        .input-group-text
          svg
            width: 24px
            height: 24px

      .input-group-append
        .input-group-text
          font-family: Lato
          font-size: 11px
          color: #7c7c7c

  .alert-preview
    background-color: #f9f9f9
    color: #212121
    width: 100%
    padding: 8px 12px
    border: none
    margin: 0 0 8px

    .link
      color: #1da1f2
      font-weight: normal
      font-size: 10px
      line-height: 16px

    .preview-content
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center

      &__info
        width: 100%

        h5
          text-align: left
          font-family: Lato
          font-size: 12px
          font-weight: bold
          font-style: normal
          font-stretch: normal
          line-height: 2
          letter-spacing: 0px
          text-align: left

        small
          color: #aaaaaa

        p
          font-family: Lato
          font-size: 11px
          font-weight: normal
          line-height: 1.18
          letter-spacing: 0.2px
          color: #212121

      img
        align-self: flex-start
        height: 40px
        width: 40px
        border-radius: 50%
        margin-top: 8px
        margin-right: 8px

.mask-avatar
  span
    font-family: Helvetica
    width: 20px
    height: 32px
    font-size: 32px
    font-weight: bold
    line-height: 1.19
    position: absolute
    color: #ffffff
    z-index: 2
    width: 18px
    height: 18px
    transform: translate(100%, 50%)
    text-shadow: 0 0 3px rgba(0,0,0,.3)

  img
    z-index: 1
    border-radius: 50%

.thumbnail-avatar
  svg
    position: absolute
    z-index: 2
    width: 18px
    height: 18px
    transform: translate(-2px, 18px)

  img
    z-index: 1
    border-radius: 50%

  &__large
    svg
      width: 22px
      height: 22px
      transform: translate(-3px, 32px)

.detail-lawan
  display: flex
  flex-direction: row
  align-items: center
  justify-content: flex-start

  img
    width: 32px
    height: 32px

  &__user
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-start
    margin-left: 12px

    h5
      height: 15px
      font-family: Lato
      font-size: 12px
      font-weight: bold
      font-style: normal
      font-stretch: normal
      line-height: 1.33

    small
      height: 12px
      font-family: Lato
      font-size: 10px
      line-height: 1.5
      letter-spacing: 0.2px
      text-align: left
      color: #757575

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
  margin-bottom: 10px

.separator
  display: block
  width: 100%
  height: 20px
  background-color: #f4f4f4
  margin: 0

.content-user
  padding: 16px 0 70px
  font-family: Lato
  font-size: 14px
  font-style: normal
  font-stretch: normal
  letter-spacing: normal
  text-align: center
  line-height: 1.21

  img
    width: 36px
    height: 36px
    border-radius: 50%

  h5
    font-size: 14px
    height: 17px
    font-weight: bold
    margin: 12px 0 0
    color: #212121

  p
    color: #4f4f4f

  span
    height: 15px
    font-size: 12px
    line-height: 1.08

</style>
