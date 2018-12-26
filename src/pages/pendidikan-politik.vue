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
        <question-list v-if="activePage === 'tanya'"></question-list>
        <quiz-list v-if="activePage === 'quiz'"></quiz-list>
      </div>
    </div>
    <div slot="widget-wrapper">
      <widget-filter></widget-filter>
      <widget-footer-tanya v-if="activePage === 'tanya'"></widget-footer-tanya>
      <widget-footer-quiz v-if="activePage === 'quiz'"></widget-footer-quiz>
    </div>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/timeline'
import QuestionList from '@/components/pendidikan-politik/question-list'
import QuizList from '@/components/pendidikan-politik/quiz-list'
import WidgetFilter from '@/components/pendidikan-politik/widget-filter'
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
