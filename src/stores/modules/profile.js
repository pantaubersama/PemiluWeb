import Vue from 'vue'
import {
  vueAuth
} from '@/services/symbolic'
import * as ProfileAPI from '@/services/api/profile'
import * as LiniMasaAPI from '@/services/api/modules/lini-masa'
import * as PenpolAPI from '@/services/api/modules/pendidikan-politik'
export const namespaced = true
export const state = {
  token: null,
  user: {
    id: null,
    email: null,
    full_name: null,
    uid: null,
    provider: null,
    is_admin: false,
    is_moderator: false,
    cluster: null,
    vote_preference: null,
    political_party: null,
    verified: false,
    twitter: false,
    facebook: false,
    username: null,
    about: null,
    location: null,
    education: null,
    occupation: null,
    avatar: {
      url: null,
      thumbnail: {
        url: null
      },
      thumbnail_square: {
        url: null
      },
      medium: {
        url: null
      },
      medium_square: {
        url: null
      }
    },
    informant: {
      user_id: null,
      identity_number: null,
      pob: null,
      dob: null,
      gender: null,
      gender_str: null,
      occupation: null,
      nationality: null,
      address: null,
      phone_number: null
    }
  },
  badges: [],
  listBadges: [],
  badgeDetail: [],
  categories: [],
  cluster: {},
  clusters: [],
  filterClusters: [{
    category: {},
    category_id: null,
    created_at: null,
    description: null,
    id: null,
    image: null,
    is_displayed: true,
    is_eligible: false,
    is_link_active: false,
    magic_link: null,
    members_count: 0,
    name: 'Semua Cluster',
    requester: {},
    status: 'approved'
  }],
  historyLinimasa: [],
  historyPendidikanPolitik: [],
  historyWordStadium: [],
  historyLapor: [],
  historyPerhitungan: [],
  politicalParties: []
}

