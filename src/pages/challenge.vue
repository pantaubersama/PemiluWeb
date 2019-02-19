<template>
  <timeline-layout>
    <div slot="main-content" class="page card card-tabs container">
      <div class="heading">
        <div class="status">Buat Tantangan</div>
        <div class="detail">
          <div class="versus">VS</div>
          <div class="description">OPEN CHALLENGE</div>
        </div>
        <div class="user-info">
          <img src="@/assets/dildo.jpg" alt="user">
          <div class="user-title">
            <h5>Ratu CebonganYK</h5>
            <span>@ratu_cebonganYK</span>
          </div>
        </div>
      </div>
      <div class="content-bidang">
        <div class="row-bidang" :class="{'row-bidang__active': kajian}">
          <h5>Bidang Kajian</h5>
          <p>Pilih Bidang Kajian yang sesuai dengan materi debat kamu. Misal: Ekonomi, Agama, Sosial, Politik, dan sebagainya.</p>
          <a href="javascript:void(0)" class="link-bidang">Pilih bidang kajian</a>
        </div>
        <div class="row-bidang" :class="{'row-bidang__active': pernyataan.text || pernyataan.link}">
          <h5>Pernyataan</h5>
          <p>Tulis pernyataan yang sesuai dengan Bidang Kajian. Kamu juga bisa menyertakan tautan/link di sini.</p>
          <textarea
            v-model="pernyataan.text"
            placeholder="Tulis pernyataan disini..."
            name="komentar"
            cols="30"
            rows="3"
          ></textarea>
          <a href="javascript:void(0)" class="link-bidang__icon">
            <outline-link/>Sertakan link disini...
          </a>
        </div>
        <div class="row-bidang" :class="{'row-bidang__active': dateTime.date && dateTime.time}">
          <h5>Date & Time</h5>
          <p>
            Tentukan waktu dan tanggal debat yang kamu inginkan. Jangan sampai salah momen,
            lho! :|
          </p>
          <div class="input-group input-bidang">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <date-secondary/>
              </span>
            </div>
            <input v-model="dateTime.date" type="text" class="form-control" placeholder="Tanggal">
          </div>
          <div class="input-group input-bidang">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <clock/>
              </span>
            </div>
            <input v-model="dateTime.time" type="text" class="form-control" placeholder="Waktu">
          </div>
          <!-- <input v-model="dateTime.date" class="input-datetime" type="text" placeholder="Tanggal"> -->
          <!-- <input v-model="dateTime.time" class="input-datetime" type="text" placeholder="Waktu"> -->
        </div>
        <div class="row-bidang" :class="{'row-bidang__active': saldo}">
          <h5>Saldo Waktu</h5>
          <p>Tentukan durasi atau Saldo Waktu debat untuk kamu dan lawan debatmu. Masing-masing akan mendapat bagian yang sama rata.</p>
          <div class="input-group input-bidang">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <saldo/>
              </span>
            </div>
            <input v-model="saldo" type="text" class="form-control" placeholder="Pilih saldo waktu">
            <div class="input-group-append">
              <span class="input-group-text">menit</span>
            </div>
          </div>
          <!-- <input v-model="saldo" type="text" placeholder="Pilih saldo waktu"> -->
        </div>
        <!-- <div class="row-bidang row-bidang__last">&nbsp;</div> -->
        <div class="row-bidang row-bidang__action">
          <div class="row-action">
            <a href="javascript:void(0)" class="btn-primary">Lanjutkan</a>
          </div>
        </div>
      </div>
    </div>
    <div slot="widget-wrapper">
      <div class="sidebar-challenge">
        <div class="sidebar-title">
          <h5>PANDUAN</h5>
        </div>
        <div class="sidebar-content">
          <div class="sidebar-thumbnail">
            <img src="@/assets/dildo.jpg" alt="user">
          </div>
          <div class="sidebar-description">
            <h6>Bidang Kajian</h6>
            <p>Bidang Kajian menunjukkan topik yang sedang dibahas dalam perdebatan. Misalnya Ekonomi, Sosial, Budaya, Agama, Tata Negara, dan lain sebagainya. Bidang Kajian memudahkan kamu untuk mencari tema apa yang ingin dijelajahi. Semakin baik kualitas bahasan seseorang pada sebuah Bidang Kajian, semakin tinggi pula kredibilitasnya pada topik tersebut. Ayo tunjukkan reputasimu yang sesungguhnya!</p>
          </div>
        </div>
      </div>
    </div>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/Timeline'
