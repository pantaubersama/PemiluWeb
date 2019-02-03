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
    <ModalShare
      v-if="modal === 'modalShare'"
      :id="shareId"
      title="Kamu setuju pertanyaan ini? Upvote dulu, dong ⬆"
      v-on:close="modal = false"
    />
    <li>
      <button class="add-question" type="button" @click.prevent="() => modal = 'ModalCreate'">
        <div class="avatar-container">
          <img src="@/assets/trump.jpg" alt="avatar" class="avatar">
          <span class="name">Budi Santoso</span>
        </div>
        <p class="trigger">Ada pertanyaan untuk Calon Presiden dan Calon Wakil Presiden 2019-2024?</p>
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
        @onCopy="copyToClipboard($event)"
        @onShare="modalShare($event)"
        @onReport="handleReport($event)"
      ></question-item>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { utils } from '@/mixins/utils'

import * as PenpolAPI from '@/services/api/modules/pendidikan-politik'
import ModalShare from '@/components/Linimasa/ModalShare'
import ContentLoader from '@/components/Loading/ContentLoader'
import QuestionItem from '@/components/pendidikan-politik/question-item'
import ModalCreate from '@/components/pendidikan-politik/modal-create'

export default {
  name: 'QuestionList',
  components: {
    QuestionItem,
    ContentLoader,
    ModalCreate,
    ModalShare
  },
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
      shareId: '',
      isSubmitting: false
    }
  },
  computed: {
    ...mapState({
      user: s => s.profile.user
    })
  },
  methods: {
    ...mapActions(['postReport']),
    async submitQuestion(data) {
      this.isSubmitting = true
      const resp = await PenpolAPI.postQuestion(data.title)
      const question = resp.question
      this.$store.dispatch('addQuestion', question)
      this.isSubmitting = false
      this.modal = null
    },
    handleReport(id) {
      this.postReport(id)
        .then(response => {
          const { vote } = response
          if (vote && vote.status) {
            this.$toaster.success('Berhasil laporkan sebagai spam.')
          } else {
            this.$toaster.warning(vote.text)
          }
        })
        .catch(() => this.$toaster.error('Gagal laporkan sebagai spam.'))
    },
    copyToClipboard(id) {
      this.$clipboard(`${process.env.BASE_URL}/pendidikan-politik/detail/${id}`)
      this.$toaster.info('Berhasil menyalin teks.')
    },
    modalShare(id) {
      this.shareId = id
      this.modal = 'modalShare'
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
      font-size: 14px
      font-weight: bold
      line-height: 1.22
      color: #4f4f4f
      padding: 5px 0
      @media (max-width: 575px)
        font-size: 14px
</style>
