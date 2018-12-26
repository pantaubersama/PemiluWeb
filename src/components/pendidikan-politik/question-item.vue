<template>
<div class="question-item">
  <button class="vote">
    <img src="@/assets/icon-upvote.svg" alt="vote" class="icon vote-up">
    <span class="vote-count">1k</span>
  </button>
  <div class="content">
    <div class="meta">
      <img src="@/assets/trump.jpg" alt="avatar" class="avatar">
      <div class="title">
        <div class="name">Trump</div>
        <small class="question-title">Apa apa apa apa apa apa apa?</small>
      </div>
      <small class="time">Ask 8 days ago</small>
    </div>
    <div class="question">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum
      voluptatibus quisquam necessitatibus asperiores ullam provident impedit
      reprehenderit suscipit quibusdam assumenda, non soluta perferendis
      quaerat accusamus adipisci consequuntur dolores nihil.
    </div>
    <div class="button-list">
      <button class="share">
        <img src="@/assets/icon_share.svg">
      </button>
      <button class="menu">
        <img src="@/assets/dots-icon.svg">
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'QuestionItem'
}
</script>
<style lang="sass" scoped>
.question-item
  display: flex
  width: 100%

button.vote
  flex-basis: 50px
  width: 50px
  height: 81px
  background: white
  border: 1px solid #ececec
  border-left: 0
  border-top: 0
  cursor: pointer
  .vote-count
    color: #727272
    font-size: 14px

.content
  flex: 1
  margin: 20px
  margin-top: 16.5px

  .meta
    display: flex;
    .avatar
      flex: 0
      flex-basis: 32px
      height: 32px
      width: 32px
      border-radius: 50%
      overflow: hidden
      object-fit: cover
    .title
      flex: 2
      display: flex
      flex-direction: column
      margin-left: 5px
      .name
        font-size: 12px
        font-weight: bold
        line-height: 1.25
        text-align: left
        color: #212121
      .question-title
        font-size: 11px
        line-height: 1.18
        text-align: left
        color: #4f4f4f
    .time
      flex: 1
      text-align: right
      font-size: 11px
      line-height: 1.18
      color: #7c7c7c

  .question
    font-family: BwModelicaSS01, Lato
    font-size: 16px
    font-weight: bold
    font-stretch: condensed
    line-height: 1.38
    text-align: left
    color: #393939

.button-list
  display: flex
  justify-content: flex-end

  button
    padding: 0
    width: 25px
    height: 25px
    display: inline-flex
    justify-content: center
    flex-direction: row
    margin-left: 5px
    cursor: pointer
    border: none
    background: none

    img
      object-fit: contain
      width: 18px
      height: 18px
</style>
