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
  challenges: s => Object.values(s.challenges)
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
    const data = await Api.getAllChallenge('coming_soon')
    ctx.commit('setChallenges', data)
  },
  async getChallenges(ctx) {
    const data = await Api.getAllChallenge('challenge')
    ctx.commit('setChallenges', data)
  },
  async getPrivateChallenges(ctx) {
    const data = await Api.getPrivateChallenge('challenge')
    ctx.commit('setPrivateChallenges', data)
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
    data.challenges.forEach((challenge) => Vue.set(state.privateChallenges, challenge.id, challenge))
  }
}
