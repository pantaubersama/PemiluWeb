<template>
  <modal-layout>
    <div slot="modal-content" class="modal-quiz-question">
      <div class="modal-header modal-header--question">
        <slot name="header">Header</slot>
      </div>
      <div class="modal-body modal-body--question">
        <slot name="content">Content</slot>
      </div>
      <slot name="background">
        <div class="modal-background--question background-1"></div>
      </slot>
    </div>
  </modal-layout>
</template>

<script>
import ModalLayout from '@/layout/Modal'

export default {
  name: 'ModalQuestionLayout',
  components: { ModalLayout },
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }
}
</script>
