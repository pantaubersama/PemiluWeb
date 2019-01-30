<template>
  <modal-layout>
    <div slot="modal-content" class="modal-create">
      <div class="close-icon" @click="$emit('close')">
        <close-icon/>
      </div>
      <div class="create-desc">
        Bagikan Janji Politik dengan bahasa yang baik dan mudah dimengerti.
        Sertakan ilustrasi, gambar, tautan sumber berita, atau referensi lain sebagai tambahan informasi.
      </div>
      <div class="create-title">
        <div class="user-profile">
          <div class="thumb">
            <img :src="avatar" alt="avatar" v-if="avatar">
            <img src="@/assets/user.svg" alt="avatar" v-else>
          </div>
          {{ name }}
        </div>
        <textarea v-model="title" placeholder="Judul Janji Politik"></textarea>
      </div>
      <div class="html-editor">
        <vue-editor
          useCustomImageHandler
          @imageAdded="inputAvatarChanged($event)"
          :editorToolbar="customToolbar"
          v-model="body"
          placeholder="Berikan deskripsi atau detil lebih lanjut terkait Janji Politik yang akan disampaikan di kolom ini."
        ></vue-editor>
      </div>
      <div class="button-submit">
        <button class="btn btn-outline-primary" @click.prevent="submit()">publikasikan</button>
      </div>
    </div>
  </modal-layout>
</template>

<script>
import { VueEditor } from 'vue2-editor'

import { CloseIcon } from '@/svg/icons'
import ModalLayout from '@/layout/Modal'
import { customizedToolbar } from '@/mixins/customizedToolbar'

export default {
  name: 'ModalCreate',
  data() {
    return {
      customToolbar: customizedToolbar.render,
      title: '',
      body: '',
      image: ''
    }
  },
  props: {
    name: String,
    avatar: URL
  },
  components: {
    ModalLayout,
    VueEditor,
    CloseIcon
  },
  methods: {
    inputAvatarChanged(event) {
      if (!event) return
      this.image = event
    },
    submit() {
      this.$emit('submit', {
        title: this.title,
        body: this.body,
        image: this.image
      })
    }
  },
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }
}
</script>
