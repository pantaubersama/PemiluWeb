import Vue from 'vue'
import VueAxios from 'vue-axios'
import {
  VueAuthenticate
} from 'vue-authenticate'
import axios from 'axios'

function isUndefined(value) {
  return typeof value === 'undefined'
}

function getRedirectUri(uri) {
  try {
    return (!isUndefined(uri))
      ? ('' + (window.location.origin) + uri)
      : window.location.origin
  } catch (e) {}

  return uri || null
}

var defaultProviderConfig = {
  name: 'symbolic',
  url: process.env.OAUTH_TOKEN_URL,
  clientId: process.env.OAUTH_CLIENT_ID,
  redirectUri: getRedirectUri(process.env.OAUTH_REDIRECT_URI),
  authorizationEndpoint: process.env.OAUTH_BASE_URL + process.env.OAUTH_AUTHORIZATION_URL,
  defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
  requiredUrlParams: null,
  optionalUrlParams: null,
  scope: ['public', 'email'],
  scopePrefix: null,
  scopeDelimiter: ',',
  state: null,
  oauthType: '2.0',
  display: 'popup',
  popupOptions: {
    width: 500,
    height: 500
  },
  responseType: 'code',
  responseParams: {
    clientId: 'client_id',
    redirectUri: 'redirect_uri',
    code: 'code',
    grantType: 'grant_type'
  },
  grantType: 'authorization_code'
}

Vue.use(VueAxios, axios)

export default {

  name: 'Symbolic',

  data() {
    return {
      auth: vueAuth
    }
  }
}

export const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: process.env.OAUTH_BASE_URL,
  storageType: 'localStorage',
  tokenName: 'access_token',
  providers: {
    symbolic: defaultProviderConfig,
    twitter: {
      name: 'twitter',
      // url: '/auth/twitter',
      url: '/oauth/token',
      authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
      redirectUri: getRedirectUri(),
      oauthType: '1.0',
      popupOptions: {
        width: 495,
        height: 645
      }
    }
  }
})
window.vueAuth = vueAuth
