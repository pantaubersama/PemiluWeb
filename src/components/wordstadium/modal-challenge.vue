<template>
  <transition-group name="modal">
    <div key="2" class="modal-wrapper">
      <div class="modal-full">
        <div class="modal-header">
          <button class="close-icon" @click="$emit('close')">
            <close-icon></close-icon>
          </button>
        </div>
        <div class="modal-content">
          <h5>Buat Tantangan</h5>
          <div class="content-illustration">
            <challenge-illustration/>
          </div>
          <div class="content-action">
            <div class="content-column">
              <div class="column-icon">
                <word-colored/>
              </div>
              <div class="column-description">
                <router-link to="/wordstadium/create-challenge?type=open">
                  <h5>Open Challenge</h5>
                  <p>Setelah menyiapkan bahan debat terkait bidang kajian tertentu; Kamu akan mengundang lawan untuk diajak berdebat satu lawan satu. Jangan lupa promosikan Open Challenge-mu, yaa! Supaya semakin banyak yang memantau~</p>
                </router-link>
              </div>
            </div>
            <div class="content-column">
              <div class="column-icon">
                <twitter-icon/>
              </div>
              <div class="column-description">
                <router-link to="/wordstadium/create-challenge?type=direct">
                  <h5>Direct Challenge</h5>
                  <p>Dari sini, kamu bisa mengundang langsung lawan debatmu yang sudah punya Symbolic ID atau mention akun Twitter-nya. Jangan lupa menyiapkan bidang kajian dan bahasan debat terbaikmu!</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div key="1" class="modal-mask" @click.stop="$emit('close')"></div>
  </transition-group>
</template>

<script>
import { CloseIcon, SearchIcon, WordColored, TwitterIcon } from '@/svg/icons'
import { ChallengeIllustration } from '@/svg/illustrations'

export default {
  name: 'ModalKajian',
  props: {
    text: { type: String, default: 'Laporan Kamu Berhasil Dipublish' }
  },
  data() {
    return {}
  },
  components: {
    CloseIcon,
    SearchIcon,
    WordColored,
    TwitterIcon,
    ChallengeIllustration
  },
  methods: {},
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }
}
</script>

<style lang="sass" scoped>
.modal-full
  padding: 35px 32px
  margin: 0
  background-color: #ffffff
  border: 1px solid #ececec
  border-radius: 15px
  width: 736px
  max-height: 90vh
  overflow: auto
  @media (max-width: 767px)
    width: 100%

.modal-header
  .close-icon
    background-color: transparent
    padding: 0
    cursor: pointer
    width: 44px
    height: 44px
    border-width: 0
    position: absolute
    top: 8px
    right: 8px
    z-index: 4

    svg
      fill: #4f4f4f
      width: 24px
      height: 24px

.modal-content
  font-family: 'Bw Modelica'
  font-size: 16px
  line-height: 20px
  font-weight: bold
  display: flex
  align-items: center
  justify-content: center
  color: #111111
  margin: 0
  padding: 0
  text-align: center
  border: none
  background-color: transparent

  h5
    height: 27px
    font-family: 'Bw Modelica'
    font-size: 22px
    font-weight: bold
    font-style: normal
    font-stretch: condensed
    line-height: 1.23
    letter-spacing: normal
    text-align: center

  img
    width: 100px
    height: 100px
    margin-bottom: 22px
    border-radius: 50%

  .content-illustration
    margin: 20px 0

  .content-action
    display: flex
    align-items: center
    justify-content: center
    flex-direction: row
    @media (max-width: 767px)
      flex-direction: column

    .content-column
      display: flex
      align-items: flex-start
      justify-content: center
      flex-direction: row
      flex: 1
      text-align: left
      border-radius: 8px
      background-color: #f9f9f9
      padding: 17px 16px 12px 16px
      height: 142px
      overflow: hidden
      @media (max-width: 767px)
        height: auto

      &:first-child
        margin-right: 8px

      &:last-child
        margin-left: 8px
      @media (max-width: 767px)
        margin: 0 0 10px !important
      .column-icon
        width: 32px
        margin-right: 16px

        svg
          width: 24px
          height: 24px

      .column-description
        h5
          text-align: left
          font-family: Lato
          font-size: 18px
          font-weight: 900
          line-height: 1.67
          color: #212121
          margin: 0

        p
          margin-top: 8px
          font-family: Lato
          font-size: 12px
          font-weight: normal
          font-style: normal
          font-stretch: normal
          line-height: 1.25
          color: #393939

</style>