import { OrangeStadiumBackground } from '@/svg/backgrounds'
import { DateSecondary, Clock, Saldo, OutlineLink } from '@/svg/icons'

export default {
  name: 'Challenge',
  components: {
    TimelineLayout,
    OrangeStadiumBackground,
    DateSecondary,
    Clock,
    Saldo,
    OutlineLink
  },
  data() {
    return {
      kajian: null,
      pernyataan: { text: null, link: null },
      dateTime: { date: null, time: null },
      saldo: null
    }
  },
  methods: {}
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
      border: 2px solid #ffffff
      border-top: none
      color: #ffffff
      font-weight: 800
      font-size: 24px
      text-transform: uppercase
      display: flex
      align-items: center
      justify-content: center
      position: relative

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

.content-bidang
  margin: 0
  padding: 16px 21px

  &:before
    content: ''
    position: absolute
    height: calc(100% - 265px)
    width: 2px
    background-color: #ececec
    margin: 12px 0 0 -2px
    z-index: 1

  .row-bidang
    min-height: 94px
    margin: 0 0 12px 24px
    width: calc(100% - 22px)
    padding: 0

    .row-action
      width: 100%
      text-align: center

    &__last
      min-height: 220px

    &__action
      min-height: 30px
      margin-top: 80px
      text-align: center

    &:before
      content: ''
      position: absolute
      height: 16px
      width: 16px
      left: 45px
      top: auto
      background-color: #cbcbcb
      margin: 7px 0 0 -33px
      border-radius: 50%
      z-index: 2

    &__active
      &:before
        background-color: #08bda8

    textarea
      font-family: Lato
      font-style: italic
      font-size: 12px
      line-height: 14px
      border: none
      overflow: auto
      outline: none
      box-shadow: none
      resize: none
      background: transparent
      border-bottom: 1px solid #ececec
      width: 100%
      margin-top: 12px

      &::placeholder
        color: #aaaaaa

    .input-bidang
      width: 280px
      margin: 8px 0

      .form-control, .input-group-text
        background-color: #f9f9f9
        border-width: 0
        padding: 0 12px

      .form-control
        padding-left: 2px
        font-family: Lato
        font-size: 12px
        color: #212121

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

    // .input-datetime
    // // input[type="text"]
    //   display: block
    //   font-family: BwModelica, Lato
    //   font-size: 12px
    //   font-weight: bold
    //   font-style: normal
    //   font-stretch: condensed
    //   height: 40px
    //   width: 300px
    //   border-radius: 4px
    //   color: #212121
    //   background-color: #f9f9f9
    //   border: none
    //   margin: 8px 0
    //   padding: 8px

    h5
      font-family: Lato
      font-weight: 500
      font-size: 14px
      line-height: 30px
      color: #212121
      margin: 0

    p
      font-family: Lato
      font-weight: 400
      font-size: 12px
      line-height: 14px
      color: #7c7c7c
      margin: 0

    .link-bidang
      font-family: Lato
      font-weight: 400
      font-size: 12px
      line-height: 19px
      color: #cbcbcb
      margin-top: 12px
      display: inline-block

      &__icon
        line-height: 15px
        color: #08bda8

        svg
          width: 16px
          height: 16px
          margin-right: 4px

.btn-primary
  padding: 8px 32px
  text-align: center
  color: #ffffff
  background-color: #cbcbcb
  text-transform: uppercase

.sidebar-challenge
  background-color: #ffffff
  width: 100%
  border: 1px solid #ececec
  border-radius: 8px

  .sidebar-title
    height: 50px
    display: flex
    justify-content: center
    align-items: center
    border-bottom: 1px solid #ececec

    h5
      font-family: BwModelica, Lato
      font-size: 14px
      font-weight: 400
      line-height: 17px
      display: block
      margin: 0
      text-transform: uppercase

  .sidebar-content
    padding: 16px

    .sidebar-thumbnail
      text-align: center
      margin: 8px 0 12px
      width: 100%

      img
        width: 120px
        height: 120px

    h6
      font-family: BwModelica, Lato
      font-size: 14px
      font-weight: 400
      line-height: 16px
      color: #000000
      text-align: center

    p
      font-family: Lato
      font-weight: 400
      font-size: 12px
      line-height: 15px
      color: #7c7c7c

  .sidebar-description
    margin-bottom: 6px

</style>
