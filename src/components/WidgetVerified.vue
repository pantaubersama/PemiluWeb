<template>
  <div class="card">
    <h4 class="title">Kenalan Pantau Bersama</h4>
    <div class="card-content">
      <ul>
        <li v-for="kenalan in feedsKenalan" :key="kenalan.id">
          <div v-if="kenalan.is_action == false">
            <a href class="active">
              <check-icon/>
              {{kenalan.text}}
            </a>
          </div>
          <div class="content-past" v-else>
            <check-icon/>
            {{kenalan.text}}
          </div>
        </li>
      </ul>
      <loading-lottie v-if="loadingAnimating"/>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from '@/svg/icons'
import LoadingLottie from '@/components/LoadingLottie'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'WidgetVerified',
  components: {
    CheckIcon,
    LoadingLottie
  },
  computed: {
    ...mapState('homeKenalan', ['feedsKenalan']),
    ...mapState('loadingLottie', ['loadingAnimating'])
  },
  created() {
    this.$store.dispatch('homeKenalan/homeKenalan')
  }
}
</script>
