<template>
  <div class="card">
    <div class="row">
      <h5 class="dropdown-title">Quiz</h5>
      <ul class="radio-group">
        <li v-for="input in listFilterQuiz" :key="input.id">
          <input
            type="radio"
            name="radio.filter"
            v-model="filter"
            :id="`filter.${input.id}`"
            :value="input.value"
          >
          <label :for="`filter.${input.id}`">{{ input.name }}</label>
        </li>
      </ul>
    </div>
    <div class="button-filter-group">
      <button class="btn btn-primary" type="button" @click.prevent="submit()">Terapkan</button>
      <button class="btn btn-outline" type="button" @click.prevent="reset()">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchQuizFilter',
  props: { value: String },
  data() {
    return {
      filter: this.value || 'all',
      listFilterQuiz: [
        {
          id: 1,
          value: 'all',
          name: 'Semua'
        },
        {
          id: 2,
          value: 'not_participating',
          name: 'Belum Diikuti'
        },
        {
          id: 3,
          value: 'in_progress',
          name: 'Belum Selesai'
        },
        {
          id: 4,
          value: 'finished',
          name: 'Selesai'
        }
      ]
    }
  },
  methods: {
    submit() {
      this.$emit('input', this.filter)
    },
    reset() {
      this.filter = 'all'
      this.$emit('input', this.filter)
    }
  }
}
</script>

<style lang="sass" scoped>
.button-filter-group
  display: flex
  justify-content: space-around
  padding: 0 14px 20px

  button
    max-width: 119px
    height: 26px
    border-radius: 2px
    font-size: 12px
    line-height: 1.25
    letter-spacing: 1.2px
    text-align: center
    flex: 0 105px
    text-transform: uppercase

    &.btn-primary
      flex: 1
      color: #ffffff
      background-color: #bd081c

.card
  padding: 0

.row
  position: relative
  display: flex
  flex-direction: column
  padding: 20px 14px
  margin: 0

  // &:first-child
  //   border-bottom: .5px solid #ececec

ul.radio-group
  margin-top: 10px
  li
    padding: 4px

    label
    font-family: Lato
    font-size: 12px
    line-height: 1.25
    letter-spacing: 0.3px
    color: #393939

.dropdown-title
  font-family: BwModelicaSS01, Lato
  font-size: 14px
  font-weight: bold
  font-stretch: condensed
  line-height: 1.14
  color: #111111
  margin-bottom: 10px
  margin-left: 4px
</style>
