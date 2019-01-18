<template>
  <div class="card card-pilpres">
    <h4 class="title">Pilpres</h4>
    <div class="pilpres-content">
      <div v-if="feedsPilpres">
        <div class="card-list" v-for="pilpres in feedsPilpres" :key="pilpres.id">
          <div class="group-tilte">
            <div class="group-thumb">
              <img
                v-if="pilpres.team.avatar != null"
                :src="pilpres.team.avatar"
                :alt="pilpres.team.title"
              >
              <img v-else src="@/assets/icon-group.png" alt>
            </div>
            <div class="group-name">
              <p>Disematkan dari Team Pemenangan {{pilpres.team.title}}</p>
            </div>
          </div>
          <div class="group-content">
            <div class="content-thumb">
              <div class="image-thumb">
                <img
                  v-if="pilpres.account.profile_image_url != null"
                  :src="pilpres.account.profile_image_url"
                  :alt="pilpres.account.username"
                >
                <img v-else src="@/assets/user.svg" alt>
              </div>
              <div class="icon-thumb">
                <img src="@/assets/icon-twitter-rounded.svg" alt>
              </div>
            </div>
            <div class="content-desc">
              <div class="title-desc">
                <h5>
                  {{pilpres.account.name}}
                  <span>@{{pilpres.account.username}}</span>
                  <span>.</span>
                  <span>{{ pilpres.created_at_in_word.id }}</span>
                </h5>
                <a href class="icon-setting">
                  <icon-dots/>
                </a>
              </div>
              <div class="desc-text">
                <p v-html="pilpres.source.text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <loading-lottie v-if="loadingAnimating"/>
      <div class="load-more" @click="loadMore" v-if="!paginations.isLast">Tampilkan lebih banyak
        <div class="arrow-icon">
          <bottom-arrow/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BottomArrow, IconDots } from '@/svg/icons'
import { mapState, mapActions } from 'vuex'
import LoadingLottie from '@/components/LoadingLottie'
export default {
  name: 'CardPilpress',
  components: {
    BottomArrow,
    IconDots,
    LoadingLottie
  },
  computed: {
    ...mapState('homePilpres', ['feedsPilpres', 'paginations']),
    ...mapState('loadingLottie', ['loadingAnimating'])
  },
  created() {
    this.$store.dispatch('homePilpres/homePilpres')
  },
  methods: {
    loadMore() {
      if (this.paginations.isLast === false) {
        this.$store.dispatch('homePilpres/nextPage')
        this.$store.dispatch('homePilpres/updateHomePilpres')
      }
    }
  }
}
</script>
