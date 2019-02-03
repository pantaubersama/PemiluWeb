<template>
  <modal-layout>
    <div slot="modal-content" class="modal-create">
      <div class="close-icon" @click="$emit('close')">
        <close-icon/>
      </div>
      <div class="create-desc">
        Buat pertanyaan singkat untuk pasangan calon presiden periode 2019 - 2024.
        Pertanyaan terpilih akan disampaikan kepada kedua tim pasangan calon
        Presiden. Gunakan tata Bahasa yang sopan.
      </div>
      <div class="create-title">
        <div class="user-profile">
          <div class="thumb">
            <img :src="avatar" alt="avatar" v-if="avatar">
            <img src="@/assets/user.svg" alt="avatar" v-else>
          </div>
          {{ name }}
        </div>
        <textarea v-model="title" placeholder="Ayo tanya sekarang"></textarea>
      </div>
      <div class="button-submit">
        <button v-if="isSubmitting" class="btn btn-outline-primary" disabled>Mengirim</button>
        <button v-else class="btn btn-outline-primary" @click.prevent="submit()">Publikasikan</button>
      </div>
    </div>
  </modal-layout>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { mapState, mapActions } from 'vuex'
import { CloseIcon } from '@/svg/icons'
import ModalLayout from '@/layout/Modal'
import { customizedToolbar } from '@/mixins/customizedToolbar'

export default {
  name: 'ModalCreateQuestion',
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
    avatar: String,
    isSubmitting: Boolean
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
      this.$store.dispatch('homeKenalan/updateKenalan', {
        id: '231cbadc-a856-4723-93a9-bb79915dd40d'
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
