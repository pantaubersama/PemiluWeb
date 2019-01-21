<template>
  <div class="card card-tanya">
    <h4 class="title">Tanya</h4>
    <div class="tanya-content">
      <div class="card-list" v-for="question in feedsQuestions" :key="question.id">
        <div class="group-content">
          <div class="content-count">
            <tanya-upvote
              :id="question.id"
              :is-voted="question.is_liked"
              :count="question.like_count"
              @upvoted="$emit('upvoted', $event)"
            ></tanya-upvote>
          </div>
          <div class="content-desc">
            <div class="title-desc">
              <div class="title-thumb">
                <img
                  v-if="question.user.avatar.thumbnail.url != null"
                  :src="question.user.avatar.thumbnail.url"
                  :alt="question.user.title"
                >
                <img src="@/assets/user.svg">
              </div>
              <div class="title-center">
                <h5>{{question.user.full_name}},</h5>
                <p>{{question.user.about}}</p>
              </div>
              <div class="title-right">{{question.created_at_in_word.id}}</div>
            </div>
            <div class="desc-text">
              <p v-html="trimCharacters(question.body, 150)"></p>
            </div>
            <div class="desc-icon">
              <a href>
                <img src="@/assets/icon_share.svg">
              </a>
              <a href class="icon-setting">
                <icon-dots/>
              </a>
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
import TanyaUpvote from '@/components/CardTanyaUpvote'
export default {
  name: 'CardTanya',
  components: {
    BottomArrow,
    IconDots,
    LoadingLottie,
    TanyaUpvote
  },
  computed: {
    ...mapState('homeQuestions', ['feedsQuestions', 'paginations']),
    ...mapState('loadingLottie', ['loadingAnimating'])
  },
  created() {
    this.$store.dispatch('homeQuestions/homeQuestions')
  },
  methods: {
    loadMore() {
      if (this.paginations.isLast === false) {
        this.$store.dispatch('homeQuestions/nextPage')
        this.$store.dispatch('homeQuestions/updateHomeQuestions')
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
