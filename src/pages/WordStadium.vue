<template>
  <LayoutTimeline>
    <template slot="main-content">
      <div class="card card-tabs" v-if="$route.name != 'WordStadiumHint'">
        <div class="title-tabs wordstadium-tabs">
          <router-link to="/wordstadium">Publik</router-link>
          <router-link to="/wordstadium?type=personal">Personal</router-link>
        </div>

        <wordstadium-personal v-if="$route.query.type === 'personal'"></wordstadium-personal>
        <wordstadium-public v-else></wordstadium-public>
        <create-challenge-modal v-if="modal === 'CreateChallenge'" @close="modal = null"></create-challenge-modal>
      </div>
      <!-- <div v-if="$route.query.banner == 'publik'">
        <HintBanner :object=""/>
        ini detailnya public
      </div>
      <div v-if="$route.query.banner == 'personal'">
        <HintBanner :object=""/>
        ini detailnya personal
      </div> -->
    </template>
    <div slot="widget-wrapper">
      <div class="card widget-wordstadium d-none d-lg-flex">
        <div class="title">Chivalry Over Bigotry</div>
        <div class="text">
          Explore WordStadium. Kamu bisa cari tantangan terbuka dan debat
          yang akan atau sudah berlangsung.
          <a href="#">Read more...</a>
        </div>
        <img src="~@/assets/img-wordstadium-widget.svg">
      </div>
      <!-- <div v-if="$route.query.type === 'personal'">
        <router-link :to="{name: 'WordStadiumHint', query: { banner: 'personal' }}">
          <WidgetBanner :data="" />
          personal
        </router-link>
      </div>
      <div v-if="$route.query.type == null && $route.name == 'WordStadium'">
        <router-link :to="{name: 'WordStadiumHint', query: { banner: 'publik' }}">
          <WidgetBanner :data="" />
          publik
        </router-link>
      </div> -->
      <div class="create-challenge-container" v-if="$route.name != 'WordStadiumHint'">
        <button type="button" @click.prevent="modal = 'CreateChallenge'">
          <i class="icon icon-pencil"></i>
          <div class="text">Buat tantangan</div>
        </button>
      </div>
    </div>
  </LayoutTimeline>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import LayoutTimeline from '@/layout/Timeline'
import WordstadiumPublic from '@/pages/wordstadium/public'
import WordstadiumPersonal from '@/pages/wordstadium/personal'
import CreateChallengeModal from '@/components/wordstadium/modal-challenge'

export default {
  name: 'WordStadium',
  components: {
    LayoutTimeline,
    WordstadiumPublic,
    WordstadiumPersonal,
    CreateChallengeModal
  },
  data() {
    return {
      modal: null
    }
  }
}
</script>

<style lang="sass" scoped>
.wordstadium-tabs
  a.router-link-exact-active,
  a.active
    color: #f6b42a

.create-challenge-container
  @media (max-width: 767px)
    padding: 15px
  button
    display: flex
    align-items: center
    max-width: 260px
    height: 40px
    width: 100%
    border-radius: 8px
    border: solid 1px #f49422
    background-color: #f49422
    text-transform: uppercase
    color: white
    font-size: 12px
    font-weight: bold
    font-stretch: condensed
    line-height: 1.25
    letter-spacing: 0.5px
    text-align: center
    cursor: pointer
    @media (max-width: 991px)
      max-width: none
      margin-bottom: 15px

    .icon.icon-pencil
      flex: 0 0 20px
      height: 20px
      width: 20px
    .text
      flex: 1
      text-indent: -10px
.widget-wordstadium
  display: flex
  flex-direction: column
  align-items: center
  background-image: url('~@/assets/img-debat-header-bg.svg')
  background-repeat: no-repeat
  background-position: bottom
  padding-bottom: 20px

  .title
    flex: 0 0 auto
    align-self: flex-start
    font-family: Lato
    font-size: 14px
    font-weight: 900
    font-style: italic
    line-height: 1.07
    color: #f6b42a
    padding: 10px
    border: none
  .text
    flex: 1 auto
    align-self: flex-start
    padding: 10px
    font-size: 12px
    line-height: 1.25
    color: #7c7c7c
    a
      color: #111111
      font-weight: 600
  img
    flex: 0 0 100px
    height: 99px
    width: 187px


a.see-more
  margin-top: 10px
  text-align: center
  margin-left: 50%
  transform: translateX(-50%)
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.86;
  letter-spacing: normal;
  text-align: center;
  color: #f49422;
.debat-list-container
  padding: 10px
.debat-title
  border-bottom: 1px solid #ececec
  padding-bottom: 16px
  .title
    font-size: 20px
    font-weight: 900
    line-height: 0.95
    color: #212121
    text-transform: uppercase
  .description
    font-size: 12px
    line-height: 1.17
    color: #7c7c7c
    margin: 0

.debat-item-list
  width: 100%
  li
    display: flex
    .panel-detail
      flex: 1
      padding: 10px
      margin-top: 10px
      margin-left: 10px
      padding-top: 0
      position: relative
      small
        border: 1px solid #f9d65c
        border-radius: 4px
        padding: 4px
      button.love-btn,
      button.menu-btn
        display: inline-flex
        position: absolute
        top: 0
        right: 0
        background: white
        border: none
        cursor: pointer
      button.love-btn
        right: 35px
        font-size: 12px
        font-weight: bold
        line-height: 1
        color: #111111
        align-items: center
      .description
        margin-top: 10px
        font-family: BwModelicaSS01, Lato, sans-serif
        font-size: 14px
        font-weight: 500
        font-stretch: condensed
        line-height: 1.21
        letter-spacing: 0.1px
        color: #212121

.icon
  display: inline-block
  height: 24px
  width: 24px
  background-repeat: no-repeat
  background-position: center
  background-size: contain
  &.icon-pencil
    background-image: url(~@/assets/icon-pencil.svg)
  &.icon-debat-coming-soon
    background-image: url(~@/assets/ic-debat-coming-soon.svg)
  &.icon-debat-done
    background-image: url(~@/assets/ic-debat-done.svg)
  &.icon-debat-challenge
    background-image: url(~@/assets/ic-debat-challenge.svg)
  &.icon-outline-lawan
    background-image: url(~@/assets/ic-outline-lawan.svg)
  &.icon-menu
    -webkit-mask: url(~@/assets/icon_more_vertical.svg)
    transform: rotate(90deg)
    background-color: #333
  &.icon-love
    background-image: url(~@/assets/ic-love.svg)

.debat-list
  margin-top: 16px
  display: flex
  justify-content: center
  align-items: flex-start
  flex-direction: column
  .meta
    display: flex
    align-items: center
  .title
    font-size: 20px
    font-weight: 900
    font-style: italic
    line-height: 0.95
    color: #212121
    margin-left: 8px

/deep/ .lottie-card
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  width: 100%
  padding: 32px 0 16px 0

  .lottie-content
    padding: 32px 0 16px 0
    margin-bottom: 16px

    .lottie-title
      display: block
      margin: 16px 0 67px
      height: 15px
      font-family: Lato
      font-size: 12px
      font-style: italic
      line-height: 1.17
      text-align: center
      color: #7c7c7c

    svg
      width: 80px !important
      height: 80px !important

.has--separator
  border-bottom: 5px solid #ececec
  margin-bottom: 6px

</style>
