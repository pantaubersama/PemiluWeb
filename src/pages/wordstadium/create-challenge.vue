<template>
  <timeline-layout>
    <div slot="main-content" class="page card card-tabs container">
      <div class="heading">
        <div class="status">Buat Tantangan</div>
        <div class="detail">
          <div class="versus">VS</div>
          <div class="description">DIRECT CHALLENGE</div>
        </div>
        <div class="user-info">
          <router-link to="/profile">
            <img src="@/assets/dildo.jpg" alt="user">
            <div class="user-title">
              <h5>Ratu CebonganYK</h5>
              <span>@ratu_cebonganYK</span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="content-bidang" :class="{'content-bidang__completed': formCompleted}">
        <div class="row-bidang" :class="{'row-bidang__active': kajian}">
          <h5>Bidang Kajian</h5>
          <p>Pilih Bidang Kajian yang sesuai dengan materi debat kamu. Misal: Ekonomi, Agama, Sosial, Politik, dan sebagainya.</p>
          <span class="badge" v-if="kajian">{{ kajian }}</span>
          <a
            href="javascript:void(0)"
            class="link-bidang"
            @click.stop="showModal('modal-bidang')"
            v-else
          >Pilih bidang kajian</a>
        </div>
        <div class="row-bidang" :class="{'row-bidang__active': pernyataan.text || pernyataan.link}">
          <h5>Pernyataan</h5>
          <p>Tulis pernyataan yang sesuai dengan Bidang Kajian. Kamu juga bisa menyertakan tautan/link di sini.</p>
          <div
            class="alert alert-preview alert-secondary alert-dismissible fade show"
            role="alert"
            v-if="pernyataan && pernyataan.link"
          >
            <div class="link">{{ pernyataan.link }}</div>
            <div class="preview-content">
              <img src="@/assets/dildo.jpg" alt="user">
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
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <!-- <span aria-hidden="true">&times;</span> -->
              <span aria-hidden="true">
                <highlight-off/>
              </span>
            </button>
          </div>
          <textarea
            v-model="pernyataan.text"
            placeholder="Tulis pernyataan disini..."
            name="komentar"
            cols="30"
            rows="3"
          ></textarea>
          <a
            href="javascript:void(0)"
            class="link-bidang__icon"
            @click.stop="showModal('modal-link')"
          >
            <outline-link/>Sertakan link disini...
          </a>
        </div>
        <div class="row-bidang" :class="{'row-bidang__active': dateTime.date && dateTime.time}">
          <h5>Lawan Debat</h5>
          <p>Undang orang untuk menjadi lawan debat kamu. Undang lawan debatmu dari Symbolic ID, atau mention langsung akun Twitternya.</p>
          <div class="input-group input-challenge">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <input
                  type="radio"
                  aria-label="Username Symbolic"
                  id="user-symbolic"
                  name="user-lawan"
                >
                <label for="user-symbolic">&nbsp;</label>
              </div>
              <div class="input-group-text">
                <img src="@/assets/ic_symbolic.png" alt="symbolic">
              </div>
            </div>
            <input
              value="Raja Kampreta"
              type="text"
              class="form-control"
              aria-label="Username Symbolic"
              placeholder="Username Symbolic"
            >
          </div>
          <div class="input-group input-challenge">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <input
                  type="radio"
                  aria-label="Username Twitter"
                  id="user-twitter"
                  name="user-lawan"
                >
                <label for="user-twitter">&nbsp;</label>
              </div>
              <div class="input-group-text">
                <img src="@/assets/ic_twitter_24.png" alt="twitter">
              </div>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Username Twitter"
              placeholder="Username Twitter"
            >
          </div>
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
        </div>
        <div class="row-bidang row-bidang__action" :class="{'row-bidang__active': formCompleted}">
          <div class="row-action">
            <a
              href="javascript:void(0)"
              class="btn-primary"
              :class="{'btn-primary__active': saldo}"
              @click.stop="showModal('modal-success')"
            >Lanjutkan</a>
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
          <div class="sidebar-description">
            <h6>Pernyataan</h6>
            <p>Rumusan pernyataan juga harus diperhatikan. Jangan sampai lawan debat kamu bingung dengan apa yang ingin dibahas. Gunakan tata bahasa yang baik dan jangan menyingkat kata-kata spy tdk mmbngngkn mslny sprt ini. Hmm...</p>
            <p>Kamu bisa mengutip berita atau pernyataan seseorang sebagai bahan debat. Ingat! Harus tetap bertanggung jawab dengan materi debat, ya. Kualitas argumen dan fokus adalah kunci! Jaga debatnya biar nggak melebar ke mana-mana.</p>
          </div>
          <div class="sidebar-description">
            <h6>Lawan Debat</h6>
            <p>Sebelum menantang debat, pastikan lawan kamu memiliki akun Twitter; bisa juga langsung mention namanya apabila sudah tercatat di akun Symbolic ID.</p>
          </div>
          <div class="sidebar-description">
            <h6>Date & Time</h6>
            <p>Tanggal dan Waktu amat penting diperhatikan sebelum memulai atau menerima tantangan. Keduanya menunjukkan kesiapan kamu pada suatu saat tertentu. Tantangan akan dianggap kedaluarsa/expired jika melewati tanggal dan waktu yang disepakati.</p>
            <p>Coba pilih prakiraan waktu yang memungkinkan kamu dan lawan debatmu sama-sama tersedia. Jangan sampai uji argumentasimu terganggu karena salah momen :(</p>
          </div>
        </div>
      </div>
      <modal-kajian
        v-if="modal === 'modal-bidang'"
        :bidang="bidangKajian"
        @onSelect="(b) => {
          kajian = b.name;
          modal = false;
        }"
        @close-request="modal = false"
      />
      <modal-link
        v-if="modal === 'modal-link'"
        @input="(link) => {
          pernyataan.link = link;
          modal = false;
        }"
        @close-request="modal = false"
      />
      <modal-success
        text="Tantanganmu Berhasil Dipublikasikan"
        v-if="modal === 'modal-success'"
        @close-request="modal = false"
      />
      <modal-challenge
        v-if="modal === 'modal-challenge'"
        @close-request="modal = false"
        @close="modal = false"
      />
    </div>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/Timeline'
