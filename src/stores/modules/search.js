import Vue from 'vue'
import * as SearchAPI from '@/services/api/search'

export const namespaced = true

export const state = {
  people: [],
  pilpres: [],
}

export const actions = {
  async people(ctx, payload) {
    const people = await SearchAPI.people(payload)
    ctx.commit('setPeople', people)
  },
  async pilpres(ctx, payload) {
    const pilpres = await SearchAPI.pilpres(payload)
    ctx.commit('setPilpres', pilpres)
  },
  }
}

export const mutations = {
  setPeople(state, people) {
    Vue.set(state, 'people', people)
  },
  setPilpres(state, pilpres) {
    Vue.set(state, 'pilpres', pilpres)
  },
  }
}
