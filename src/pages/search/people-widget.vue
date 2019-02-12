<template>
<div class="card">
  <h5 class="--title">User</h5>
  <ul class="radio-group">
    <li>
      <input type="radio" name="filter" v-model="filter" value="verified_all" id="index1">
      <label for="index1">Semua</label>
    </li>
    <li>
      <input type="radio" name="filter" v-model="filter" value="verified_true" id="index2">
      <label for="index2">Terverifikasi</label>
    </li>
    <li>
      <input type="radio" name="filter" v-model="filter" value="verified_false" id="index3">
      <label for="index3">Belum terverifikasi</label>
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
  name: 'SearchPeopleFilter',
  props: { input: String },
  data() {
    return {
      filter: this.input || 'verified_all'
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
