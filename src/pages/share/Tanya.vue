<template>
  <timeline-layout>
    <div slot="main-content" v-if="isLoadingTanya">
      <!-- loading state -->
    </div>
    <div slot="main-content" v-else>
      <DetailPost :data="tanya" @upvoted="onUpvote(tanya.id)" @removeVoted="onRemoveVote(tanya.id)"/>
    </div>
    <div slot="widget-wrapper">
    </div>
  </timeline-layout>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import TimelineLayout from '@/layout/Timeline'
  import DetailPost from '@/components/pendidikan-politik/DetailPost'

  export default {
    name: "ShareTanya",

    components: {
      TimelineLayout,
      DetailPost
    },

    data() {
      return {
      }
    },

    computed: {
      ...mapState({
        tanya: state => state.PendidikanPolitikDetail.tanya,
        isLoadingTanya: state => state.PendidikanPolitikDetail.isLoadingTanya
      })
    },

    methods: {
      ...mapActions(['vote', 'unVote']),

      onUpvote(id) {
        this.vote(id)
      },

      onRemoveVote(id) {
        this.unVote(id)
      },
    },

    created(){
      this.$store.dispatch('PendidikanPolitikDetail/getDetailTanya', { id: this.$route.params.id } )
    },

    destroyed(){
      this.$store.dispatch('PendidikanPolitikDetail/emptyDetail')
    }
  }
</script>

<style scoped>

</style>
