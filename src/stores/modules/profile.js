import * as ProfileAPI from '@/services/api/profile'

export const namespaced = true
export const state = {
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
  categories: [],
  cluster: []
}

export const actions = {
  async getMe({
    commit
  }) {
    const user = await ProfileAPI.getMe()
    commit('setProfileData', {
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

  async getBadges(store) {
    const data = await ProfileAPI.getBadges()
    store.commit('setBadges', {
      badges: data.achieved_badges
    })
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
  }
}

export const mutations = {
  setProfileData(state, payload) {
    state.user = {
      ...state.user,
      ...payload.user
    }
  },
  setBadges(state, payload) {
    state.badges = payload.badges
  },
  setCategories(state, payload) {
    state.categories = payload.categories
  },
  addCategory(state, category) {
    state.categories = [
      category,
      ...state.categories
    ]
  },
  addCluster(state, cluster) {
    state.cluster = [
      cluster,
      ...state.cluster
    ]
  }
}
