import Vue from 'vue'
import * as Api from '@/services/api/wordstadium'

const WordstadiumType = Api.WordstadiumType

export const namespaced = true

export const state = {
  challenges: [],
  ownChallenges: []
}

export const getters = {
  lives: state => {
    if (!state.challenges) return []
    return state.challenges.filter(
      item => item.condition === WordstadiumType.LIVE_NOW
    )
  },
  ongoing: state => {
    if (!state.challenges) return []
    return state.challenges.filter(
      item => item.condition === WordstadiumType.ONGOING
    )
  },
  comingSoon: state => {
    if (!state.challenges) return []
    return state.challenges.filter(
      item => item.condition === WordstadiumType.COMING_SOON
    )
  },
  done: state => {
    if (!state.challenges) return []
    return state.challenges.filter(
      item => item.condition === WordstadiumType.DONE
    )
  },
  ownOngoing: state => {
    if (!state.ownChallenges) return []
    return state.ownChallenges.filter(
      item => item.condition === WordstadiumType.ONGOING
    )
  },
  ownComingSoon: state => {
    if (!state.ownChallenges) return []
    return state.ownChallenges.filter(
      item => item.condition === WordstadiumType.COMING_SOON
    )
  },
  ownDone: state => {
    if (!state.ownChallenges) return []
    return state.ownChallenges.filter(
      item => item.condition === WordstadiumType.DONE
    )
  }
}

export const getters = {
  ongoing: s => (limit = 5) => Object.values(s.challenges)
    .filter(it => it.condition === 'ongoing')
    .slice(0, limit)
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
  async getOngoingChallenges(ctx) {
    const data = await Api.getAllChallenge('ongoing')
    ctx.commit('setChallenges', data)
  }
}

export const mutations = {
  setChallenges(state, data) {
    data.challenges.forEach((challenge) => Vue.set(state.challenges, challenge.id, challenge))
  },
  setOwnChallenges(state, data) {
    data.challenges.forEach((challenge) => Vue.set(state.ownChallenges, challenge.id, challenge))
  }
}
