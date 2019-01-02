<template>
  <modal>
    <div slot="modal-content" class="modal-quiz-question">
      <div class="modal-header modal-header--question">
        <h6 class="modal-title modal-title--question">Pertanyaan no 2 dari 10</h6>
        <div class="close-icon" @click="$emit('close')">
          <svg
            version="1.1"
            id="Layer_1"
            viewBox="0 0 24 24"
            style="enable-background:new 0 0 24 24;"
            xml:space="preserve"
          >
            <path
              id="Path_1522"
              class="st0"
              d="M11.9,2.5c-5.1,0-9.2,4.1-9.2,9.2s4.1,9.2,9.2,9.2s9.2-4.1,9.2-9.2l0,0
            C21.1,6.6,17,2.5,11.9,2.5z M11.9,19.1c-4,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4l0,0C19.3,15.7,15.9,19.1,11.9,19.1z"
            ></path>
            <path
              id="Path_1523"
              class="st0"
              d="M14.8,7.3l-3,3l-3.1-3L7.4,8.7l3,3l-3,3l1.3,1.3l3-3l3,3l1.3-1.3l-3.1-3l3-3L14.8,7.3z"
            ></path>
          </svg>
        </div>
      </div>
      <div class="modal-body modal-body--question">
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
      </div>
      <div class="modal-bg--question">
        <!-- <img src="@/assets/bg-01.svg" alt="bg" /> -->
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'QuestionModal',
  components: { Modal },
  created () {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed () {
    document.documentElement.className = ''
  }
}
</script>
