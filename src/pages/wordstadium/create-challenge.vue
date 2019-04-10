<template>
  <timeline-layout>
    <div slot="main-content" class="page card card-tabs container">
      <div class="heading">
        <div class="status">Buat Tantangan</div>
        <div class="detail">
          <div class="versus">
            <vs-icon/>
          </div>
          <div v-if="type === 'direct'" class="description">DIRECT CHALLENGE</div>
          <div v-if="type === 'open'" class="description">OPEN CHALLENGE</div>
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
      </div>
      <div class="content-bidang" :class="{'content-bidang__completed': formCompleted}">
        <div class="row-bidang" :class="{'row-bidang__active': showPernyataan}">
          <h5>Bidang Kajian</h5>
          <p>Pilih Bidang Kajian yang sesuai dengan materi debat kamu. Misal: Ekonomi, Agama, Sosial, Politik, dan sebagainya.</p>
          <span v-if="kajian" class="badge"
            @click.prevent="showModal('modal-bidang')" >
            {{ kajian }}
          </span>
          <a
            href="javascript:void(0)"
            class="link-bidang"
            @click.stop="showModal('modal-bidang')"
            v-else
          >Pilih bidang kajian</a>
        </div>
        <div class="row-bidang" v-if="showPernyataan"
          :class="{'row-bidang__active': showUser}">
          <h5>Pernyataan</h5>
          <p>Tulis pernyataan yang sesuai dengan Bidang Kajian. Kamu juga bisa menyertakan tautan/link di sini.</p>
          <div
            class="alert alert-preview alert-secondary alert-dismissible fade show"
            role="alert"
            v-if="pernyataan && pernyataan.link">
            <div class="link">{{ pernyataan.link }}</div>
            <div class="preview-content">
              <img src="@/assets/user.svg" alt="user">
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
        <div class="row-bidang" v-if="showUser && type === 'direct'"
          :class="{'row-bidang__active': showDatetime}">
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
                  value="symbolic"
                  v-model="radioUserLawan">
                <label for="user-symbolic">&nbsp;</label>
              </div>
              <div class="input-group-text">
                <img src="@/assets/ic_symbolic.png" alt="symbolic">
              </div>
            </div>
            <v-autocomplete
              class="input-autocomplete form-control"
              v-model="selectedSymbolicUser"
              :items="users"
              :get-label="(item) => item.username || ''"
              :auto-select-one-item="false"
              :keep-open="false"
              :component-item="acTemplate"
              @change="getUsers($event)"
              @item-selected="user.symbolic = $event.id"
            ></v-autocomplete>
          </div>
          <div class="input-group input-challenge">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <input
                  type="radio"
                  aria-label="Username Twitter"
                  id="user-twitter"
                  name="user-lawan"
                  value="twitter"
                  v-model="radioUserLawan">
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
              v-model="user.twitter">
          </div>
        </div>
        <div class="row-bidang" v-if="showDatetime"
          :class="{'row-bidang__active': showSaldo}">
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
            <input v-model="datetime.date" type="date" class="form-control" placeholder="Tanggal">
          </div>
          <div class="input-group input-bidang">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <clock/>
              </span>
            </div>
            <input v-model="datetime.time" type="time" class="form-control" placeholder="Waktu">
          </div>
        </div>
        <div class="row-bidang" v-if="showSaldo"
          :class="{'row-bidang__active': saldo}">
          <h5>Saldo Waktu</h5>
          <p>Tentukan durasi atau Saldo Waktu debat untuk kamu dan lawan debatmu. Masing-masing akan mendapat bagian yang sama rata.</p>
          <div class="input-group input-bidang">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <saldo/>
              </span>
            </div>
            <!-- <input v-model="saldo" type="text" class="form-control" placeholder="Pilih saldo waktu"> -->
            <select v-model="saldo" class="form-control" placeholder="Pilih saldo waktu">
              <option value="-1" hidden disabled selected>Pilih saldo waktu</option>
              <option v-for="saldo in saldoChoices" :key="saldo" :value="saldo">
                {{saldo}}
              </option>
            </select>
            <div class="input-group-append">
              <span class="input-group-text">menit</span>
            </div>
          </div>
        </div>
        <div v-if="formCompleted"
          class="row-bidang row-bidang__action"
          :class="{'row-bidang__active': formCompleted}">
          <div class="row-action">
            <a
              href="javascript:void(0)"
              class="btn-primary"
              :class="{'btn-primary__active': saldo}"
              @click.stop="submit()"
            >Lanjutkan</a>
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
        @close-request="modal = false">
      </modal-kajian>
      <modal-link
        v-if="modal === 'modal-link'"
        @input="(link) => {
          pernyataan.link = link;
          modal = false;
        }"
        @close-request="modal = false">
      </modal-link>
      <modal-success
        text="Tantanganmu Berhasil Dipublikasikan"
        v-if="modal === 'modal-success'"
        @close-request="modal = false">
      </modal-success>
      <modal-challenge
        v-if="modal === 'modal-challenge'"
        @close-request="modal = false"
        @close="modal = false">
      </modal-challenge>
    </div>
    <div slot="widget-wrapper">
      <div class="sidebar-challenge">
        <div class="sidebar-title">
          <h5>PANDUAN</h5>
        </div>
        <div class="sidebar-content">
          <div class="sidebar-thumbnail">
            <img src="@/assets/user.svg" alt="user">
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
    </div>

  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/Timeline'
