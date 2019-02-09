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
        <textarea
          v-validate="'required'"
          data-vv-validate-on="blur|input"
          name="title"
          v-model="title"
          placeholder="Ayo tanya sekarang"
          :class="{'input': true, 'is-danger': errors.has('title') }"
        ></textarea>
        <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
      </div>
      <div class="button-submit">
        <button v-if="isSubmitting" class="btn btn-outline-primary" disabled>Mengirim</button>
        <button v-else class="btn btn-outline-primary" @click.prevent="submit()">Publikasikan</button>
      </div>
    </div>
  </modal-layout>
</template>

<script>
import ModalLayout from '@/layout/Modal'
import { CloseIcon } from '@/svg/icons'

export default {
  name: 'ModalCreateQuestion',
  data() {
    return {
      title: '',
      body: ''
    }
  },
  props: {
    name: String,
    avatar: String,
    isSubmitting: Boolean
  },
  components: {
    ModalLayout,
    CloseIcon
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('submit', {
            title: this.title,
            body: this.body
          })
        }
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
