import Vue from 'vue'
import * as SearchAPI from '@/services/api/search'

export const namespaced = true

export const state = {
  people: []
}

export const actions = {
  async people(ctx, payload) {
    const people = await SearchAPI.people(payload)
    ctx.commit('setPeople', people)
  }
}

export const mutations = {
  setPeople(state, people) {
    Vue.set(state, 'people', people)
  }
}
