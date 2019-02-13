<template>
  <div class="card">
    <div class="row">
      <h5 class="dropdown-title">Cluster</h5>
      <div class="cluster-search">
        <text-autocomplete
          :items="clusters"
          :cleared="cleared"
          @onUpdateItems="searchClusters($event)"
          @onSelectedItem="setCluster($event)"
        />
      </div>
    </div>
    <div class="row">
      <h5 class="dropdown-title">User</h5>
      <ul class="radio-group">
        <li v-for="input in listFilterUser" :key="input.id">
          <input
            type="radio"
            name="radio.user"
            v-model="filter"
            :id="`user.${input.id}`"
            :value="input.value"
          >
          <label
            :for="`user.${input.id}`"
            v-on:click.stop="$emit('onChangeFilter', input.value)"
          >{{ input.name }}</label>
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
import { mapState } from 'vuex'
import TextAutocomplete from '@/components/Autocomplete/TextAutocomplete'

export default {
  name: 'SearchJanjiPolitikFilter',
  components: { TextAutocomplete },
  props: { value: Object },
  data() {
    return {
      cleared: false,
      filter: this.value.filter || 'user_verified_all',
      cluster: null,
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
      ]
    }
  },
  computed: {
    ...mapState({
      clusters: s => s.profile.filterClusters
    })
  },
  methods: {
    setDefault() {
      this.filter = 'user_verified_all'
      this.cluster = null
    },
    getFilter() {
      return {
        filter: this.filter,
        cluster: this.cluster
      }
    },
    submit() {
      this.$emit('input', this.getFilter())
    },
    reset() {
      this.setDefault()
      this.$emit('input', this.getFilter())
    },
    searchClusters(cluster) {
      this.$store.dispatch('profile/searchClusters', cluster)
    },
    setCluster(item) {
      this.cluster = item.id
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

/deep/
  .cluster-search
    margin-bottom: 10px

    input
      width: 100%
      border-radius: 4px
      color: #393939
      border: 1px solid rgba(0, 0, 0, 0.125)
      padding: 10px 15px

      &:focus
        border-color: #6ccfc0
</style>
