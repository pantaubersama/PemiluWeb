<template>
  <div class="home-wrapper">
    <div class="container d-flex main-wrapper">
      <div class="col-md-3 sidebar">
        <NavSidebarTop></NavSidebarTop>
        <NavSidebarBottom></NavSidebarBottom>
      </div>
      <div class="col-md-6 offset-md-3 main-content">
        <div class="card card-tabs">
          <div class="title-tabs">
            <router-link to="/linimasa" exact>Pilpres</router-link>
            <router-link :to="{name: 'LinimasaJanjiPolitik', params: {name: 'janji-politik'}}">Janji Politik</router-link>
          </div>

          <div v-if="$route.name == 'LinimasaJanjiPolitik'">
            <TabJP/>
          </div>
          <div v-else>
            <TabPilpres/>
          </div>

        </div>
      </div>
      <div class="col-md-3 widget-wrapper">
        
      </div>
    </div>
  </div>
</template>

<script>
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
import TabPilpres from '@/pages/Linimasa/TabPilpres'
import TabJP from '@/pages/Linimasa/TabJP'

export default {
  name: 'Linimasa',
  components: {
    NavSidebarTop,
    NavSidebarBottom,
    TabPilpres,
    TabJP
  },
}



</script>
