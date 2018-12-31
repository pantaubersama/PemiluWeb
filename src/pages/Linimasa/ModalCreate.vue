<template>
  <modal>
    <div slot="modal-content" class="modal-create">
      <div class="close-icon" @click="$emit('close')">
        <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
        <path id="Path_1522" class="st0" d="M11.9,2.5c-5.1,0-9.2,4.1-9.2,9.2s4.1,9.2,9.2,9.2s9.2-4.1,9.2-9.2l0,0
          C21.1,6.6,17,2.5,11.9,2.5z M11.9,19.1c-4,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4l0,0C19.3,15.7,15.9,19.1,11.9,19.1z"/>
        <path id="Path_1523" class="st0" d="M14.8,7.3l-3,3l-3.1-3L7.4,8.7l3,3l-3,3l1.3,1.3l3-3l3,3l1.3-1.3l-3.1-3l3-3L14.8,7.3z"/>
        </svg>
      </div>
      <div class="create-desc">
        Bagikan janji politik dari media Capres kepada user lain. Sertakan sumber bila memungkinkan seperti link, gambar, ucapan langsung dan lainnya. Gunakan tata Bahasa yang baik. Gunakan tata Bahasa yang sopan
      </div>
      <div class="create-title">
        <div class="user-profile">
          <div class="thumb">
            <img src="@/assets/trump.jpg" alt="">
          </div>
          Budi Santoso
        </div>
        <textarea placeholder="Judul Janji Politik"></textarea>
      </div>
      <div class="html-editor">
        <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" :editorToolbar="customToolbar" placeholder="Beri deskripsi detail lebih lanjut dari Judul "></vue-editor>
      </div>
      <div class="button-submit">
        <button class="btn btn-outline-primary" @click.prevent="$emit('close')">publikasikan</button>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal'
import { VueEditor } from "vue2-editor"
import { customizedToolbar } from "@/mixins/customizedToolbar"
import { imageUpload } from "@/mixins/imageUpload"
export default {
  name: 'ModalCreate',
  data(){
    return {
      customToolbar: customizedToolbar.render
    }
  },
  components: {
    Modal,
    VueEditor
  },
  methods: {
    handleImageAdded: imageUpload.handleImageAdded
  },
  created(){
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed (){
    document.documentElement.className = ''
  }
}
</script>