import ModalKajian from '@/components/wordstadium/modal-kajian'
import ModalLink from '@/components/wordstadium/modal-link'
import ModalSuccess from '@/components/wordstadium/modal-success'
import ModalChallenge from '@/components/wordstadium/modal-challenge'
import { OrangeStadiumBackground } from '@/svg/backgrounds'
import {
  DateSecondary,
  Clock,
  Saldo,
  OutlineLink,
  HighlightOff
} from '@/svg/icons'

export default {
  name: 'WordStadiumCreateChallenge',
  components: {
    TimelineLayout,
    ModalKajian,
    ModalLink,
    ModalSuccess,
    ModalChallenge,
    OrangeStadiumBackground,
    DateSecondary,
    Clock,
    Saldo,
    OutlineLink,
    HighlightOff
  },
  data() {
    return {
      kajian: null,
      pernyataan: {
        text:
          '2018 pertumbuhan ekonomi Indonesia mengalami pertumbuhan mencapai 5,27%.2 periode yuk, biar 10,54%.',
        link: null
      },
      dateTime: { date: 'Selasa, 24 Maret 2019', time: '16.00' },
      saldo: 120,
      modal: false,
      bidangKajian: [
        { id: 1, name: 'Politik' },
        { id: 2, name: 'Ekonomi' },
        { id: 3, name: 'Hukum' },
        { id: 4, name: 'HAM' },
        { id: 5, name: 'Korupsi' },
        { id: 6, name: 'Terorisme' },
        { id: 7, name: 'Energi' },
        { id: 8, name: 'Pangan' },
        { id: 9, name: 'Infrastruktur' },
        { id: 10, name: 'Sumber daya alam' }
      ]
    }
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
    height: calc(100% - 268px)
    width: 2px
    background-color: #ececec
    margin: 12px 0 0 -2px
    z-index: 1

  &__completed
    &:before
      background-color: #08bda8

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
      height: 25px
      width: 25px
      left: 42px
      top: auto
      -webkit-mask: url(~@/assets/check.svg)
      fill: #cbcbcb
      background-color: #cbcbcb
      margin: 7px 0 0 -33px
      border-radius: 50%
      z-index: 2

    &__active
      &:before
        -webkit-mask: url(~@/assets/check.svg)
        background-color: #08bda8
        fill: #08bda8

    textarea
      font-family: Lato
      font-style: italic
      font-weight: bold
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

    .input-challenge
      width: 280px
      margin: 8px 0

      .form-control, .input-group-text
        background-color: transparent
        border-width: 0
        padding: 0 8px 0 0

        input[type="radio"]:checked + label:after,
        input[type="radio"]:not(:checked) + label:after
          background: #08bda8

        input[type="radio"]:checked + label:before
          border-color: #08bda8

        input[type="radio"]:not(:checked) + label:before
          border: 2px solid #cbcbcb

      .input-group-text
        &:last-child
          background-color: #f9f9f9
          padding: 0 0 0 10px

      .form-control
        padding-left: 2px
        font-family: Lato
        font-size: 12px
        font-weight: bold
        color: #212121
        background-color: #f9f9f9
        padding: 0 12px

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

.btn-primary
  padding: 8px 32px
  text-align: center
  color: #ffffff
  background-color: #cbcbcb
  text-transform: uppercase

  &__active
    background-color: #08bda8

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
    margin-bottom: 16px

.alert-preview
  background-color: #f9f9f9
  color: #212121
  width: 100%
  padding: 8px 12px
  border: none
  margin: 16px 0 8px

  .close
    padding: 1px
    background-color: transparent
    top: -5px
    right: -5px

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

      small
        color: #aaaaaa

      p
        font-family: Lato
        font-size: 11px
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

</style>
