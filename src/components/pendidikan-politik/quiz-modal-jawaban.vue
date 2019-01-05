<template>
  <modal-layout>
    <div slot="modal-content" class="modal-jawaban">
      <button class="close-icon" @click="$emit('close')">
        <close-icon></close-icon>
      </button>
      <div class="quiz-container">
        <div class="quiz-container--row">
          <div class="quiz-info">
            <h6 class="quiz-number">Pertanyaan Pertama</h6>
            <p class="quiz-section">Visi untuk Indonesia kedepannya?</p>
          </div>
          <div class="quiz-content">
            <div class="quiz-content--description">
              <h5 class="quiz-title">Jokowi - Makruf</h5>
              <p
                class="quiz-question"
              >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div class="quiz-content--description">
              <h5 class="quiz-title">Prabowo - Sandi</h5>
              <p
                class="quiz-question"
              >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div class="quiz-content--result">
            <p>
              Jawabanmu:
              <span>Prabowo - Sandi</span>
            </p>
          </div>
        </div>

        <div class="quiz-container--row">
          <div class="quiz-info">
            <h6 class="quiz-number">Pertanyaan Kedua</h6>
            <p class="quiz-section">Misi untuk Indonesia kedepannya?</p>
          </div>
          <div class="quiz-content">
            <div class="quiz-content--description">
              <h5 class="quiz-title">Jokowi - Makruf</h5>
              <p
                class="quiz-question"
              >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div class="quiz-content--description">
              <h5 class="quiz-title">Prabowo - Sandi</h5>
              <p
                class="quiz-question"
              >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div class="quiz-content--result">
            <p>
              Jawabanmu:
              <span>Jokowi - Makruf</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </modal-layout>
</template>

<script>
import { CloseIcon } from '@/svg/icons'
import ModalLayout from '@/layout/Modal'

export default {
  name: 'QuizModalJawaban',
  components: {
    CloseIcon,
    ModalLayout
  },
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }
}
</script>
