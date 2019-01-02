<template>
  <timeline-layout>
    <div slot="main-content" >
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
        <div v-if="this.$route.query.type == 'janji-politik'">
          <HintJP/>
        </div>
        <div v-if="this.$route.query.type == 'pilpres'">
          <HintPilpres/>
        </div>
      </div>
    </div>
    <div slot="widget-wrapper">
      <div v-if="$route.name != 'LinimasaHint' && $route.name != 'LinimasaDetail'">
        <div v-if="this.$route.query.type == 'janji-politik'">
          <WidgetFilterJP/>
          <router-link :to="{name: 'LinimasaHint', query: {type: 'janji-politik'}}">
            <WidgetBannerJP/>
          </router-link>
        </div>
        <div v-else>
          <WidgetFilterPilpres/>
          <router-link :to="{name: 'LinimasaHint', query: {type: 'pilpres'}}">
            <WidgetBannerPilpres/>
          </router-link>
        </div>
      </div>

    </div>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/Timeline'
import TabPilpres from '@/pages/Linimasa/TabPilpres'
import TabJP from '@/pages/Linimasa/TabJP'
import WidgetFilterJP from '@/pages/Linimasa/WidgetFilterJP'
import WidgetFilterPilpres from '@/pages/Linimasa/WidgetFilterPilpres'
import WidgetBannerJP from '@/pages/Linimasa/WidgetBannerJP'
import WidgetBannerPilpres from '@/pages/Linimasa/WidgetBannerPilpres'
import HintPilpres from '@/pages/Linimasa/HintPilpres'
import HintJP from '@/pages/Linimasa/HintJP'
import DetailPost from '@/pages/Linimasa/DetailPost'
export default {
  name: 'Linimasa',
  components: {
    TimelineLayout,
    TabPilpres,
    TabJP,
    WidgetFilterJP,
    WidgetFilterPilpres,
    WidgetBannerJP,
    WidgetBannerPilpres,
    HintPilpres,
    HintJP,
    DetailPost
  },
}
</script>
