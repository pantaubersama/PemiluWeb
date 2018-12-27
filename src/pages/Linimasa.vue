<template>
  <timeline-layout>
    <div slot="main-content" >
      <div class="card card-tabs">
          <div class="title-tabs">
            <router-link to="/linimasa" exact>Pilpres</router-link>
            <router-link :to="{path: '/linimasa', query: {type: 'janji-politik'}}">Janji Politik</router-link>
          </div>
          
          <div v-if="this.$route.query.type == 'janji-politik'">
            <TabJP/>
          </div>
          <div v-else>
            <TabPilpres/>
          </div>

        </div>
    </div>
    <div slot="widget-wrapper">
      <widget-filter></widget-filter>
    </div>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/timeline'
import TabPilpres from '@/pages/Linimasa/TabPilpres'
import TabJP from '@/pages/Linimasa/TabJP'
import WidgetFilter from '@/pages/Linimasa/widget-filter'
export default {
  name: 'Linimasa',
  components: {
    TimelineLayout,
    TabPilpres,
    TabJP,
    WidgetFilter
  },
}
</script>
