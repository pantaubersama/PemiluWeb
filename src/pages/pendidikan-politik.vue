<template>
  <timeline-layout>
    <div slot="main-content">
      <div
        class="page card pendidikan-politik card-tabs"
        v-if="$route.name != 'PendidikanPolitikHint' && $route.name != 'PendidikanPolitikDetail'"
      >
        <div v-if="$route.name === 'PendidikanPolitik'">
          <div class="title-tabs">
            <router-link
              exact
              class="nav-tab--item"
              :to="{ path: '/pendidikan-politik'}"
            >Tanya Kandidat</router-link>
            <router-link
              v-if="isLoggedIn"
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
              @removeVoted="onRemoveVote($event)"
              :loading="isLoading"
              :userAuth="userAuth"
            ></question-list>
            <quiz-list
              v-if="activePage === 'quiz' && isLoggedIn"
              :totalKecenderungan="totalKecenderungan"
              :quizzes="isFilterQuiz ? quizzesFilter : quizzes"
              @onClickKecenderungan="openPageKecenderungan"
            ></quiz-list>
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
        <div v-if="$route.name === 'PendidikanPolitikQuizKecenderungan'">
          <kecenderungan-result
            :totalKecenderungan="totalKecenderungan"
            @close="onClickCloseButton"
          />
        </div>
        <div
          v-if="$route.name === 'PendidikanPolitikQuizIkuti' || $route.name === 'PendidikanPolitikQuizLanjut'"
        >
          <quiz-detail
            :showModal="showModal"
            @close="onClickCloseButton"
            @onClickNextButton="onClickNextButton"
            @onClickChoicesButton="onClickChoicesButton"
          />
        </div>
      </div>
      <div v-if="$route.name === 'PendidikanPolitikHint'">
        <HintBanner :object="getObject($route.query.type)"/>
      </div>
      <div v-if="$route.name === 'PendidikanPolitikDetail'">
        <DetailPost
          :data="detailPendidikanPolitik($route.params.id)"
          @upvoted="onUpvote($event)"
          @removeVoted="onRemoveVote($event)"
        />
      </div>
    </div>
    <template slot="widget-wrapper">
      <div v-if="showFilter">
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
          v-if="activePage === 'quiz' && isLoggedIn"
          :is-active="isWidgetFilterExpanded"
          @open="onOpenWidgetFilter(true)"
          @close="onOpenWidgetFilter(false)"
        >
          <div slot="content">
            <div class="dropdown-title">Quiz</div>
            <ul>
              <li v-for="input in listFilterQuiz" :key="input.id">
                <input
                  type="radio"
                  name="radio.quiz"
                  v-model="filterQuiz"
                  :id="`quiz.${input.id}`"
                  :value="input.value"
                >
                <label
                  :for="`quiz.${input.id}`"
                  v-on:click.stop="filterQuiz = input.value"
                >{{ input.name }}</label>
              </li>
            </ul>
            <div class="button-filter-group">
              <button class="btn btn-primary" @click.stop="filterQuizApply()">Terapkan</button>
              <button class="btn btn-outline" @click.stop="filterQuizReset()">Reset</button>
            </div>
          </div>
        </widget-filter>
        <div class="d-none d-lg-block">
          <router-link
            :to="{name: 'PendidikanPolitikHint', query: {type: 'tanya'}}"
            class="d-none d-lg-block"
            v-if="activePage === 'tanya'"
          >
            <widget-banner :data="bannerTanyaData ? bannerTanyaData : {}"/>
          </router-link>
          <router-link
            :to="{name: 'PendidikanPolitikHint', query: {type: 'kuis'}}"
            class="d-none d-lg-block"
            v-if="activePage === 'quiz'"
          >
            <widget-banner :data="bannerKuisData ? bannerKuisData : {}"/>
          </router-link>
        </div>
      </div>
      <div v-else>&nbsp;</div>
    </template>
  </timeline-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import router from '@/router'

import * as PenpolAPI from '@/services/api/modules/pendidikan-politik'

import TimelineLayout from '@/layout/Timeline'
import QuestionList from '@/components/pendidikan-politik/question-list'
import QuizList from '@/components/pendidikan-politik/quiz-list'
import QuizDetail from '@/components/pendidikan-politik/quiz-detail'
import QuizResult from '@/components/pendidikan-politik/quiz-result'
import WidgetFilter from '@/components/WidgetFilter'
import WidgetBanner from '@/components/Linimasa/WidgetBanner'
import HintBanner from '@/components/Linimasa/HintBanner'
import DetailPost from '@/components/pendidikan-politik/DetailPost'
import KecenderunganResult from '@/components/pendidikan-politik/kecenderungan-result'

