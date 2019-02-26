import * as Api from '@/services/api/wordstadium'

const WordstadiumType = Api.WordstadiumType

export const namespaced = true

export const state = {
  challenges: []
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
  }
}

export const actions = {
  async getAllChallenges(ctx) {
    const data = await Api.getAllChallenge()
    ctx.commit('setChallenges', data)
  }
}

export const mutations = {
  setChallenges(state, data) {
    state.challenges = data
  }
}
