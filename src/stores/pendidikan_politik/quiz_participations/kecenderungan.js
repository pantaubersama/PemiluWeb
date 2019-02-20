import ApiGetKecenderungan from '@/services/api/v1/pendidikan_politik/quiz_participations/kecenderungan'
import Vue from 'vue'

// initial state
const state = {
  isLoading: true,
  totalKecenderungan: {
    totalQuiz: 0,
    finishedQuiz: 0,
    percentage: 0,
    groupName: null,
    userId: null,
    fullName: null,
    groupAvatar: null,
    id: null,
    image: null
  }
}

// actions
const actions = {

  getKecenderungan({ commit }, payload) {
    ApiGetKecenderungan.getKecenderungan(payload.id, result => {
      commit('setKecenderungan', result.data)
    })
  },

  emptyData({ commit }) {
    commit('emptyData')
  }

}

// mutations
const mutations = {

  setKecenderungan(state, r) {
    var resp = r.data
    var selectedData = null
    if (resp.teams[0].percentage === 50.0) {
      selectedData = resp.teams[Math.floor(resp.teams.length * Math.random())]
    } else {
      selectedData = resp.teams.find(item => item.percentage === Math.max(...resp.teams.map(function(d) { return d.percentage })))
    }
    const id = resp.quiz_preference.id
    const percentage = Math.ceil(selectedData.percentage)
    const totalQuiz = resp.meta.quizzes.total
    const finishedQuiz = resp.meta.quizzes.finished
    const groupName = selectedData.team.title
    const fullName = resp.user.full_name
    const groupAvatar = selectedData.team.avatar
    const image = resp.quiz_preference.image_result.url
    const userId = resp.user.id

    const payload = {
      id,
      finishedQuiz,
      totalQuiz,
      groupName,
      percentage,
      fullName,
      groupAvatar,
      image,
      userId
    }

    Vue.set(state, 'totalKecenderungan', payload)
    state.isLoading = false
  },

  emptyData(state) {
    const payload = {
      totalQuiz: 0,
      finishedQuiz: 0,
      percentage: 0,
      groupName: null,
      userId: null,
      fullName: null,
      groupAvatar: null,
      id: null,
      image: null
    }
    Vue.set(state, 'totalKecenderungan', payload)
  }

}

// getters
const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
