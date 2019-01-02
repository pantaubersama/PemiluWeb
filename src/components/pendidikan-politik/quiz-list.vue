<template>
<div class="quiz-list">
  <div class="total-kecenderungan">
    <p class="title">
      Total Kecenderunganmu:
    </p>
    <p class="total">
      70% (Jokowi-Makruf)
    </p>
  </div>
  <ul>
    <li class="quiz-item">
      <div class="artwork-container">
        <img src="@/assets/image-quiz-1.svg" class="quiz-artwork">
      </div>
      <div class="info-container">
        <h3 class="title">Quiz Minggu ke-3</h3>
        <span class="question-count">7 Pertanyaan</span>
        <a href="#" class="share">
          <i class="icon icon-share"></i> Bagikan
        </a>
        <div class="spacer"></div>
        <router-link class="btn btn-primary orange" :to="{name: 'PendidikanPolitikQuiz'}">Ikuti >></router-link>
      </div>
    </li>
    <li class="quiz-item">
      <div class="artwork-container">
        <img src="@/assets/image-quiz-2.png"
          srcset="@/assets/image-quiz-2@2x.png 2x,
                  @/assets/image-quiz-2@3x.png 3x"
          class="quiz-artwork">
      </div>
      <div class="info-container">
        <h3 class="title">Quiz Minggu ke-2</h3>
        <span class="question-count">5 Pertanyaan</span>
        <a href="#" class="share"><i class="icon icon-share"></i> Bagikan</a>
        <div class="spacer"></div>
        <button class="btn btn-primary red">Lanjut >></button>
      </div>
    </li>
    <li class="quiz-item">
      <div class="artwork-container">
        <img src="@/assets/image-quiz-3.svg" class="quiz-artwork">
      </div>
      <div class="info-container">
        <h3 class="title">Quiz Minggu ke-2</h3>
        <span class="question-count">5 Pertanyaan</span>
        <a href="#" class="share"><i class="icon icon-share"></i> Bagikan</a>
        <div class="spacer"></div>
        <button class="btn btn-primary torquoise">Result >></button>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'QuizList'
}
</script>

<style lang="sass" scoped>
.quiz-list
  display: flex
  flex-direction: column
  align-items: center
  ul
    width: 100%

.quiz-item
  display: flex
  padding: 30px
  border-bottom: 1px solid #ececec
  &:last-child
    border-bottom: 0

  .artwork-container
    max-width: 230px
    flex: 0
    flex-basis: 230px
  .info-container
    flex: 1
    display: flex
    flex-direction: column
    margin-left: 50.5px
    h3.title
      font-family: BwModelica, Lato
      font-size: 18px
      font-weight: bold
      font-stretch: condensed
      line-height: 0.89
      letter-spacing: 0.4px
      text-align: left
      color: #000000
    .question-count
      font-family: BwModelica, Lato
      font-size: 12px
      font-stretch: condensed
      line-height: 1.33
      letter-spacing: 0.3px
      text-align: left
      color: #000000
    a.share
      text-decoration: none
      font-family: Lato
      font-size: 12px
      line-height: 1.08
      text-align: left
      color: #7c7c7c
      display: flex
      align-items: center
      margin-top: 5px
      .icon
        display: inline-block
        height: 24px
        width: 24px
      .icon.icon-share
        background-image: url('~@/assets/icon_share.svg')
    .spacer
      flex: 1
    .btn
      font-size: 12px
      font-weight: bold
      line-height: 1.42
      letter-spacing: 0.3px
      text-align: left
      width: 70px
    .btn.orange
      background: #f2771d
      border: none

.total-kecenderungan
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 20px
  width: 100%
  height: 115px
  font-family: BwModelica, Lato
  background-image: url('~@/assets/image-banner-pendidikan-quiz-1.svg')
  background-repeat: no-repeat
  background-size: 115%
  background-position-x: -73px
  background-position-y: -55px
  border-bottom: 1px solid #ececec

  .title,
  .total
    margin: 0
    padding: 5px
  .title
    font-size: 18px
    font-weight: bold
    font-stretch: condensed
    line-height: 0.89
    letter-spacing: 0.4px
    color: #000000
  .total
    font-family: BwModelica, Lato
    font-size: 18px
    font-weight: bold
    font-stretch: condensed
    line-height: 0.89
    color: #f2771d
</style>
