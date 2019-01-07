<template>
  <modal-layout>
    <div slot="modal-content" class="modal-create">
      <div class="close-icon" @click="$emit('close')">
        <close-icon/>
      </div>
      <div
        class="create-desc"
      >Bagikan janji politik dari media Capres kepada user lain. Sertakan sumber bila memungkinkan seperti link, gambar, ucapan langsung dan lainnya. Gunakan tata Bahasa yang baik. Gunakan tata Bahasa yang sopan</div>
      <div class="create-title">
        <div class="user-profile">
          <div class="thumb">
            <img src="@/assets/trump.jpg" alt>
          </div>Budi Santoso
        </div>
        <textarea placeholder="Judul Janji Politik"></textarea>
      </div>
      <div class="html-editor">
        <vue-editor
          useCustomImageHandler
          @imageAdded="handleImageAdded"
          :editorToolbar="customToolbar"
          placeholder="Beri deskripsi detail lebih lanjut dari Judul "
        ></vue-editor>
      </div>
      <div class="button-submit">
        <button class="btn btn-outline-primary" @click.prevent="$emit('close')">publikasikan</button>
      </div>
    </div>
  </modal-layout>
</template>

<script>
import ModalLayout from '@/layout/Modal'
import { VueEditor } from 'vue2-editor'
import { customizedToolbar } from '@/mixins/customizedToolbar'
import { imageUpload } from '@/mixins/imageUpload'
import { CloseIcon } from '@/svg/icons'
export default {
  name: 'ModalCreate',
  data() {
    return {
      customToolbar: customizedToolbar.render
    }
  },
  components: {
    ModalLayout,
    VueEditor,
    CloseIcon
  },
  methods: {
    handleImageAdded: imageUpload.handleImageAdded
  },
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }
}
</script>
