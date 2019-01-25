<template>
  <div class="card card-tanya">
    <h4 class="title">Tanya</h4>
    <div class="tanya-content">
      <ul class="question-list">
        <li class="card-list" v-for="question in feedsQuestions" :key="question.id">
          <tanya-item
            :id="question.id"
            :title="question.user.about"
            :question="question.body"
            :time="question.created_at_in_word.id"
            :name="question.user.full_name"
            :avatar="question.user.avatar.thumbnail_square.url"
            :is-voted="question.is_liked"
            :count="question.like_count"
            @upvoted="onUpvote($event)"
          ></tanya-item>
        </li>
        <li v-if="loadingAnimating">
          <ContentLoader/>
        </li>
        <li class="load-more" @click="loadMore" v-if="!paginations.isLast">Tampilkan lebih banyak
          <div class="arrow-icon">
            <bottom-arrow/>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BottomArrow, IconDots } from '@/svg/icons'
import { mapState, mapActions } from 'vuex'
import LoadingLottie from '@/components/LoadingLottie'
import TanyaItem from '@/components/CardTanyaItem'
import ContentLoader from '@/components/Loading/ContentLoader'
export default {
  name: 'CardTanya',
  components: {
    BottomArrow,
    IconDots,
    LoadingLottie,
    TanyaItem,
    ContentLoader
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
    onUpvote(id) {
      this.vote(id)
    }
  }
}
</script>
