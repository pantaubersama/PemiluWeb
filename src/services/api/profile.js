import axios from 'axios'
import {
  vueAuth
} from '@/services/symbolic'
import Api from '@/services/api/base'

const BASE_URL = process.env.API_BASE_URL
  ? process.env.API_BASE_URL
  : 'https://staging-auth.pantaubersama.com'

const api = Api(BASE_URL, () => vueAuth.getToken())

export const getMe = () => api
  .get('/v1/me')
  .then(resp => resp.data)
  .then(data => data.data.user)

export const updateAvatar = avatar => {
  const formData = new FormData()
  formData.append('avatar', avatar)
  return api
    .put('/v1/me/avatar', formData)
    .then(resp => resp.data)
    .then(data => data.data.user)
}

export const updateProfile = user =>
  api
    .put('/v1/me', {
      full_name: user.full_name,
      username: user.username,
      about: user.about,
      location: user.location,
      education: user.education,
      occupation: user.occupation
    })
    .then(resp => resp.data)
    .then(data => data.data.user)

export const getBadges = () =>
  api
    .get('/v1/me/badges', {
      params: {
        per_page: 3
      }
    })
    .then(resp => resp.data.data)
export const listBadges = () =>
  api.get('/v1/badges').then(resp => resp.data.data)

export const getBadgeDetail = id =>
  api.get(`/v1/badge/${id}`).then(resp => resp.data.data)

export const getCategories = (page = 1, per_page = 100) =>
  api
    .get('/v1/categories', {
      params: {
        page,
        per_page
      }
    })
    .then(resp => resp.data.data)

export const createCategories = name =>
  api
    .post('/v1/categories', {
      name
    })
    .then(resp => resp.data.data.category)

export const createCluster = (
  name,
  categoryId,
  description = null,
  avatarFile = null
) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('category_id', categoryId)
  formData.append('description', description)
  formData.append('image', avatarFile)
  return axios
    .post('/v1/clusters', formData)
    .then(resp => resp.data.data.cluster)
}
/* eslint-disable camelcase */
export const getClusterList = ({
  page = 1,
  per_page = 50,
  q = null
} = {}) => api
  .get('/v1/clusters', {
    params: {
      page,
      per_page,
      q
    }
  })
  .then(resp => resp.data.data.clusters)
/* eslint-enable */

const verifySignature = signature => {
  const formData = new FormData()
  formData.append('signature', signature)
  return axios
    .put('/v1/verifications/signature', formData)
    .then(resp => resp.data.data)
}

const verifyKTP = ktpFile => {
  const formData = new FormData()
  formData.append('ktp_photo', ktpFile)
  return axios
    .put('/v1/verifications/ktp_photo', formData)
    .then(resp => resp.data.data)
}

const verifySelfie = selfieFile => {
  const formData = new FormData()
  formData.append('ktp_selfie', selfieFile)
  return axios
    .put('/v1/verifications/ktp_selfie', formData)
    .then(resp => resp.data.data)
}

const verifyKTPNumber = ktpNumber =>
  api
    .put('/v1/verifications/ktp_number', {
      ktp_number: ktpNumber
    })
    .then(resp => resp.data.data)

export const verify = payload =>
  axios
    .all([
      verifySignature(payload.signature),
      verifyKTP(payload.ktp_photo),
      verifySelfie(payload.ktp_selfie),
      verifyKTPNumber(payload.ktp_number)
    ])
    .then(
      axios.spread((signature, ktp, selfie, ktpNumber) => {
        return Promise.resolve({
          signature,
          ktp,
          selfie,
          ktpNumber
        })
      })
    )

export const updateInformant = p =>
  api
    .put('/v1/informants', {
      identity_number: p.identity_number,
      pob: p.pob,
      dob: p.dob,
      gender: p.gender,
      occupation: p.occupation,
      nationality: p.nationality,
      address: p.address,
      phone_number: p.phone_number
    })
    .then(resp => resp.data.data.informant)

export const inviteToCluster = (clusterId, ...emails) =>
  api
    .post('/v1/clusters/invite', {
      cluster_id: clusterId,
      emails: emails.join(',')
    })
    .then(resp => resp.data.data)
export const enableMagicLink = (clusterId, enable = true) =>
  api
    .post(`/v1/clusters/${clusterId}/magic_link`, {
      enable
    })
    .then(resp => resp.data.data)

export const votePreference = ({
  votePreference = null,
  politicalPartyId = null
}) => {
  return api
    .put('/v1/me/vote_preference', {
      vote_preference: votePreference,
      political_party_id: politicalPartyId
    })
    .then(resp => resp.data.data.user)
}

export const connectAccount = (type, accessToken, accessTokenSecret = null) => api
  .post('/v1/accounts/connect', {
    account_type: type,
    oauth_access_token: accessToken,
    oauth_access_token_secret: accessTokenSecret
  })
export const disconnectAccount = (type) => api
  .delete('/v1/accounts/disconnect', {
    params: {
      account_type: type
    }
  })
export const getPoliticalParties = (page = 1, per_page = 100) =>
  api
    .get('/v1/political_parties', {
      params: {
        page,
        per_page
      }
    })
    .then(resp => resp.data.data)
