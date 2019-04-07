<template>
  <div class="wrapper-vote">
        <div class="total-vote">
          <span>Total Suara Masuk</span>
          {{SuaraSah}}
        </div>
        <div class="fault-vote">
          <span>Suara Tidak Sah</span>
          {{SuaraTidakSah}}
        </div>
      </div>
</template>

<script>
  export default {
    name: 'VoteCard',
    props: ['SuaraSah', 'SuaraTidakSah']
  }
</script>

<style lang="sass" scoped>
.wrapper-vote
  display: flex
  background-color: #fff
  border: 1px solid rgba(0, 0, 0, 0.125)
  border-radius: 0.25rem
  margin-bottom: 15px
  > div
    flex: 1
    padding: 17px 20px
    font-weight: bold
    color: #111111
    span
      font-weight: normal
      color: #4f4f4f
      min-width: 130px
      display: inline-flex
      justify-content: space-between
      margin-right: 5px
      &:after
        content: ":"
        display: inline-flex
        align-items: center
  .total-vote
    border-right: 1px solid rgba(0, 0, 0, 0.125)
</style>
