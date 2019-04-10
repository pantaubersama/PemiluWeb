import Vue from 'vue'
import * as Api from '@/services/api/wordstadium'

const WordstadiumType = Api.WordstadiumType

export const namespaced = true

export const state = {
  challenges: {},
  ownChallenges: [],
  privateChallenges: [],
  words: {},
  comments: {},
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
  wordsById: (s, g) => (id) => s.words[id],
  commentsById: (s, g) => (id) => s.comments[id],
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
  },
  async getWords(ctx, { id, page }) {
    const words = await Api.getWords(id, page)
    ctx.commit('setWords', { id, words })
  },
  async getComments(ctx, { id, page }) {
    const words = await Api.getComments(id, page)
    ctx.commit('setComments', { id, words })
  },
  async clap(ctx, word) {
    Api.clap(word.id)
    ctx.commit('clap', { word })
  },
  async postComment(ctx, payload) {
    const resp = await Api.postComment(payload.challenge_id, payload.words)
    const comments = ctx.getters.commentsById(payload.challenge_id)
    ctx.commit('addComment', { comments, word: resp.word })
  },
  async postArgument(ctx, { challenge_id, words }) {
    const word = await Api.postArgument(challenge_id, words)
    const wordsList = ctx.getters.wordsById(payload.words)
    ctx.commit('addWord', { words: wordsList, word })
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
  },
  setWords(state, payload) {
    Vue.set(state.words, payload.id, [...payload.words])
  },
  addWord(state, { words, word }) {
    words.push(word)
  },
  setComments(state, { id, words }) {
    Vue.set(state.comments, id, [...words])
  },
  addComment(state, { comments, word }) {
    comments.push(word)
  },
  clap(state, { word }) {
    if (word.is_clap) { word.clap_count -= 1}
    else { word.clap_count += 1 }
    word.is_clap = !word.is_clap
  }
}
