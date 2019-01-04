<template>
  <modal-question-layout>
    <template slot="header">
      <h6 class="modal-title">Pertanyaan no 2 dari 10</h6>
      <button class="close-icon" @click="$emit('close')">
        <close-icon></close-icon>
      </button>
    </template>
    <template slot="title">Misi untuk Indonesia kedepannya?</template>
    <template slot="content">
      <h2>Misi untuk Indonesia kedepannya?</h2>
      <div class="row row-question">
        <div class="col">
          <div class="col-question">
            <p>Peningkatan kualitas manusia Indonesia</p>
            <button class="btn btn-primary" @click.stop="$emit('onClickChoicesButton', 'A')">A</button>
          </div>
        </div>
        <div class="col">
          <div class="col-question">
            <p>Pertama membangun perekonomian nasional yang adil, makmur, berkualitas, dan berwawasan lingkungan dengan mengutamakan kepentingan rakyat Indonesia melalui jalan politik-ekonomi sesuai Pasal 33 dan 34 UUD Negara Republik Indonesia Tahun 1945</p>
            <button class="btn btn-primary" @click.stop="$emit('onClickChoicesButton', 'B')">B</button>
          </div>
        </div>
      </div>
    </template>
  </modal-question-layout>
</template>

<script>
import { CloseIcon } from '@/svg/icons'
import ModalQuestionLayout from '@/layout/ModalQuestion'

export default {
  name: 'QuestionModal',
  components: {
    CloseIcon,
    ModalQuestionLayout
  }
}
</script>
