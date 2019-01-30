import ApiImagesUpload from '@/services/api/images/upload'

// initial state
const state = {
  file: null,
  isProcessing: false
}

// actions
const actions = {
  upload({commit}, payload){
    commit('setProcessing')
    // ApiV2ImagesUpload.upload( payload.data, result => {
    //   payload.callback(result.data.file)
    //   commit('finish')
    // }, err => {
    //   console.log('upload error!')
    // }, {"Content-Type": "multipart/form-data"})
  },
}

// mutations
const mutations = {
  setProcessing(state){
    state.isProcessing = true
  },

  finish(state){
    state.isProcessing = false
  }
}

// getters
const getters = {
  
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}