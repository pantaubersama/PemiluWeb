<template>
  <div class="card catatan-pilihan">
    <div class="content-head">
      <h4 class="title">Catatan Pilihanku</h4>
      <p
        class="description"
      >Halaman preferensi kandidat ini adalah catatan pribadi dan tidak akan ditampilkan pada profile kamu.</p>
    </div>
    <div class="content-body">
      <p class="question">Siapakah yang saat ini paling cocok dengan pilihan kamu?</p>
      <p class="answer">({{ nameOfPaslon(selected) }})</p>

      <div class="column-container">
        <div
          class="column-item"
          :class="{'selected': selected === 1}"
          @click.stop="$emit('onSelected', 1)"
        >
          <img
            src="~@/assets/note-image/image1/image@1x.jpg"
            srcset="~@/assets/note-image/image1/image@2x.jpg 2x
                    ~@/assets/note-image/image1/image@3x.jpg 3x"
            class="candidate-photo"
          >
          <div class="candidate-name">Jokowi - Ma'ruf</div>
        </div>
        <div
          class="column-item"
          :class="{'selected': selected === 2}"
          @click.stop="$emit('onSelected', 2)"
        >
          <img
            src="~@/assets/note-image/image2/image@1x.jpg"
            srcset="~@/assets/note-image/image2/image@2x.jpg 2x
                    ~@/assets/note-image/image2/image@3x.jpg 3x"
            class="candidate-photo"
          >
          <div class="candidate-name">Prabowo - Sandi</div>
        </div>
      </div>
      <button
        class="btn choice"
        type="button"
        :class="{ selected: selected === 3 }"
        @click.stop="$emit('onSelected', 3)"
      >Belum menentukan pilihan</button>
    </div>
    <div class="content-footer">
      <div class="total-kecenderungan-container">
        <div class="image-container">
          <img
            src="~@/assets/note-image/image1/image@1x.jpg"
            alt="jokowi-ma'ruf"
            v-if="idOfPaslon(totalKecenderungan.groupName) === 1"
          >
          <img
            src="~@/assets/note-image/image2/image@1x.jpg"
            alt="prabowo-sandi"
            v-if="idOfPaslon(totalKecenderungan.groupName) === 2"
          >
        </div>
        <div class="desc-container">
          <span class="text1">
            Total Kecenderungan,
            <b>{{ totalKecenderungan.finishedQuiz }} dari {{ totalKecenderungan.totalQuiz }} Kuis</b>
          </span>
          <div class="total">{{totalKecenderungan.percentage}}% ({{totalKecenderungan.groupName}})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { catatan } from '@/mixins/catatan'

export default {
  name: 'CatatanResultComponent',
  mixins: [catatan],
  props: {
    selected: [Number, String],
    totalKecenderungan: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.catatan-pilihan
  margin: 0
  padding: 0
  width: 100%
  display: flex
  justify-content: center
  align-items: center

.content-head
  background-color: transparent
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  padding: 0
  margin: 0

  .title
    font-family: Lato
    font-size: 22px
    font-weight: 900
    line-height: 33px
    color: #393939
    padding: 10px 20px 0

  .description
    min-height: 41px
    background-color: #f4f4f4
    font-size: 10px
    line-height: 12px
    color: #707070
    padding: 15px 20px
    margin: 0
    width: 100%
    border-top: 2px solid #ececec

.content-body
  display: flex
  flex-direction: column
  padding: 20px
  width: 420px
  align-items: center

  .question, .answer
    font-family: Lato
    font-size: 14px
    font-weight: 400
    font-style: italic
    line-height: 17px
    color: #7c7c7c
    padding: 8px 20px 0
    margin: 0
    text-align: center

  .answer
    color: #f2771d
    font-style: normal
    padding: 4px 0
    margin-bottom: 8px

  .column-container
    display: flex
    justify-content: center

    .column-item
      border: 1px solid #cbcbcb
      flex-basis: 150px
      width: 150px
      margin: 10px
      cursor: pointer
      overflow: hidden

      .candidate-name
        text-align: center
        padding: 6px 4px
        line-height: 19px
        font-weight: 400
        letter-spacing: 0.38px

      &.selected
        background: #f2771d
        border: 1px solid #f2771d
        .candidate-name
          color: white

  button.choice
    border: 1px solid #cbcbcb
    border-radius: 0
    background: none
    padding: 11px
    text-align: center
    font-family: Lato;
    font-size: 16px
    line-height: 1.19
    letter-spacing: 0.5px
    color: #7c7c7c
    margin: 20px 0 0
    width: 320px

    &.selected
      border-color: #f2771d
      background-color: #f2771d
      color: white

.content-footer
  background: #f9f9f9
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  padding: 0
  margin: 0
  border-bottom-left-radius: 0.25rem
  border-bottom-right-radius: 0.25rem

  .total-kecenderungan-container
    display: flex
    padding: 20px 25px
    .image-container
      height: 48px
      width: 48px
      border-radius: 50%
      img
        width: 100%
        height: 100%
        border-radius: 50%
        overflow: hidden
        object-fit: cover
    .desc-container
      margin-left: 10px
      span.text1
        font-family: 'Bw Modelica'
        font-size: 12px
        font-stretch: condensed
        line-height: 1.33
        letter-spacing: 0.3px
        color: #111111
      .total
        font-family: 'Bw Modelica'
        font-size: 16px
        font-weight: bold
        font-stretch: condensed
        line-height: 1
        color: #111111
  a.more-notes
    padding: 10px 20px
    background: #bd081c
    display: flex
    justify-content: center
    align-items: center
    font-family: Lato
    font-size: 12px
    line-height: 1.25
    letter-spacing: 1.2px
    color: white
    height: 47px

</style>
