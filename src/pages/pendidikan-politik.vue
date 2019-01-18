<template>
  <timeline-layout>
    <div slot="main-content" class="page card pendidikan-politik">
      <div v-if="$route.name === 'PendidikanPolitik'">
        <div class="nav-tab--list">
          <router-link
            class="nav-tab--item"
            :class="{ active: activePage === 'tanya' }"
            :to="{ path: '/pendidikan-politik', query: { type: 'tanya' } }"
          >Tanya</router-link>
          <router-link
            class="nav-tab--item"
            :class="{ active: activePage === 'quiz' }"
            :to="{ path: '/pendidikan-politik', query: { type: 'quiz' } }"
          >Quiz</router-link>
        </div>

        <div class="content">
          <question-list
            v-if="activePage === 'tanya'"
            :questions="questions"
            @upvoted="onUpvote($event)"
          ></question-list>
          <quiz-list v-if="activePage === 'quiz'"></quiz-list>
        </div>
      </div>
      <div v-if="$route.name === 'PendidikanPolitikQuizHasil'">
        <quiz-result
          :showModal="showModal"
          @onClickAnswerButton="onClickAnswerButton"
          @close="onClickCloseButton"
          @onClickNextButton="onClickNextButton"
          @onClickChoicesButton="onClickChoicesButton"
        />
      </div>
      <div
        v-if="$route.name === 'PendidikanPolitikQuizIkuti' ||
        $route.name === 'PendidikanPolitikQuizLanjut'"
      >
        <quiz-detail
          :showModal="showModal"
          @close="onClickCloseButton"
          @onClickNextButton="onClickNextButton"
          @onClickChoicesButton="onClickChoicesButton"
        />
      </div>
    </div>
    <template slot="widget-wrapper">
      <widget-filter
        v-if="activePage === 'tanya'"
        :is-active="isWidgetFilterExpanded"
        @open="onOpenWidgetFilter(true)"
        @close="onOpenWidgetFilter(false)"
      >
        <div slot="content">
          <div class="dropdown-title">User</div>
          <ul>
            <li v-for="input in listFilterUser" :key="input.id">
              <input
                type="radio"
                name="radio.user"
                v-model="filterUser"
                :id="`user.${input.id}`"
                :value="input.value"
              >
              <label
                :for="`user.${input.id}`"
                v-on:click.stop="filterUser = input.value"
              >{{ input.name }}</label>
            </li>
          </ul>
          <div class="dropdown-title">Urutan</div>
          <ul>
            <li v-for="input in listFilterSorting" :key="input.id">
              <input
                type="radio"
                name="radio.urutan"
                v-model="filterUrutan"
                :id="`urutan.${input.id}`"
                :value="input.value"
              >
              <label
                :for="`urutan.${input.id}`"
                v-on:click.stop="filterUrutan = input.value"
              >{{ input.name }}</label>
            </li>
          </ul>
          <div class="button-filter-group">
            <button class="btn btn-primary" @click.stop="filterApply()">Terapkan</button>
            <button class="btn btn-outline" @click.stop="filterReset()">Reset</button>
          </div>
        </div>
      </widget-filter>
      <widget-filter
        v-if="activePage === 'quiz'"
        :is-active="isWidgetFilterExpanded"
        @open="onOpenWidgetFilter(true)"
        @close="onOpenWidgetFilter(false)"
      >
        <div slot="content">
          <div class="dropdown-title">Quiz</div>
          <ul>
            <li>
              <input type="radio" id="quiz1" name="quiz1" value="semua" v-model="filterQuiz">
              <label for="quiz1">Semua</label>
            </li>
            <li>
              <input
                type="radio"
                id="quiz2"
                name="quiz2"
                value="belum-diikuti"
                v-model="filterQuiz"
              >
              <label for="quiz2">Belum Diikuti</label>
            </li>
            <li>
              <input type="radio" id="quiz3" name="quiz3" value="diikuti" v-model="filterQuiz">
              <label for="quiz3">Diikuti</label>
            </li>
            <li>
              <input type="radio" id="quiz4" name="quiz4" value="selesai" v-model="filterQuiz">
              <label for="quiz4">Selesai</label>
            </li>
          </ul>
          <div class="button-filter-group">
            <button class="btn btn-primary">Terapkan</button>
            <button class="btn btn-outline">Reset</button>
          </div>
        </div>
      </widget-filter>
      <div class="d-none d-lg-block">
        <widget-footer-tanya v-if="activePage === 'tanya'"></widget-footer-tanya>
        <widget-footer-quiz v-if="activePage === 'quiz'"></widget-footer-quiz>
      </div>
    </template>
  </timeline-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import TimelineLayout from '@/layout/Timeline'
import QuestionList from '@/components/pendidikan-politik/question-list'
import QuizList from '@/components/pendidikan-politik/quiz-list'
import QuizDetail from '@/components/pendidikan-politik/quiz-detail'
import QuizResult from '@/components/pendidikan-politik/quiz-result'
import WidgetFilter from '@/components/WidgetFilter'
import WidgetFooterTanya from '@/components/pendidikan-politik/widget-footer-tanya'
import WidgetFooterQuiz from '@/components/pendidikan-politik/widget-footer-quiz'

export default {
  name: 'PendidikanPolitik',
  components: {
    TimelineLayout,
    QuestionList,
    QuizList,
    QuizDetail,
    QuizResult,
    WidgetFilter,
    WidgetFooterTanya,
    WidgetFooterQuiz
  },
  computed: {
    ...mapState({
      questions: state => state.pendidikanPolitik.questions
    }),
    activePage() {
      if (this.$route.query.type == null) return 'tanya'
      return this.$route.query.type
    }
  },
  data() {
    return {
      isWidgetFilterExpanded: false,
      filterUser: 'user_verified_all',
      filterUrutan: 'created_at',
      filterQuiz: 'semua',
      showModal: false,
      listFilterUser: [
        {
          id: 1,
          value: 'user_verified_all',
          name: 'Semua'
        },
        {
          id: 2,
          value: 'user_verified_false',
          name: 'Belum Verifikasi'
        },
        {
          id: 3,
          value: 'user_verified_true',
          name: 'Terverifikasi'
        }
      ],
      listFilterSorting: [
        {
          id: 1,
          value: 'created_at',
          name: 'Paling baru'
        },
        {
          id: 2,
          value: 'cached_votes_up',
          name: 'Paling banyak divoting'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchQuestions']),
    onOpenWidgetFilter(open) {
      this.isWidgetFilterExpanded = open
    },
    onUpvote(id) {
      const question = this.questions.find(it => it.id === id)
      question.isVoted = true
    },
    onClickNextButton(isShow) {
      this.showModal = !isShow
    },
    onClickChoicesButton(choice) {
      this.showModal = false
    },
    onClickCloseButton() {
      this.showModal = false
    },
    onClickAnswerButton() {
      this.showModal = true
    },
    filterApply() {
      this.fetchDataQuestions()
    },
    async filterReset() {
      this.filterUser = 'user_verified_all'
      this.filterUrutan = 'created_at'
      await this.fetchDataQuestions()
    },
    fetchDataQuestions() {
      const payload = {
        page: 1,
        perPage: 100,
        query: '',
        operator: 'and',
        match: 'word_start',
        orderBy: this.filterUrutan,
        direction: 'desc',
        filter: this.filterUser
      }
      this.fetchQuestions(payload)
    }
  },
  mounted() {
    this.fetchDataQuestions()
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
