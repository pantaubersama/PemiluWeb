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
  firebaseKey: null,
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
  politicalParties: [],
  clusterDetail: [],
  paginations: {
    historyLinimasa: {
      page: 1,
      perPage: 5,
      total: 0,
      isLast: false
    },
    historyPenPol: {
      page: 1,
      perPage: 5,
      total: 0,
      isLast: false
    }
  },
  stepVerificationUser: [],
  profileUser: [],
  profileAvatar: ''

}

export const actions = {
  setToken(ctx, token) {
    ctx.commit('setToken', token)
  },
  async setNotification() {
    const data = await ProfileAPI.setNotification(state.firebaseKey)
    return Promise.resolve(data)
  },
  async getMe(ctx) {
    const user = await ProfileAPI.getMe()
    ctx.commit('setProfileData', {
      user
    })
  },
  async getUser(store, payload) {
    store.commit('removeUserData')
    const data = await ProfileAPI.getUser(payload.id)
    store.commit('setUserData', data)
  },

  async getBadges(store, payload) {
    const data = await ProfileAPI.getBadges(payload.id)
    store.commit('setBadges', {
      badges: data.achieved_badges
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
  async getClusterDetail(store, payload) {
    const data = await ProfileAPI.getClusterDetail(payload.id)
    store.commit('setClusterDetail', data.cluster)
  },
  async leaveClusters(store) {
    const data = await ProfileAPI.leaveClusters()
    store.commit('leaveClusters')
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

  async getStepVerification(ctx) {
    const data = await ProfileAPI.getStepVerification()
    ctx.commit('setStepVerification', data)
  },
  async verifyKTPNumber(ctx, payload){
    const data = await ProfileAPI.verifyKTPNumber(payload.ktp_number)
    return Promise.resolve(data)
  },
  async verifySelfie(ctx, payload){
    const data = await ProfileAPI.verifySelfie(payload.ktp_selfie)
    return Promise.resolve(data)
  },
  async verifyKTP(ctx, payload){
    const data = await ProfileAPI.verifyKTP(payload.ktp_photo)
    return Promise.resolve(data)
  },
  async verifySignature(ctx, payload){
    const data = await ProfileAPI.verifySignature(payload.signature)
    return Promise.resolve(data)
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
    const data = await LiniMasaAPI.getLinimasaHistory(
      payload.id,
      state.paginations.historyLinimasa.page,
      state.paginations.historyLinimasa.perPage)
      ctx.commit('setLinimasaHistory', data.janji_politiks)
  },
  async nextPageLinimasaHistory(ctx) {
    ctx.commit('nextPageLinimasaHistory')
  },

  async updateLinimasaHistory(ctx, payload) {
    const data = await LiniMasaAPI.getLinimasaHistory(
      payload.id,
      state.paginations.historyLinimasa.page,
      state.paginations.historyLinimasa.perPage)
    ctx.commit('updateLinimasaHistory', data)
  },


  async getQuestionHistory(ctx, payload) {
    const data = await PenpolAPI.getQuestionHistory(
      payload.id,
      state.paginations.historyPenPol.page,
      state.paginations.historyPenPol.perPage)
    ctx.commit('setPenpolHistory', data.questions)
    if(data.questions.length <= 0){
      ctx.commit('showLottie/showLottieTanya',{},{
        root: true
      })
    }
  },
  async nextPageQuestionHistory(ctx) {
    ctx.commit('nextPageQuestionHistory')
  },

  async updateQuestionHistory(ctx, payload) {
    const data = await PenpolAPI.getQuestionHistory(
      payload.id,
      state.paginations.historyPenPol.page,
      state.paginations.historyPenPol.perPage)
    ctx.commit('updateQuestionHistory', data)
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
  async joinCluster(ctx, payload) {
    return ProfileAPI.joinCluster(payload.magicLink).then(
      data => {
        ctx.commit('setClusterDetail', data.cluster)
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
  setFirebaseKey(state, token) {
    state.firebaseKey = token
  },
  clearFirebaseKey(state) {
    state.firebaseKey = null
  },
  setProfileData(state, payload) {
    state.user = {
      ...state.user,
      ...payload.user
    }
  },
  removeProfileData(state) {
    state.user = {
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
          url : null,
          thumbnail : {
            url: null
          },
          thumbnail_square : {
            url:null
          },
          medium : {
            url: null
          },
          medium_square : {
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
    }
  },
  setBadges(state, payload) {
    state.badges = payload.badges
  },
  emptyBadges(state, payload) {
    state.badges = []
  },
  setUserData(state, payload){
    state.profileUser = payload
    state.profileAvatar = payload.avatar.url
  },
  removeUserData(state, payload){
    state.profileUser = []
    state.profileAvatar = ''
  },
  setClusterDetail(state, payload) {
    state.clusterDetail = payload
  },
  emptyClusterDetail(state){
    state.clusterDetail = []
  },
  leaveClusters(state) {
    state.user.cluster = null
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
  emptyListBadges(state) {
    state.listBadges = []
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
  setStepVerification(state, payload) {
    state.stepVerificationUser = payload.user
  },
  emptyStepVerification(state, payload) {
    state.stepVerificationUser = []
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
  },
  nextPageLinimasaHistory(state) {
    state.paginations.historyLinimasa.page++
  },
  updateLinimasaHistory(state, data) {
    if (data.meta.pages.total == state.paginations.historyLinimasa.page) {
      state.paginations.historyLinimasa.isLast = true
    }
    state.historyLinimasa.push.apply(state.historyLinimasa, data.janji_politiks)
  },

  nextPageQuestionHistory(state) {
    state.paginations.historyPenPol.page++
  },

  updateQuestionHistory(state, data) {
    if (data.meta.pages.total == state.paginations.historyPenPol.page) {
      state.paginations.historyPenPol.isLast = true
    }
    state.historyPendidikanPolitik.push.apply(state.historyPendidikanPolitik, data.questions)
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