export const actions = {
  setToken(ctx, token) {
    ctx.commit('setToken', token)
  },
  async getMe(ctx) {
    const user = await ProfileAPI.getMe()
    ctx.commit('setProfileData', {
      user
    })
  },

  async update(store, user) {
    store.commit('setProfileData', {
      user
    })
    if (user.avatarFile != null) {
      const avatarURL = await ProfileAPI.updateAvatar(user.avatarFile)
      store.commit('setProfileData', {
        user: {
          avatar: avatarURL
        }
      })
    }
    const resp = await ProfileAPI.updateProfile(user)
    store.commit('setProfileData', {
      user: resp
    })
  },

  async getBadges(store, payload) {
    const data = await ProfileAPI.getBadges(payload.id)
    store.commit('setBadges', {
      badges: data.achieved_badges
    })
  },

  async listBadges(ctx) {
    const badges = (await ProfileAPI.listBadges()).badges
      .slice()
      .sort((a, b) => a.position - b.position)
    ctx.commit('setListBadges', badges)
  },

  async getBadgeDetail(ctx, payload) {
    const data = await ProfileAPI.getBadgeDetail(payload.id)
    ctx.commit('setBadgeDetail', data.achieved_badge)
  },
  async getClusterList(ctx, payload) {
    const clusters = await ProfileAPI.getClusterList(payload)
      .then(clusters => {
        ctx.commit('setClusterList', clusters)
        ctx.commit('setFilterClusterList', clusters)
      })
      .catch(() => {})

    return Promise.resolve(clusters)
  },
  searchClusters(ctx, name) {
    const clusters = ctx.state.clusters.filter(cluster => {
      return cluster.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    })
    ctx.commit('setFilterClusterList', clusters)
  },
  async getClusterCategories(store) {
    const data = await ProfileAPI.getCategories()
    store.commit('setCategories', {
      categories: data.categories
    })
  },

  async createCategories(store, name) {
    const data = await ProfileAPI.createCategories(name)
    store.commit('addCategory', data)
    return Promise.resolve(data)
  },

  async createCluster(store, payload) {
    const data = await ProfileAPI.createCluster(
      payload.name,
      payload.categoryId,
      payload.description,
      payload.avatarFile
    )
    return Promise.resolve(data)
  },

  async verify(store, payload) {
    return ProfileAPI.verify(payload)
  },

  async updateInformant(ctx, p) {
    const user0 = {
      informant: {
        ...p,
        gender_str: ctx.getters.getGender(p.gender)
      }
    }
    ctx.commit('setProfileData', {
      user: user0
    })
    const user1 = await ProfileAPI.updateInformant(p)
    ctx.commit('setProfileData', {
      user: user1
    })
  },

  async getLinimasaHistory(ctx, payload) {
    const data = await LiniMasaAPI.getLinimasaHistory(payload.id)
    ctx.commit('setLinimasaHistory', data.janji_politiks)
  },

  async getQuestionHistory(ctx, payload) {
    const data = await PenpolAPI.getQuestionHistory(payload.id)
    ctx.commit('setPenpolHistory', data.questions)
  },

  inviteToCluster(ctx, payload) {
    return ProfileAPI.inviteToCluster(payload.clusterId, payload.emails)
  },

  enableMagicLink(ctx, payload) {
    return ProfileAPI.enableMagicLink(payload.clusterId, payload.enabled).then(
      data => {
        ctx.commit('setCluster', data.cluster)
      }
    )
  },

  async selectCalon(ctx, payload) {
    ctx.commit('selectCalon', payload.id)
    const politicalParty = ctx.rootState.profile.user.political_party
    const politicalPartyId =
      politicalParty && politicalParty.id ? politicalParty.id : null
    const user = await ProfileAPI.votePreference({
      politicalPartyId,
      votePreference: payload.id
    })
    ctx.commit('setProfileData', {
      user
    })
  },

  async selectPartai(ctx, payload) {
    const user = await ProfileAPI.votePreference({
      votePreference: ctx.rootState.profile.user.vote_preference || null,
      politicalPartyId: payload.id
    })
    ctx.commit('setProfileData', {
      user
    })
  },

  async getPoliticalParties(store) {
    const data = await ProfileAPI.getPoliticalParties()
    store.commit('setPoliticalParties', {
      political_parties: data.political_parties
    })
  }
}

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setProfileData(state, payload) {
    state.user = {
      ...state.user,
      ...payload.user
    }
  },
  setBadges(state, payload) {
    state.badges = payload.badges
  },
  setBadgeDetail(state, payload) {
    state.badgeDetail = payload
  },
  emptyBadgeDetail(state) {
    state.badgeDetail = []
  },
  UserQuestion(state, payload) {
    state.userQuestion = payload.questions
  },
  setCategories(state, payload) {
    state.categories = payload.categories
  },
  addCategory(state, category) {
    state.categories = [category, ...state.categories]
  },
  addCluster(state, cluster) {
    state.cluster = [cluster, ...state.cluster]
  },
  setLinimasaHistory(state, feeds) {
    state.historyLinimasa = feeds
  },
  setPenpolHistory(state, histories) {
    state.historyPendidikanPolitik = histories
  },
  setCluster(state, cluster) {
    Vue.set(state.user, 'cluster', cluster)
  },
  selectCalon(state, id) {
    state.user.vote_preference = id
  },
  setListBadges(state, badges) {
    Vue.set(state, 'listBadges', badges)
  },
  setPoliticalParties(state, payload) {
    state.politicalParties = payload.political_parties
  },
  setClusterList(state, clusters) {
    state.clusters = clusters
  },
  setFilterClusterList(state, clusters) {
    const allClusters = [state.filterClusters[0], ...clusters]
    state.filterClusters = allClusters
  },
  setVoted(state, id) {
    const index = state.historyPendidikanPolitik.findIndex(question => question.id === id)
    let question = state.historyPendidikanPolitik.find(question => question.id === id)
    question.is_liked = true
    question.like_count += 1

    state.historyPendidikanPolitik[index] = question
  },
  removeVoted(state, id) {
    const index = state.historyPendidikanPolitik.findIndex(question => question.id === id)
    let question = state.historyPendidikanPolitik.find(question => question.id === id)
    question.is_liked = false
    question.like_count -= 1

    state.historyPendidikanPolitik[index] = question
  }
}

export const getters = {
  getGender: state => genderId => {
    switch (genderId) {
      case 0:
        return 'Female'
      case 1:
        return 'Male'
      default:
        return ''
    }
  },
  token: () => vueAuth.getToken()
}
