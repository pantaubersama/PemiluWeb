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
        <textarea
          v-model="body"
          @focus="showUpload"
          placeholder="Berikan deskripsi atau detil lebih lanjut terkait Janji Politik yang akan disampaikan di kolom ini."
        ></textarea>
        <div class="preview-img" v-if="image">
          <img :src="image">
          <div class="remove-img">
            <close-icon @click="removeImage"/>
          </div>
        </div>
        <div class="upload-img" v-else>
          <input type="file" accept="image/*" @change="onFileChange">
          <image-default/>
        </div>
      </div>
      <div class="button-submit">
        <button class="btn btn-outline-primary" @click.prevent="submit()">publikasikan</button>
      </div>
    </div>
  </modal-layout>
</template>

<script>
import ModalLayout from '@/layout/Modal'
import { ImageDefault, CloseIcon } from '@/svg/icons'

export default {
  name: 'ModalCreate',
  data() {
    return {
      title: '',
      body: '',
      upload: false,
      image: null,
      fileImage: null
    }
  },
  props: {
    name: String,
    avatar: String
  },
  components: {
    ModalLayout,
    CloseIcon,
    ImageDefault
  },
  methods: {
    onFileChange(e) {
      const file = Array.from(event.target.files).pop()
      const url = URL.createObjectURL(file)

      this.fileImage = file
      this.image = url
    },
    showUpload() {
      this.upload = true
    },
    removeImage() {
      this.fileImage = null
      this.image = null
    },
    submit() {
      this.$emit('submit', {
        title: this.title,
        body: this.body,
        image: this.fileImage
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
