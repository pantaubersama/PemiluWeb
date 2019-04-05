<template>
  <LayoutMerayakan>
    <template slot="main-content">
       <ModalUnduh
          v-if="modal === 'ModalUnduh'"
          @close-request="closeModal()"
        />
        <ModalKeseruan
          v-if="modal === 'ModalKeseruan'"
          @close-request="closeModal()"
        />
          <!-- @submit="onSubmitProfile($event)"
          :user="user" -->
      <div class="merayakan-wrapper">
        <div class="row">
          <div class="col-lg-8">
            <div v-if="$route.name == 'MerayakanHint'">
              <Detail />
            </div>
            <div v-if="$route.name != 'MerayakanHint'">
              <ElectionPercentage />
              <router-link :to="{name: 'MerayakanExplore', params: {type: 'presiden'},  query: { d: 'nasional' }}">
                <ExploreWidget/>
              </router-link>
            </div>
          </div>
          <div class="col widget-wrapper" v-if="$route.name != 'MerayakanHint'">

            <router-link :to="{name: 'MerayakanHint'}">
              <Hint/>
            </router-link>

            <Participan/>
            <a href="#" @click.prevent="() => modal = 'ModalUnduh'">
              <Unduh/>
            </a>

          </div>
        </div>
        <div class="row" v-if="$route.name != 'MerayakanHint'">
          <a href="#" @click.prevent="() => modal = 'ModalKeseruan'">
            <Keseruan />
            </a>
        </div>
      </div>
    </template>
  </LayoutMerayakan>
</template>

<script>
import LayoutMerayakan from '@/layout/Merayakan'
import ElectionPercentage from '@/components/Merayakan/ElectionPercentage'
import Hint from '@/components/Merayakan/Hint'
import Participan from '@/components/Merayakan/Participan'
import Unduh from '@/components/Merayakan/Unduh'
import ExploreWidget from '@/components/Merayakan/ExploreWidget'
import Detail from '@/components/Merayakan/Detail'
import ModalUnduh from '@/components/Merayakan/ModalUnduh'
import Keseruan from '@/components/Merayakan/Keseruan'
import ModalKeseruan from '@/components/Merayakan/ModalKeseruan'
export default {
  name: 'Merayakan',
  components: {
    LayoutMerayakan,
    ElectionPercentage,
    Hint,
    Participan,
    Unduh,
    ExploreWidget,
    Detail,
    ModalUnduh,
    Keseruan,
    ModalKeseruan
  },
  data() {
    return {
      modal: false
    }
  },
  methods: {
    closeModal() {
      this.modal = false
    }
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

