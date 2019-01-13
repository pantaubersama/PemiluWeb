<template>
  <timeline-layout>
    <div slot="main-content">
      <div v-if="$route.name != 'LinimasaHint' && $route.name != 'LinimasaDetail'">
        <div class="card card-tabs">
          <div class="title-tabs">
            <router-link to="/linimasa" exact>Pilpres</router-link>
            <router-link :to="{path: '/linimasa', query: {type: 'janji-politik'}}">Janji Politik</router-link>
          </div>
          <TabJP v-if="this.$route.query.type == 'janji-politik'" :data="janjiPolitiks"/>
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
            <WidgetBanner :data="bannerJanjiPolitikData ? bannerJanjiPolitikData : {}"/>
          </router-link>
        </div>
        <div v-else>
          <WidgetFilterPilpres/>
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
      janjiPolitiks: state => state.liniMasa.janjiPolitiks
    }),
    ...mapGetters([
      'bannerPilpresData',
      'bannerKuisData',
      'bannerTanyaData',
      'bannerJanjiPolitikData'
    ])
  },
  methods: {
    ...mapActions(['fetchBannerInfo', 'fetchJanjiPolitik']),
    getObject(type) {
      switch (type) {
        case 'janji-politik':
          return this.bannerJanjiPolitikData
        case 'pilpres':
          return this.bannerPilpresData
      }
    }
  },
  mounted() {
    const payload = {
      page: 1,
      perPage: 100,
      query: ''
    }
    this.fetchBannerInfo('janji politik').then(async () => {
      await this.fetchJanjiPolitik(payload)
    })
  }
}
</script>
