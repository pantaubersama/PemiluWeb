<template>
  <ul class="question-list">
    <modal-create
      :name="setName(user.full_name)"
      :avatar="user.avatar.url"
      :is-submitting="isSubmitting"
      v-if="modal === 'ModalCreate'"
      @close="() => modal = null"
      @submit="submitQuestion($event)"
    ></modal-create>
    <li>
      <button class="add-question" type="button" @click.prevent="() => modal = 'ModalCreate'">
        <div class="avatar-container">
          <img src="@/assets/trump.jpg" alt="avatar" class="avatar">
          <span class="name">Budi Santoso</span>
        </div>
        <p class="trigger">Apa pertanyaan Anda untuk kedua calon Presiden?</p>
      </button>
    </li>
    <li v-if="loading" :style="{'margin': '10px 0', 'border-width': 0}">
      <ContentLoader/>
    </li>
    <li v-for="question in questions" :key="question.id" v-else>
      <question-item
        :id="question.id"
        :title="question.user.about"
        :question="question.body"
        :time="question.created_at_in_word.id"
        :name="question.user.full_name"
        :avatar="question.user.avatar.thumbnail_square.url"
        :is-voted="question.is_liked"
        :count="question.like_count"
        @upvoted="$emit('upvoted', $event)"
      ></question-item>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import { utils } from '@/mixins/utils'
import * as PenpolAPI from '@/services/api/modules/pendidikan-politik'
import ContentLoader from '@/components/Loading/ContentLoader'
import QuestionItem from '@/components/pendidikan-politik/question-item'
import ModalCreate from '@/components/pendidikan-politik/modal-create'

export default {
  name: 'QuestionList',
  components: { QuestionItem, ContentLoader, ModalCreate },
  mixins: [utils],
  props: {
    questions: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      modal: null,
      isSubmitting: false
    }
  },
  computed: {
    ...mapState({
      user: s => s.profile.user
    })
  },
  methods: {
    async submitQuestion(data) {
      this.isSubmitting = true
      const resp = await PenpolAPI.postQuestion(data.title)
      const question = resp.question
      this.$store.dispatch('addQuestion', question)
      this.isSubmitting = false
      this.modal = null
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
      @media (max-width: 575px)
        font-size: 14px
</style>