export default {
  name: 'PendidikanPolitik',
  components: {
    TimelineLayout,
    QuestionList,
    QuizList,
    QuizDetail,
    QuizResult,
    WidgetFilter,
    WidgetBanner,
    HintBanner,
    DetailPost,
    KecenderunganResult
  },
  computed: {
    ...mapState({
      questions: state => state.pendidikanPolitik.questions,
      totalKecenderungan: state => state.pendidikanPolitik.totalKecenderungan,
      quizzesFilter: state => state.pendidikanPolitik.quizzes,
      isLoggedIn: s => s.profile.token != null,
      user: state => state.profile.user,
      userAuth: state => state.meLogout.userLogin
    }),
    ...mapGetters([
      'bannerKuisData',
      'bannerTanyaData',
      'quizzes',
      'detailPendidikanPolitik'
    ]),
    activePage() {
      if (this.$route.query.type == null) return 'tanya'
      return this.$route.query.type
    },
    showFilter() {
      const { name } = this.$route
      if (!this.$route || !name) return false
      const routes = [
        'PendidikanPolitikHint',
        'PendidikanPolitikDetail',
        'PendidikanPolitikQuizIkuti',
        'PendidikanPolitikQuizLanjut',
        'PendidikanPolitikQuizHasil',
        'PendidikanPolitikQuizKecenderungan'
      ]
      return !routes.includes(name)
    }
  },
  data() {
    return {
      isFilterQuiz: false,
      isLoading: true,
      isWidgetFilterExpanded: false,
      filterUser: 'user_verified_all',
      filterUrutan: 'created_at',
      filterQuiz: PenpolAPI.QuizType.ALL,
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
      ],
      listFilterQuiz: [
        {
          id: 1,
          value: PenpolAPI.QuizType.ALL,
          name: 'Semua'
        },
        {
          id: 2,
          value: PenpolAPI.QuizType.NOT_PARTICIPATED,
          name: 'Belum Diikuti'
        },
        {
          id: 3,
          value: PenpolAPI.QuizType.IN_PROGRESS,
          name: 'Diikuti'
        },
        {
          id: 4,
          value: PenpolAPI.QuizType.FINISHED,
          name: 'Selesai'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchQuestions', 'vote', 'unVote', 'fetchBannerInfo']),
    onOpenWidgetFilter(open) {
      this.isWidgetFilterExpanded = open
    },
    onUpvote(id) {
      this.vote(id)
    },
    onRemoveVote(id) {
      this.unVote(id)
    },
    onClickNextButton(isShow) {
      this.showModal = !isShow
      this.$store.dispatch('homeKenalan/updateKenalan', {
        id: 'f2596bdb-90ba-41e9-8c39-11c891c68f1f'
      })
    },
    onClickChoicesButton(value) {
      if (!value.next) {
        this.showModal = false

        setTimeout(() => {
          const { id } = this.$route.params
          router.push({ name: 'PendidikanPolitikQuizHasil', params: { id } })
        }, 700)
      }
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
    filterQuizApply() {
      this.isFilterQuiz = this.filterQuiz !== PenpolAPI.QuizType.ALL
      this.$store.dispatch('listFilterQuiz', { type: this.filterQuiz })
    },
    filterQuizReset() {
      this.isFilterQuiz = false
      this.filterQuiz = PenpolAPI.QuizType.ALL
      this.fetchDataQuiz()
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
    },
    fetchDataQuiz() {
      this.$store.dispatch('listAllQuiz')
      this.$store.dispatch('getTotalKecenderungan')
    },
    getObject(type) {
      switch (type) {
        case 'tanya':
          return this.bannerTanyaData
        case 'kuis':
          return this.bannerKuisData
      }
    },
    openPageKecenderungan() {
      router.push({ name: 'PendidikanPolitikQuizKecenderungan' })
    }
  },
  mounted() {
    this.fetchBannerInfo('tanya').then(async () => {
      await this.fetchDataQuestions()
      if (this.isLoggedIn) {
        await this.fetchDataQuiz()
      }
      await setTimeout(() => (this.isLoading = false), 1000)
    })
  }
}
</script>
