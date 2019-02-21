<template>
  <timeline-layout>
    <div slot="main-content">
      <quiz-detail
        :showModal="showModal"
        @close="onClickCloseButton"
        @onClickNextButton="onClickNextButton"
        @onClickChoicesButton="onClickChoicesButton"
      />
    </div>
    <div slot="widget-wrapper">
    </div>
  </timeline-layout>
</template>

<script>
  import TimelineLayout from '@/layout/Timeline'
  import QuizDetail from '@/components/pendidikan-politik/quiz-detail'
  import router from '@/router'

  export default {
    name: "ShareKuis",

    data(){
      return {
        showModal: false,
      }
    },

    components: {
      TimelineLayout,
      QuizDetail
    },

    methods: {
      onClickCloseButton() {
        this.showModal = false
      },

      onClickNextButton(isShow) {
        this.showModal = !isShow
        this.$store.dispatch('homeKenalan/updateKenalan', {
          id: 'f2596bdb-90ba-41e9-8c39-11c891c68f1f'
        })
      },

      onClickChoicesButton(value) {
        if (!value.next) {
          this.showModal = false

          setTimeout(() => {
            const { id } = this.$route.params
            router.push({ name: 'PendidikanPolitikQuizHasil', params: { id } })
          }, 700)
        }
      }
    }
  }
</script>

<style scoped>

</style>
