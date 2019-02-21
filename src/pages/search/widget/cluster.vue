<template>
  <div class="card">
    <h5 class="--title">Kategori</h5>
    <v-autocomplete
      :items="filteredCategories"
      v-model="selectedCategory"
      :get-label="getLabel"
      :auto-select-one-item="false"
      :keep-open="false"
      :component-item="template"
      @change="onUpdateItems($event)"
      @item-selected="onSelectItem($event)"
    ></v-autocomplete>
    <div class="button-filter-group">
      <button class="btn btn-primary" type="button" @click.prevent="submit()">Terapkan</button>
      <button class="btn btn-outline" type="button" @click.prevent="reset()">Reset</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import debounce from 'lodash.debounce'
import TextAutocomplete from '@/components/Autocomplete/TextAutocomplete'
import clusterCategoryItem from '@/pages/search/cluster-category-item'

export default {
  name: 'SearchClusterFilter',
  props: ['value'],
  components: { TextAutocomplete },
  data() {
    return {
      cleared: false,
      filter: this.value || '',
      currentFilter: null,
      selectedCategory: null,
      template: clusterCategoryItem
    }
  },
  computed: {
    ...mapState({
      clusters: s => s.profile.filterClusters,
      categories: s => s.profile.categories
    }),
    filteredCategories() {
      const filter = this.currentFilter
      return this.categories.filter(
        it => it.name.toLowerCase().indexOf(filter) !== -1
      )
    }
  },
  async mounted() {
    await this.getCategories()
  },
  methods: {
    ...mapActions({
      searchCluster: 'profile/searchClusters',
      getCategories: 'profile/getClusterCategories'
    }),
    submit() {
      this.$emit('input', this.filter)
    },
    reset() {
      this.filter = null
      this.selectedCategory = null
      this.$emit('input', this.filter)
    },
    onUpdateItems(name) {
      this.currentFilter = name
    },
    onSelectItem(category) {
      this.filter = category.id
    },
    getLabel(item) {
      if (item == null) return null
      return item.name
    }
  }
}
</script>

<style lang="sass" scoped>
.card /deep/ input.v-autocomplete-input
  width: 100%
  border-radius: 4px
  color: #393939
  border: 1px solid rgba(0, 0, 0, 0.125)
  padding: 10px 15px
  &:focus
    border-color: #6ccfc0

.card /deep/ .v-autocomplete-list
  background: white
  box-shadow: 1px 1px 4px rgba(165, 165, 165, 0.2)
  border-radius: 3px
  border: 1px solid rgba(165, 165, 165, 0.2)

.card /deep/ .v-autocomplete-item-active li
  background: rgba(165, 165, 165, 0.2)

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
