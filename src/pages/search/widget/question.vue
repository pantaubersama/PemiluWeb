<template>
  <div class="card">
    <div class="row">
      <h5 class="dropdown-title">User</h5>
      <ul class="radio-group">
        <li v-for="input in listFilterUser" :key="input.id">
          <input
            type="radio"
            name="radio.user"
            v-model="filterUser"
            :id="`user.${input.id}`"
            :value="input.value"
          >
          <label :for="`user.${input.id}`">{{ input.name }}</label>
        </li>
      </ul>
    </div>
    <div class="row">
      <h5 class="dropdown-title">Urutan</h5>
      <ul class="radio-group">
        <li v-for="input in listFilterSorting" :key="input.id">
          <input
            type="radio"
            name="radio.sorting"
            v-model="filterSorting"
            :id="`sorting.${input.id}`"
            :value="input.value"
          >
          <label :for="`sorting.${input.id}`">{{ input.name }}</label>
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
  name: 'SearchQuestionFilter',
  props: { value: Object },
  data() {
    return {
      filterUser: this.value.user || 'user_verified_all',
      filterSorting: this.value.sorting || 'created_at',
      listFilterUser: [
        {
          id: 1,
          value: 'user_verified_all',
          name: 'Semua'
        },
        {
          id: 2,
          value: 'user_verified_false',
          name: 'Belum Verifikasi'
        },
        {
          id: 3,
          value: 'user_verified_true',
          name: 'Terverifikasi'
        }
      ],
      listFilterSorting: [
        {
          id: 1,
          value: 'created_at',
          name: 'Paling Baru'
        },
        {
          id: 2,
          value: 'cached_votes_up',
          name: 'Paling Banyak Divoting'
        }
      ]
    }
  },
  methods: {
    getFilter() {
      return {
        user: this.filterUser,
        sorting: this.filterSorting
      }
    },
    submit() {
      this.$emit('input', this.getFilter())
    },
    reset() {
      this.filterUser = 'user_verified_all'
      this.filterSorting = 'created_at'
      this.$emit('input', this.getFilter())
    }
  }
}
</script>

<style lang="sass" scoped>
.button-filter-group
  display: flex
  justify-content: space-around
  margin-top: 15px
  padding: 0 14px 32px

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

  &:first-child
    border-bottom: .5px solid #ececec

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
