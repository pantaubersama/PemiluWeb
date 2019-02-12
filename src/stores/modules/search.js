import Vue from 'vue'
import * as SearchAPI from '@/services/api/search'

export const namespaced = true

export const state = {
  people: [],
  pilpres: [],
  clusterCategories: [],
  clusters: []
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
  setPilpres(state, pilpres) {
    Vue.set(state, 'pilpres', pilpres)
  },
  setCluster(state, cluster) {
    state.clusters = cluster
  },
  setClusterCategories(state, categories) {
    state.clusterCategories = categories
  }
}