import ModalKajian from '@/components/wordstadium/modal-kajian'
import ModalLink from '@/components/wordstadium/modal-link'
import ModalSuccess from '@/components/wordstadium/modal-success'
import ModalChallenge from '@/components/wordstadium/modal-challenge'
import UserAutocomplete from '@/pages/wordstadium/user-autocomplete'
import { OrangeStadiumBackground } from '@/svg/backgrounds'
import {
  DateSecondary,
  Clock,
  Saldo,
  OutlineLink,
  HighlightOff,
  VsIcon
} from '@/svg/icons'
import * as ProfileAPI from '@/services/api/profile'
import * as OpiniumAPI from '@/services/api/opinium'
import * as WordstadiumAPI from '@/services/api/wordstadium'

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
    HighlightOff,
    VsIcon
  },
  data() {
    return {
      kajian: '',
      pernyataan: {
        text: '',
        link: ''
      },
      users: [],
      selectedSymbolicUser: null,
      acTemplate: UserAutocomplete,
      user: {
        symbolic: null,
        twitter: null
      },
      datetime: { date: null, time: null },
      saldo: 60,
      modal: false,
      radioUserLawan: 'twitter',
      bidangKajian: [],
      saldoChoices: [ 30, 60, 90, 120, 150, 180 ]
    }
  },
  computed: {
    type() {
      return this.$route.query.type || 'open'
    },
    showPernyataan() {
      return this.kajian != null && this.kajian.length !== 0
    },
    showUser() {
      return this.type === 'direct' && this.pernyataan.text != null
        && this.pernyataan.text.length !== 0
        || this.pernyataan.link != null && this.pernyataan.link.length !== 0
    },
    showDatetime() {
      // return this.user.symbolic != null && this.user.symbolic.length !== 0
      //   || this.user.twitter != null && this.user.twitter.length !== 0
      if (this.type === 'open') return this.showPernyataan
      return this.radioUserLawan != null
        && this.user[this.radioUserLawan] != null
        && this.user[this.radioUserLawan].length !== 0
    },
    showSaldo() {
      return this.datetime.date != null || this.datetime.time != null
    },
    formCompleted() {
      return this.showPernyataan && this.showUser && this.showDatetime && this.showSaldo && this.saldo !== -1
    },
    date() {
      if (this.datetime.date == null) return null
      if (this.datetime.time == null) return null
      const date = new Date(this.datetime.date)
      date.setHours(this.datetime.time.split(':')[0])
      date.setMinutes(this.datetime.time.split(':')[1])
      return date.toISOString()
    },
    selectedUser() {
      return this.user[this.radioUserLawan]
    },
    screenName() {
      if (this.type === 'open') return null
      return this.selectedSymbolicUser == null
        ? this.selectedUser
        : this.selectedSymbolicUser.full_name
    }
  },
  mounted() {
    OpiniumAPI.listTags()
      .then((res) => {
        this.bidangKajian = res
      })
  },
  methods: {
    showModal(name = 'modal-bidang') {
      this.modal = name
    },
    async submit() {
      const data = {
        statement: this.pernyataan.text,
        statement_source: this.pernyataan.link,
        show_time_at: this.date,
        time_limit: this.saldo,
        topic_list: this.kajian,
      }
      if (this.type === 'direct') {
        data.invitation_id = this.selectedUser
        data.screen_name = this.screenName
      }
      return WordstadiumAPI.createChallenge(this.type, data)
        .then((resp) => {
          console.log(`success create ${this.type} challenge`, resp.challenge)
          this.showModal('modal-success')
          setTimeout(() => {
            this.$router.push('/wordstadium')
          }, 1500)
        })
    },
    async getUsers(query) {
      const users = await ProfileAPI.getUsers(query)
      this.users = users
      return users
    }
  }
}
</script>

<style lang="sass" scoped>
.input-autocomplete
  & /deep/ .v-autocomplete-list
    display: block
    background: white
    box-shadow: 0 0 5px rgba(0,0,0,.3)
    border-radius: 3px
    padding: 5px
    position: absolute
    z-index: 10
  & /deep/ .v-autocomplete-input
    height: 100%
    width: 100%
    border: 0
    background: transparent
    font-weight: bold
  & /deep/ .v-autocomplete-input-group
    height: 100%
    width: 100%


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
    font-family: 'Bw Modelica'
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
      font-family: 'Bw Modelica'
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

      .form-control,
      .input-group-text
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
      font-family: 'Bw Modelica'
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
      font-family: 'Bw Modelica'
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
