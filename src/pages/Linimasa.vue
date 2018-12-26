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
<<<<<<< HEAD
        <WidgetJP></WidgetJP>
=======
        
>>>>>>> 0f2f8c297721d543b5d913587b5eac4c7c2f1f85
      </div>
    </div>
  </div>
</template>

<script>
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
<<<<<<< HEAD
import WidgetVerified from '@/components/WidgetVerified'
import CardPilpres from '@/components/CardPilpres'
import WidgetJP from '@/components/WidgetJP'
=======
import TabPilpres from '@/pages/Linimasa/TabPilpres'
import TabJP from '@/pages/Linimasa/TabJP'
>>>>>>> 0f2f8c297721d543b5d913587b5eac4c7c2f1f85

export default {
  name: 'Linimasa',
  components: {
    NavSidebarTop,
    NavSidebarBottom,
<<<<<<< HEAD
    WidgetVerified,
    CardPilpres,
    WidgetJP
=======
    TabPilpres,
    TabJP
>>>>>>> 0f2f8c297721d543b5d913587b5eac4c7c2f1f85
  },
}
</script>
