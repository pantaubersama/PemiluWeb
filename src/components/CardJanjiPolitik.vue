<template>
  <div class="card card-politik">
    <h4>Janji Politik</h4>
    <div v-if="feedsJanjiPolitik">
      <div class="card-content" v-for="janjiPolitik in feedsJanjiPolitik" :key="janjiPolitik.id">
        <div class="top">
          <div class="avatar">
            <a href v-if="janjiPolitik.creator.avatar.thumbnail.url != null">
              <img :src="janjiPolitik.creator.avatar.thumbnail.url">
            </a>
            <a href v-else>
              <img src="@/assets/user.svg">
            </a>
          </div>
          <h5>
            {{janjiPolitik.creator.full_name}},
            <span>{{janjiPolitik.creator.cluster.name}}</span>
          </h5>
          <span class="right">{{janjiPolitik.created_at_in_word.id}}</span>
        </div>
        <h4 class="title" v-html="trimCharacters(janjiPolitik.title, 150)"></h4>
        <div class="main-content">
          <p v-html="trimCharacters(janjiPolitik.body)"></p>
          <div class="content-thumb" v-if="janjiPolitik.image.url != null">
            <img :src="janjiPolitik.image.url">
          </div>
        </div>
        <span class="icon-right">
          <a href>
            <img src="@/assets/icon_share.svg">
          </a>
          <a href class="icon-setting">
            <icon-dots/>
          </a>
        </span>
      </div>
    </div>
    <loading-lottie v-if="loadingAnimating"/>
    <div class="load-more" @click="loadMore" v-if="!paginations.isLast">Tampilkan lebih banyak
      <div class="arrow-icon">
        <bottom-arrow/>
      </div>
    </div>
  </div>
</template>

<script>
import { BottomArrow, IconDots } from '@/svg/icons'
import { mapState, mapActions } from 'vuex'
import LoadingLottie from '@/components/LoadingLottie'
export default {
  name: 'CardJP',
  components: {
    BottomArrow,
    IconDots,
    LoadingLottie
  },
  computed: {
    ...mapState('homeJanjiPolitik', ['feedsJanjiPolitik', 'paginations']),
    ...mapState('loadingLottie', ['loadingAnimating'])
  },
  created() {
    this.$store.dispatch('homeJanjiPolitik/homeJanjiPolitik')
  },
  methods: {
    loadMore() {
      if (this.paginations.isLast === false) {
        this.$store.dispatch('homeJanjiPolitik/nextPage')
        this.$store.dispatch('homeJanjiPolitik/updateJanjiPolitik')
      }
    },
    trimCharacters(text, maxLength = 350) {
      const dots = text.length > maxLength
      if (dots) {
        text = text.substr(0, maxLength)
        text = text.substr(0, Math.min(text.length, text.lastIndexOf(' ')))
      }
      return dots ? `${text}...` : text
    }
  }
}
</script>
