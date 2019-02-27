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

export const getters = {
  quizzesFilter: state => status => {
    if (!status || status === 'all') return state.quizzes
    return state.quizzes.filter(quiz => quiz.participation_status === status)
  }
}

export const actions = {
  async people(ctx, payload) {
    await SearchAPI.people(payload).then(people => {
      ctx.commit('showLottie/hideLottie',{},{
        root: true
      })
      ctx.commit('setPeople', people)
      if(people.length <= 0){
        ctx.commit('showLottie/showLottie',{},{
          root: true
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  async janjiPolitiks(ctx, payload) {
    await SearchAPI.janjiPolitiks(payload).then(janjiPolitiks => {
      ctx.commit('showLottie/hideLottie',{},{
        root: true
      })
      ctx.commit('setJanjiPolitiks', janjiPolitiks)
      if(janjiPolitiks.length <= 0){
        ctx.commit('showLottie/showLottie',{},{
          root: true
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  async questions(ctx, payload) {
    await SearchAPI.questions(payload).then(questions => {
      ctx.commit('showLottie/hideLottie',{},{
        root: true
      })
      ctx.commit('setQuestions', questions)
      if(questions.length <= 0){
        ctx.commit('showLottie/showLottie',{},{
          root: true
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  async quiz(ctx, payload) {
    await SearchAPI.quiz(payload).then(quizzes => {
      ctx.commit('showLottie/hideLottie',{},{
        root: true
      })
      ctx.commit('setQuizzes', quizzes)
      if(quizzes.length <= 0){
        ctx.commit('showLottie/showLottie',{},{
          root: true
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  async pilpres(ctx, payload) {
    const pilpres = await SearchAPI.pilpres(payload)
    ctx.commit('showLottie/hideLottie',{},{
      root: true
    })
    ctx.commit('setPilpres', pilpres)
    if(pilpres.length <= 0){
      ctx.commit('showLottie/showLottie',{},{
        root: true
      })
    }
  },
  async cluster(ctx, payload) {
    const cluster = await SearchAPI.cluster(payload)
    ctx.commit('showLottie/hideLottie',{},{
      root: true
    })
    ctx.commit('setCluster', cluster)
    if(cluster.length <= 0){
      ctx.commit('showLottie/showLottie',{},{
        root: true
      })
    }
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
