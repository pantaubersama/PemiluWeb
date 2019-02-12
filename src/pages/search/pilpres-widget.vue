<template>
<div class="card">
  <h5 class="--title">Sumber</h5>
  <ul class="radio-group">
    <li v-for="source in sources" :key="source.value">
      <input type="radio" name="filter" v-model="filter" :value="source.value" :id="source.value">
      <label :for="source.value">{{source.label}}</label>
    </li>
  </ul>
  <div class="button-filter-group">
    <button class="btn btn-primary" type="button" @click.prevent="submit()">Terapkan</button>
    <button class="btn btn-outline" type="button" @click.prevent="reset()">Reset</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchPilpresFilter',
  props: { value: String },
  data() {
    return {
      filter: this.value || 'team_all',
      sources: [
        { label: 'Semua', value: 'team_all' },
        { label: 'Tim Jokowi - Ma\'ruf', value: 'team_id_1' },
        { label: 'Tim Prabowo - Sandi', value: 'team_id_2' },
        { label: 'KPU', value: 'team_id_3' },
        { label: 'Bawaslu', value: 'team_id_4' },
      ]
    }
  },
  methods: {
    submit() { this.$emit('input', this.filter) },
    reset() {
      this.filter = 'verified_all'
      this.$emit('input', this.filter)
    }
  }
}
</script>

<style lang="sass" scoped>
.button-filter-group
  display: flex
  justify-content: space-between
  margin-top: 15px
.button-filter-group button
  max-width: 119px
  height: 26px
  border-radius: 2px
  font-size: 12px
  line-height: 1.25
  letter-spacing: 1.2px
  text-align: center
  &.btn-primary
    color: #ffffff
    background-color: #bd081c

.card
  padding: 20px 25px

.--title
  font-family: BwModelicaSS01, Lato
  font-size: 14px
  font-weight: bold;
  font-stretch: condensed
  line-height: 1.14
  color: #111111

ul.radio-group
  margin-top: 10px
li label
  font-family: Lato
  font-size: 12px
  line-height: 1.25
  letter-spacing: 0.3px
  color: #393939
</style>
