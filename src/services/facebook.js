/* globals FB */

export const init = () => {
  const APP_ID = '487265651802954'
  // const FB_APP_SECRET = 'd46d657ba90e042956b16bffc9f5ab3b'
  FB.init({
    appId: APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v2.12'
  })
}

export const getLoginStatus = () => new Promise(resolve => FB.getLoginStatus(res => resolve(res.status)))

export const login = () => {
  const scopes = [
    'public_profile', 'email', 'user_birthday',
    'user_friends', 'user_location', 'user_likes',
    'user_posts'
  ]
  const scope = {
    scope: scopes.join(','),
    return_scopeds: true
  }
  return new Promise(resolve => FB.login(resolve, scope))
}

export const getEmail = () => new Promise(resolve => FB.api('/me', (res) => {
  const username = res.email || res.name
  return resolve(username)
}))

export const getAccessToken = () => FB.getAccessToken()
