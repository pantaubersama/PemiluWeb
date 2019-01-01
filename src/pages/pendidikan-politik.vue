<template>
  <timeline-layout>
    <div slot="main-content" class="page card pendidikan-politik">
      <div class="nav-tab--list">
          <router-link class="nav-tab--item"
            :class="{ active: activePage === 'tanya' }"
            :to="{ path: '/pendidikan-politik', query: { type: 'tanya' } }">
            Tanya
          </router-link>
          <router-link class="nav-tab--item"
            :class="{ active: activePage === 'quiz' }"
            :to="{ path: '/pendidikan-politik', query: { type: 'quiz' } }">
            Quiz
          </router-link>
      </div>

      <div class="content">
        <question-list v-if="activePage === 'tanya'"
          :questions="questions"
          @upvoted="onUpvote($event)">
        </question-list>
        <quiz-list v-if="activePage === 'quiz'"></quiz-list>
      </div>
    </div>
    <div slot="widget-wrapper">
      <widget-filter
        :is-active="isWidgetFilterExpanded"
        @open="onOpenWidgetFilter(true)"
        @close="onOpenWidgetFilter(false)">
        <div slot="content">
          <div class="dropdown-title">User</div>
          <ul>
            <li>
              <input type="radio" id="user1"
                name="user1"
                value="semua"
                v-model="filterUser">
              <label for="user1">Semua</label>
            </li>
            <li>
              <input type="radio" id="user2" name="user2"
                value="belum-verifikasi"
                v-model="filterUser">
              <label for="user2">Belum Verifikasi</label>
            </li>
            <li>
              <input type="radio" id="user3" name="user3"
                value="terverifikasi"
                v-model="filterUser">
              <label for="user3">Terverifikasi</label>
            </li>
          </ul>
          <div class="dropdown-title">Urutan</div>
          <ul>
            <li>
              <input type="radio" id="urutan1" name="urutan1"
                value="paling-baru"
                v-model="filterUrutan">
              <label for="urutan1">Paling baru</label>
            </li>
            <li>
              <input type="radio" id="urutan2" name="urutan2"
                value="paling-banyak-divoting"
                v-model="filterUrutan">
              <label for="urutan2">Paling banyak divoting</label>
            </li>
          </ul>
          <div class="button-filter-group">
            <button class="btn btn-primary">Terapkan</button>
            <button class="btn btn-outline">Reset</button>
          </div>
        </div>
      </widget-filter>
      <widget-footer-tanya v-if="activePage === 'tanya'"></widget-footer-tanya>
      <widget-footer-quiz v-if="activePage === 'quiz'"></widget-footer-quiz>
    </div>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/timeline'
import QuestionList from '@/components/pendidikan-politik/question-list'
import QuizList from '@/components/pendidikan-politik/quiz-list'
import WidgetFilter from '@/components/WidgetFilter'
import WidgetFooterTanya from '@/components/pendidikan-politik/widget-footer-tanya'
import WidgetFooterQuiz from '@/components/pendidikan-politik/widget-footer-quiz'

export default {
  name: 'PendidikanPolitik',
  components: {
    TimelineLayout,
    QuestionList,
    QuizList,
    WidgetFilter,
    WidgetFooterTanya,
    WidgetFooterQuiz
  },
  computed: {
    activePage () {
      if (this.$route.query.type == null) return 'tanya'
      return this.$route.query.type
    }
  },
  data() {
    return {
      isWidgetFilterExpanded: false,
      filterUser: 'semua',
      filterUrutan: 'paling-baru',
      questions: Array.from(Array(20).keys())
        .map((id) => ({
          id: id,
          name: 'Trump',
          avatar: '@/assets/trump.jpg',
          title: 'Apa apa apa apa apa?',
          time: '8 days ago',
          isVoted: false,
          question: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, harum quibusdam voluptatem rem nihil, eius repellat, atque soluta praesentium eligendi illum dolores quo quae nemo ex nam quam aut ab.'
        }))
    }
  },
  methods: {
    onOpenWidgetFilter(open) {
      this.isWidgetFilterExpanded = open
    },
    onUpvote(id) {
      const question = this.questions.find(it => it.id === id)
      question.isVoted = true
    }
  }
}
</script>

<style lang="sass" scoped>
.card.page.pendidikan-politik
  .nav-tab
    &--list
      padding: 10px 25px
      border-bottom: 1px solid #ececec
      font-size: 14px
      font-weight: 600
      margin-bottom: 0
      text-transform: uppercase
    &--item
      margin-left: 20px
      color: inherit
      &:hover
        text-decoration: underline
      &:first-child
        margin-left: 0
      &.active
        color: #9B0012
</style>
