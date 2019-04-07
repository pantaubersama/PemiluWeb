import Vue from 'vue'
import * as Api from '@/services/api/wordstadium'

const WordstadiumType = Api.WordstadiumType

export const namespaced = true

export const state = {
  challenges: {},
  ownChallenges: [],
  privateChallenges: []
}

export const getters = {
  privateOngoing: s => (limit = 5) => Object.values(s.privateChallenges)
    .filter(it => it.condition === 'ongoing')
    .slice(0, limit),
  publicChallenges: s => Object.values(s.challenges),
  comingSoon: (s, g) => g.publicChallenges.filter(it => it.progress === 'coming_soon'),
  challenges: (s, g) => g.publicChallenges.filter((it) => {
    return it.progress === 'waiting_confirmation' || it.progress === 'waiting_opponent'
  }),
  lives: (s, g) => g.publicChallenges.filter(it => it.progress === 'live_now'),
  done: (s, g) => g.publicChallenges.filter(it => it.progress === 'done'),
  challengeById: (s, g) => (id) => g.publicChallenges.find(it => it.id === id),
  privateChallenges: (s) => Object.values(s.privateChallenges),
  privateComingSoon: (s, g) => g.privateChallenges.filter(it => it.progress === 'coming_soon'),
  privateDone: (s, g) => g.privateChallenges.filter(it => it.progress === 'done'),
  privateChallenge: (s, g) => g.privateChallenges.filter(it => it.progress === 'waiting_opponent' || it.progress === 'waiting_confirmation'),
  privateLive: (s, g) => g.privateChallenges.filter(it => it.progress === 'live_now')
}

export const actions = {
  async getAllChallenges(ctx) {
    const data = await Api.getAllChallenge()
    ctx.commit('setChallenges', data)
  },
  async getMeAllChallenges(ctx) {
    const data = await Api.getMeAllChallenge()
    ctx.commit('setOwnChallenges', data)
  },
  async getComingSoonChallenges(ctx) {
    const data = await Api.getChallenge('coming_soon')
    ctx.commit('setChallenges', data)
  },
  async getChallenges(ctx) {
    const data = await Api.getAllChallenge('challenge')
    ctx.commit('setChallenges', data)
  },
  async getPrivateChallenges(ctx) {
    const data = await Api.getPrivateChallenge('challenge')
    ctx.commit('setPrivateChallenges', data)
  },
  async getChallenge(ctx, type) {
    const data = await Api.getChallenge(type)
    ctx.commit('setChallenges', data)
  },
  async getPrivateChallenge(ctx, type) {
    const data = await Api.getPrivateChallenge(type)
    ctx.commit('setPrivateChallenges', data)
  },
  async getChallengeById(ctx, id) {
    const challenge = await Api.getChallengeById(id)
    ctx.commit('setChallenges', [challenge])
  }
}

export const mutations = {
  setChallenges(state, data) {
    data.forEach((it) => Vue.set(state.challenges, it.id, it))
  },
  setOwnChallenges(state, data) {
    data.challenges.forEach((challenge) => Vue.set(state.ownChallenges, challenge.id, challenge))
  },
  setPrivateChallenges(state, data) {
    data.forEach((challenge) => Vue.set(state.privateChallenges, challenge.id, challenge))
  }
}
