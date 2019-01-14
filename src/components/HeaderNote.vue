<template>
  <div class="header-note">
    <h2 class="title">Catatan Pilihanku</h2>
    <p class="description">
      Preferensi calon presiden hanya digunakan catatanmu dan tidak akan
      ditampilkan pada profile kamu
    </p>
    <div class="note-container">
      <div class="result-container">Pilih Note Calon Presidenmu saat ini:
        <div class="result">(Jokowi - Ma'ruf)</div>
      </div>
      <div class="column-container">
        <div class="column-item selected">
          <img
            src="~@/assets/note-image/image1/image@1x.jpg"
            srcset="~@/assets/note-image/image1/image@2x.jpg 2x
                    ~@/assets/note-image/image1/image@3x.jpg 3x"
            class="candidate-photo"
          >
          <div class="candidate-name">Jokowi - Ma'ruf</div>
        </div>
        <div class="column-item">
          <img
            src="~@/assets/note-image/image2/image@1x.jpg"
            srcset="~@/assets/note-image/image2/image@2x.jpg 2x
                    ~@/assets/note-image/image2/image@3x.jpg 3x"
            class="candidate-photo"
          >
          <div class="candidate-name">Prabowo - Sandi</div>
        </div>
      </div>
      <button class="choice">Belum menentukan pilihan</button>
    </div>
    <div class="total-kecenderungan-container">
      <div class="image-container">
        <img src="~@/assets/note-image/image1/image@1x.jpg">
      </div>
      <div class="desc-container">
        <span class="text1">
          Total kecenderungan,
          <b>4 dari 6 Kuis</b>
        </span>
        <div class="total">70% (Jokowi - Ma'ruf)</div>
      </div>
    </div>
    <a href="#" class="more-notes">Lihat Catatan Lainnya</a>
  </div>
</template>

<script>
export default {
  name: 'HeaderNote'
}
</script>

<style lang="sass" scoped>
.header-note
  background: white
  display: flex
  flex-direction: column
  width: 358px

  .title
    font-size: 22px
    font-weight: 900
    font-style: normal
    font-stretch: normal
    line-height: 1.5
    letter-spacing: normal
    color: #393939
    padding: 10px 20px 0

  .description
    height: 53px
    background-color: #f4f4f4
    font-size: 10px
    line-height: 1.2
    color: #707070
    padding: 15px 20px
    margin: 0

  .note-container
    display: flex
    flex-direction: column
    padding: 20px
    .result-container
      flex: 0
      margin-bottom: 20px
      font-style: italic
      font-size: 10px
      font-style: italic
      line-height: 1.2
      color: #7c7c7c
      .result
        color: #f2771d
        font-style: normal
        display: inline-block
    .column-container
      display: flex
      justify-content: space-between
      .column-item
        border: 1px solid #cbcbcb
        flex-basis: 150px
        width: 150px
        .candidate-name
          text-align: center
        &.selected
          background: #f2771d
          border: 1px solid #f2771d
          .candidate-name
            color: white

  button.choice
    border: 1px solid #cbcbcb
    background: none
    padding: 11px
    text-align: center
    font-family: Lato;
    font-size: 16px
    line-height: 1.19
    letter-spacing: 0.5px
    color: #7c7c7c
    margin-top: 20px

  .total-kecenderungan-container
    display: flex
    background: #f9f9f9
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
        font-family: BwModelica, Lato
        font-size: 12px
        font-stretch: condensed
        line-height: 1.33
        letter-spacing: 0.3px
        color: #111111
      .total
        font-family: BwModelica, Lato
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
