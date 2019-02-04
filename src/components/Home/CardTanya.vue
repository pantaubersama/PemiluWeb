<template>
  <div class="card card-tanya">
    <h4 class="title">Tanya Kandidat</h4>
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
            @removeVoted="onRemoveVote($event)"
          ></tanya-item>
        </li>
        <li v-if="loadingAnimating">
          <ContentLoader/>
        </li>
        <router-link
          to="/pendidikan-politik?type=tanya"
          class="load-more"
          v-if="!paginations.isLast"
        >Tampilkan lebih banyak
          <div class="arrow-icon">
            <bottom-arrow/>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { BottomArrow, IconDots } from '@/svg/icons'
import { mapState, mapActions } from 'vuex'
import LoadingLottie from '@/components/LoadingLottie'
import TanyaItem from '@/components/Home/CardTanyaItem'
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
    ...mapActions(['vote', 'unVote']),
    loadMore() {
      if (this.paginations.isLast === false) {
        this.$store.dispatch('homeQuestions/nextPage')
        this.$store.dispatch('homeQuestions/updateHomeQuestions')
      }
    },
    onUpvote(id) {
      this.vote(id).then(() => this.$store.commit('homeQuestions/setVoted', id))
    },
    onRemoveVote(id) {
      this.unVote(id).then(() =>
        this.$store.commit('homeQuestions/removeVoted', id)
      )
    }
  }
}
</script>
