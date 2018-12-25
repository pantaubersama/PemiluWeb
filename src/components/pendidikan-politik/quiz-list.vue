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

.total-kecenderungan
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 20px
  width: 100%
  height: 115px
  font-family: BwModelica, Lato
  background-image: url('../../assets/image-banner-pendidikan-quiz-1.svg')
  background-repeat: no-repeat
  background-size: 115%
  background-position-x: -73px
  background-position-y: -55px

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
