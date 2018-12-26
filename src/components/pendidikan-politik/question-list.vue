<template>
<ul class="question-list">
  <li>
    <button class="add-question">
      <div class="avatar-container">
        <img src="@/assets/trump.jpg" alt="avatar" class="avatar">
        <span class="name">Budi Santoso</span>
      </div>
      <p class="trigger">Apa pertanyaan Anda untuk kedua calon Presiden?</p>
    </button>
  </li>
  <li v-for="index in Array.from(Array(20).keys())"
    :key="index">
    <question-item></question-item>
  </li>
</ul>
</template>

<script>
import QuestionItem from '@/components/pendidikan-politik/question-item'

export default {
  name: 'QuestionList',
  components: {QuestionItem},
  data () {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
.question-list
  display: flex
  flex-direction: column
  li
    border: 1px solid #ececec
    border-left: 0
    border-right: 0
    &:not(:first-child)
      border-top: 0
    *
      width: 100%

  button.add-question
    background: #fef8e3
    border: none
    display: flex
    flex-direction: column
    padding: 10px 25px 0
    text-align: left
    cursor: pointer

    .avatar-container
      .avatar
        display: inline-block
        height: 20px
        width: 20px
        overflow: hidden
        object-fit: cover
        border-radius: 50%
      .name
        font-family: Lato
        font-size: 11px
        font-weight: bold
        line-height: 1.18
        color: #212121
    .trigger
      font-family: Lato
      font-size: 18px
      font-weight: bold
      line-height: 1.22
      color: #4f4f4f
</style>
