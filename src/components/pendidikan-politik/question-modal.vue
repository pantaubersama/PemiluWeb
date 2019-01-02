<template>
  <modal>
    <div slot="modal-content" class="modal-quiz-question">
      <div class="modal-header">
        <h6 class="modal-title">Pertanyaan no 1 dari 10</h6>
        <div class="close-icon" @click="$emit('close')">
          <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
          <path id="Path_1522" class="st0" d="M11.9,2.5c-5.1,0-9.2,4.1-9.2,9.2s4.1,9.2,9.2,9.2s9.2-4.1,9.2-9.2l0,0
            C21.1,6.6,17,2.5,11.9,2.5z M11.9,19.1c-4,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4l0,0C19.3,15.7,15.9,19.1,11.9,19.1z"/>
          <path id="Path_1523" class="st0" d="M14.8,7.3l-3,3l-3.1-3L7.4,8.7l3,3l-3,3l1.3,1.3l3-3l3,3l1.3-1.3l-3.1-3l3-3L14.8,7.3z"/>
          </svg>
        </div>
      </div>
      <div class="modal-body modal-body--question">
        <h2>Visi untuk Indonesia kedepannya?</h2>
        <div class="row row-question">
          <div class="col">
            <div class="col-question">
              <p>Terwujudnya Indonesia maju yang berdaulat, mandiri, dan berkepribadian, berlandaskan gotong-royong</p>
              <button class="btn btn-primary" @click.stop="$emit('onClickChoicesButton', 'A')">A</button>
            </div>
          </div>
          <div class="col">
            <div class="col-question">
              <p>
                Terwujudnya Bangsa dan Negara Republik Indonesia yang adil, makmur bermartabat, relijius, berdaulat di bidang politik, berdiri di atas kaki sendiri di bidang ekonomi, dan berkepribadian nasional yang kuat di bidang budaya serta menjamin kehidupan yang rukun antar warga negara tanpa memandang suku, agama, latar belakang sosial dan rasnya berdasarkan Pancasila dan UndangUndang Dasar Negara Republik Indonesia Tahun 1945
              </p>
              <button class="btn btn-primary" @click.stop="$emit('onClickChoicesButton', 'B')">B</button>
            </div>
          </div>
        </div>
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
