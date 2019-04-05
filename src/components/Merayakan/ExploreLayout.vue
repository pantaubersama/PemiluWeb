<template>
  <div class="merayakan-explore">
    <div class="wrapper" :class="{'sidebar-open': isSidebarActive}">
      <div class="menu-bg"></div>
      <Header
        @toggleSidebar="isSidebarActive = !isSidebarActive"
        @removeSidebar="isSidebarActive = false"
        @search="$event => onSearch($event)"
      ></Header>
      <div class="explore-tag-bar">
        <div class="col-lg-8 offset-lg-2">
          <ul class="explore-tag">
            <li>
              <router-link
              :to="{ name: 'MerayakanExplore', params: { type: 'presiden' }, query: { d: 'nasional' } }"
            >Presiden</router-link>
            </li>
            <li>
              <router-link
              :to="{ name: 'MerayakanExplore', params: { type: 'dpr' }}"
            >DRP RI</router-link>
            </li>
            <li>
              <router-link
              :to="{ name: 'MerayakanExplore', params: { type: 'dpd' }}"
            >DPD</router-link>
            </li>
            <li>
              <router-link
              :to="{ name: 'MerayakanExplore', params: { type: 'dprd-provinsi' }}"
            >DPRD Provinsi</router-link>
            </li>
            <li>
              <router-link
              :to="{ name: 'MerayakanExplore', params: { type: 'dprd-kabupaten' }}"
            >DPRD Kabupaten/Kota</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="container main-wrapper">
        <div class="col-lg-3 sidebar d-block d-lg-none">
          <NavSidebarTop></NavSidebarTop>
          <NavSidebarBottom></NavSidebarBottom>
        </div>
        <div class="col-lg-8 offset-lg-2 main-content">
          <slot name="main-content" :type="searchType">Main Content</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import throttle from 'lodash.throttle'
import Header from '@/components/Header'
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
export default {
  name: 'Explore',
  components: {
    Header,
    NavSidebarTop,
    NavSidebarBottom
  },
  data() {
    return {
      isSidebarActive: false
    }
  },
  watch: {
    isSidebarActive: {
      immediate: true,
      handler(value) {
        document.documentElement.className = this.isSidebarActive
          ? 'overflow-y-hidden'
          : ''
      }
    }
  },
  computed: {
    searchType() {
      return this.$route.params.type
    },
    // query() {
    //   return this.$route.query.q
    // }
  },
  // methods: {
  //   onSearch(query) {
  //     console.log('query: ', query)
  //   }
  // }
}
</script>

<style lang="sass" scoped>
.merayakan-explore
  .wrapper
    padding-top: 130px
    @media (max-width: 991px)
      padding-top: 160px
  .main-content
    padding: 0
.explore-tag-bar
  position: fixed
  top: 65px
  width: 100%
  z-index: 8
  background-color: #fff
  padding: 5px 0
  @media (max-width: 991px)
    top: 92px
  @media (max-width: 767px)
    top: 105px

  .explore-tag
    display: flex
    overflow: auto
    padding: 10px 15px
    justify-content: space-around
    margin: auto
    @media (max-width: 1199px)
      max-width: 960px
    @media (max-width: 991px)
      max-width: 720px
    @media (max-width: 767px)
      max-width: 540px
      padding: 0
      justify-content: flex-start
      align-items: center
    li
      display: flex
      align-items: center
      justify-content: center
      @media (max-width: 767px)
        min-width: 95px
        margin: 0 10px
    a
      text-transform: uppercase
      text-align: center
      font-weight: bold
      color: #111111
      padding: 5px 10px
      border-radius: 30px
      @media (max-width: 767px)
        font-size: 13px
      &.router-link-active
        color: #ffffff
        background-color: #08bda8
</style>
