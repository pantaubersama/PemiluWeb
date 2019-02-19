import * as Api from '@/services/api/wordstadium'

export const namespaced = true

export const state = {
  challenges: {}
}

export const actions = {
  async getLiveChallenges(ctx) {
    const data = await Api.getAllChallenge('live_now')
    ctx.commit('setChallenges', data)
  }
}

export const mutations = {
  setChallenges(state, data) {

  }
}
