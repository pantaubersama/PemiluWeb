<template>
  <LayoutMerayakan>
    <template slot="main-content">
       <ModalUnduh
          v-if="modal === 'ModalUnduh'"
          @close-request="closeModal()"
        />
          <!-- @submit="onSubmitProfile($event)"
          :user="user" -->
      <div class="merayakan-wrapper">
        <div class="row">
          <div class="col-lg-8">
            <div v-if="$route.name == 'MerayakanHint'">
              <HintBanner :object="hitungBanner"/>
            </div>
            <div v-if="$route.name != 'MerayakanHint'">
              <ElectionPercentage/>
              <router-link :to="{name: 'MerayakanExplore', params: {type: 'presiden'},  query: { d: 'nasional' }}">
                <ExploreWidget/>
              </router-link>
            </div>
          </div>
          <div class="col widget-wrapper" v-if="$route.name != 'MerayakanHint'">

            <!-- <router-link :to="{name: 'MerayakanHint'}" v-if="isProtected()"> -->
            <router-link :to="{name: 'MerayakanHint'}">
              <WidgetBanner :data="hitungBanner" />
            </router-link>

            <Participan/>
            <a href="#" @click.prevent="() => modal = 'ModalUnduh'">
              <Unduh/>
            </a>

          </div>
        </div>
        <div class="row" v-if="$route.name != 'MerayakanHint'">
          <a href="#" @click.prevent="() => modal = 'ModalKeseruan'">
            <Keseruan :object="suasanaTps" :paginations="paginationTps" @loadMoreSuasanaTps="loadMoreSuasanaTps"/>
            </a>
        </div>
      </div>
    </template>
  </LayoutMerayakan>
</template>

<script>
import { mapState } from 'vuex'
import { authLink } from '@/mixins/link'
import LayoutMerayakan from '@/layout/Merayakan'
import ElectionPercentage from '@/components/Merayakan/ElectionPercentage'
import Participan from '@/components/Merayakan/Participan'
import Unduh from '@/components/Merayakan/Unduh'
import ExploreWidget from '@/components/Merayakan/ExploreWidget'
import ModalUnduh from '@/components/Merayakan/ModalUnduh'
import Keseruan from '@/components/Merayakan/Keseruan'

import WidgetBanner from '@/components/Linimasa/WidgetBanner'
import HintBanner from '@/components/Linimasa/HintBanner'
export default {
  name: 'Merayakan',
  components: {
    LayoutMerayakan,
    ElectionPercentage,
    Participan,
    Unduh,
    ExploreWidget,
    ModalUnduh,
    Keseruan,
    WidgetBanner,
    HintBanner
  },
  mixins: [authLink],
  data() {
    return {
      modal: false
    }
  },
  computed: {
    ...mapState({
      hitungBanner: s => s.hitungBanner.hitung_banner,
      suasanaTps: s => s.suasanaTps.suasana_tps,
      paginationTps: s => s.suasanaTps.paginations,
    })
  },
  created() {
    this.$store.dispatch('hitungSummary/summaryPresident')
    this.$store.dispatch('hitungBanner/hitungBanner')
    this.$store.dispatch('suasanaTps/suasanaTps')
  },
  methods: {
    closeModal() {
      this.modal = false
    },
    loadMoreSuasanaTps() {
      if (this.paginationTps.isLast === false) {
        this.$store.dispatch('suasanaTps/nextPage')
        this.$store.dispatch('suasanaTps/updateSuasanaTps')
      }
    },
  },


}
</script>
<style lang="sass" scoped>
.merayakan-wrapper
  @media (max-width: 575px)
    .row
      margin: 0
  .col-lg-8
    padding-right: 10px
    @media (max-width: 575px)
      padding: 0
  .widget-wrapper
    padding-left: 5px
    @media (max-width: 991px)
      padding-left: 15px
      margin-top: 10px
</style>

