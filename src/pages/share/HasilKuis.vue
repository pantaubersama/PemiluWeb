<template>
  <timeline-layout>
    <div slot="main-content">
      <quiz-result :showModal="showModal" :hideKunciJawaban="true" :isPublic="true"/>
    </div>
    <div slot="widget-wrapper">
    </div>
  </timeline-layout>
</template>

<script>
  import TimelineLayout from '@/layout/Timeline'
  import QuizResult from '@/components/pendidikan-politik/quiz-result'

  export default {
    name: "ShareHasilKuis",

    data(){
      return {
        showModal: false,
      }
    },

    components: {
      TimelineLayout,
      QuizResult
    }
  }
</script>

<style scoped>

</style>
