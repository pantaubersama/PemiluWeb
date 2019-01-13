<template>
  <timeline-layout>
    <div slot="main-content">
      <div v-if="$route.name != 'LinimasaHint' && $route.name != 'LinimasaDetail'">
        <div class="card card-tabs">
          <div class="title-tabs">
            <router-link to="/linimasa" exact>Pilpres</router-link>
            <router-link :to="{path: '/linimasa', query: {type: 'janji-politik'}}">Janji Politik</router-link>
          </div>
          <TabJP v-if="this.$route.query.type == 'janji-politik'"/>
          <TabPilpres v-else/>
        </div>
      </div>
      <div v-else-if="$route.name == 'LinimasaDetail'">
        <DetailPost/>
      </div>
      <div v-else>
        <HintBanner :object="getObject($route.query.type)"/>
      </div>
    </div>
    <div slot="widget-wrapper">
      <div v-if="$route.name != 'LinimasaHint' && $route.name != 'LinimasaDetail'">
        <div v-if="this.$route.query.type == 'janji-politik'">
          <WidgetFilterJP/>
          <router-link
            :to="{name: 'LinimasaHint', query: {type: 'janji-politik'}}"
            class="d-none d-lg-block"
          >
            <WidgetBanner :data="bannerJanjiPolitikData ? bannerJanjiPolitikData : null"/>
          </router-link>
        </div>
        <div v-else>
          <WidgetFilterPilpres/>
          <router-link
            :to="{name: 'LinimasaHint', query: {type: 'pilpres'}}"
            class="d-none d-lg-block"
          >
            <WidgetBanner :data="bannerPilpresData ? bannerPilpresData : null"/>
          </router-link>
        </div>
      </div>
    </div>
  </timeline-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import TimelineLayout from '@/layout/Timeline'

import TabPilpres from '@/pages/Linimasa/TabPilpres'
import TabJP from '@/pages/Linimasa/TabJP'
import WidgetFilterJP from '@/pages/Linimasa/WidgetFilterJP'
import WidgetFilterPilpres from '@/pages/Linimasa/WidgetFilterPilpres'
import WidgetBanner from '@/pages/Linimasa/WidgetBanner'
import HintBanner from '@/pages/Linimasa/HintBanner'
import DetailPost from '@/pages/Linimasa/DetailPost'

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
    ...mapGetters([
      'bannerPilpresData',
      'bannerKuisData',
      'bannerTanyaData',
      'bannerJanjiPolitikData'
    ])
  },
  methods: {
    ...mapActions(['fetchBannerInfo']),
    getObject(type) {
      switch (type) {
        case 'janji-politik':
          return this.bannerJanjiPolitikData
        case 'pilpres':
          return this.bannerPilpresData
      }
    }
  },
  // TODO: ketika route berubah atau direoad, ambil ulang data
  mounted() {
    this.fetchBannerInfo('janji politik')
  }
}
</script>
