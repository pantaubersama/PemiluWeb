<template>
  <timeline-layout>
    <div slot="main-content">
      <div v-if="$route.name != 'LinimasaHint' && $route.name != 'LinimasaDetail'">
        <div class="card card-tabs">
          <div class="title-tabs">
            <router-link to="/linimasa" exact>Pilpres</router-link>
            <router-link :to="{path: '/linimasa', query: {type: 'janji-politik'}}">Janji Politik</router-link>
          </div>
          <TabJP
            v-if="$route.query.type == 'janji-politik'"
            :data="janjiPolitiks"
            :userAuth="userAuth"
            :user="user"
            @successSubmitPublikasi="filterJanjiPolitik"
          />
          <TabPilpres v-else :data="feedsPilpres" :loading="isLoading"/>
        </div>
      </div>
      <div v-else-if="$route.name == 'LinimasaDetail'">
        <DetailPost :data="detailJanjiPolitik($route.params.id)"/>
      </div>
      <div v-else>
        <HintBanner :object="getObject($route.query.type)"/>
      </div>
    </div>
    <div slot="widget-wrapper">
      <div v-if="$route.name != 'LinimasaHint' && $route.name != 'LinimasaDetail'">
        <div v-if="$route.query.type == 'janji-politik'">
          <WidgetFilterJP
            :clusters="clusters"
            @onClickApplyButton="filterJanjiPolitik()"
            @onClickResetButton="resetJanjiPolitik()"
            @onChangeUserStatus="filterStatusChange($event)"
            @onUpdateItems="searchClusters($event)"
            @onSelectedItem="filterClusterChange($event)"
          />
          <router-link
            :to="{name: 'LinimasaHint', query: {type: 'janji-politik'}}"
            class="d-none d-lg-block"
          >
            <WidgetBanner :data="bannerJanjiPolitikData ? bannerJanjiPolitikData : {}"/>
          </router-link>
        </div>
        <div v-else>
          <WidgetFilterPilpres
            @onClickApplyButton="filterFeeds"
            @onClickResetButton="resetFeeds"
            @onChangeSource="filterSourceChange"
          />
          <router-link
            :to="{name: 'LinimasaHint', query: {type: 'pilpres'}}"
            class="d-none d-lg-block"
          >
            <WidgetBanner :data="bannerPilpresData ? bannerPilpresData : {}"/>
          </router-link>
        </div>
      </div>
    </div>
  </timeline-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import TimelineLayout from '@/layout/Timeline'

import TabPilpres from '@/components/Linimasa/TabPilpres'
import TabJP from '@/components/Linimasa/TabJP'
import WidgetFilterJP from '@/components/Linimasa/WidgetFilterJP'
import WidgetFilterPilpres from '@/components/Linimasa/WidgetFilterPilpres'
import WidgetBanner from '@/components/Linimasa/WidgetBanner'
import HintBanner from '@/components/Linimasa/HintBanner'
import DetailPost from '@/components/Linimasa/DetailPost'

export default {
  name: 'Linimasa',
  components: {
    TimelineLayout,
    TabPilpres,
    TabJP,
    WidgetFilterJP,
    WidgetFilterPilpres,
    WidgetBanner,
    HintBanner,
    DetailPost
  },
  computed: {
    ...mapState({
      janjiPolitiks: state => state.liniMasa.janjiPolitiks,
      feedsPilpres: state => state.liniMasa.feedsPilpres,
      user: state => state.profile.user,
      userAuth: state => state.meLogout.userLogin,
      clusters: state => state.dashboard.clusters
    }),
    ...mapGetters([
      'bannerPilpresData',
      'bannerKuisData',
      'bannerTanyaData',
      'bannerJanjiPolitikData',
      'detailJanjiPolitik'
      // 'clusterNames'
    ])
  },
  data() {
    return {
      clusterId: '',
      userStatus: 'user_verified_all', // user_verified_all, user_verified_true, user_verified_false
      source: 'team_all',
      isLoading: true
    }
  },
  methods: {
    ...mapActions([
      'fetchBannerInfo',
      'fetchJanjiPolitik',
      'fetchFeedsPilpres',
      'fetchClusters'
    ]),
    getObject(type) {
      switch (type) {
        case 'janji-politik':
          return this.bannerJanjiPolitikData
        case 'pilpres':
          return this.bannerPilpresData
      }
    },
    filterJanjiPolitik() {
      const payload = {
        page: 1,
        perPage: 100,
        query: '',
        clusterId: this.clusterId,
        filterBy: this.userStatus
      }
      this.fetchJanjiPolitik(payload, true)
    },
    resetJanjiPolitik() {
      const payload = {
        page: 1,
        perPage: 100,
        query: '',
        clusterId: '',
        filterBy: 'user_verified_all'
      }
      this.fetchJanjiPolitik(payload)
    },
    filterStatusChange(value) {
      this.userStatus = value
    },
    filterClusterChange(item) {
      this.clusterId = item.id
    },
    filterFeeds() {
      const payload = {
        page: 1,
        perPage: 100,
        query: '',
        filterBy: this.source
      }
      this.fetchFeedsPilpres(payload, true)
    },
    resetFeeds() {
      const payload = {
        page: 1,
        perPage: 100,
        query: '',
        filterBy: 'team_all'
      }
      this.fetchFeedsPilpres(payload)
    },
    filterSourceChange(value) {
      this.source = value
    },
    async searchClusters(value) {
      const payload = {
        query: value
      }
      await this.fetchClusters(payload)
    }
  },
  mounted() {
    const payload = {
      page: 1,
      perPage: 100,
      query: ''
    }
    const payloadFeeds = {
      page: 1,
      perPage: 100,
      query: ''
    }
    this.fetchBannerInfo('janji politik').then(async () => {
      await this.fetchJanjiPolitik(payload)
      await this.fetchFeedsPilpres(payloadFeeds)
      await this.fetchClusters({})
      await setTimeout(() => (this.isLoading = false), 1000)
    })
  }
}
</script>
