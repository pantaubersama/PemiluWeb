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
        <div class="upload-img" v-if="image == null && upload">
          <input type="file" @change="onFileChange">
          <image-default/>
        </div>
        <div class="preview-img" v-if="image">
          <img :src="image">
          <div class="remove-img">
            <close-icon @click="removeImage"/>
          </div>
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
import { customizedToolbar } from '@/mixins/customizedToolbar'
import { ImageDefault, CloseIcon } from '@/svg/icons'
export default {
  name: 'ModalCreate',
  data() {
    return {
      title: '',
      body: '',
      upload: false,
      image: null
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
      const file = e.target.files[0]
      this.image = URL.createObjectURL(file)
    },
    showUpload() {
      this.upload = true
    },
    removeImage() {
      this.image = null
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
