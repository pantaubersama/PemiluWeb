import Vue from 'vue'
import * as SearchAPI from '@/services/api/search'

export const namespaced = true

export const state = {
  people: [],
  janjiPolitiks: [],
  questions: [],
  pilpres: [],
  clusterCategories: [],
  clusters: [],
  quizzes: []
}

export const actions = {
  async people(ctx, payload) {
    await SearchAPI.people(payload).then(people => {
      ctx.commit('setPeople', people)
    }).catch(error => {
      console.log(error)
    })
  },
  async janjiPolitiks(ctx, payload) {
    await SearchAPI.janjiPolitiks(payload).then(janjiPolitiks => {
      ctx.commit('setJanjiPolitiks', janjiPolitiks)
    }).catch(error => {
      console.log(error)
    })
  },
  async questions(ctx, payload) {
    await SearchAPI.questions(payload).then(questions => {
      ctx.commit('setQuestions', questions)
    }).catch(error => {
      console.log(error)
    })
  },
  async quiz(ctx, payload) {
    await SearchAPI.quiz(payload).then(quizzes => {
      ctx.commit('setQuizzes', quizzes)
    }).catch(error => {
      console.log(error)
    })
  },
  async pilpres(ctx, payload) {
    const pilpres = await SearchAPI.pilpres(payload)
    ctx.commit('setPilpres', pilpres)
  },
  async cluster(ctx, payload) {
    const cluster = await SearchAPI.cluster(payload)
    ctx.commit('setCluster', cluster)
  },
  async clusterCategory(ctx, payload) {
    const categories = await SearchAPI.clusterCategories(payload)
    ctx.commit('setClusterCategories', categories)
  }
}

export const mutations = {
  setPeople(state, people) {
    Vue.set(state, 'people', people)
  },
  setJanjiPolitiks(state, janjiPolitiks) {
    Vue.set(state, 'janjiPolitiks', janjiPolitiks)
  },
  setQuestions(state, questions) {
    Vue.set(state, 'questions', questions)
  },
  setPilpres(state, pilpres) {
    Vue.set(state, 'pilpres', pilpres)
  },
  setQuizzes(state, quizzes) {
    Vue.set(state, 'quizzes', quizzes)
  },
  setCluster(state, cluster) {
    state.clusters = cluster
  },
  setClusterCategories(state, categories) {
    state.clusterCategories = categories
  }
}
