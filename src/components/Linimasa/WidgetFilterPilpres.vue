<template>
  <div class="card widget-filter">
    <div class="button-reset">
      <button class="btn btn-outline">Reset</button>
    </div>
    <button
      class="button-filter"
      id="button-filter"
      :class="{'is-active': isActive}"
      @click="toggleDropdown($event)"
    >
      Filter
      <i class="icon icon-filter">
        <img src="@/assets/icon-filter.svg" alt>
      </i>
    </button>

    <div class="dropdown-content" @click.stop>
      <div class="dropdown-title">Sumber dari</div>
      <ul>
        <li v-for="input in inputFilters" :key="input.id">
          <input
            type="radio"
            name="radio.group"
            v-model="selectedSource"
            :id="`sumber.${input.id}`"
            :value="input.value"
          >
          <label
            :for="`sumber.${input.id}`"
            v-on:click.stop="handleSourceFilterOptions(input.value)"
          >{{ input.name }}</label>
        </li>
      </ul>
      <div class="button-filter-group">
        <button class="btn btn-primary" @click="$emit('onClickApplyButton')">Terapkan</button>
        <button class="btn btn-outline" @click="handleResetButton()">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetFilterPilpres',
  data() {
    return {
      isActive: false,
      selectedSource: 'team_all',
      inputFilters: [
        {
          id: 1,
          value: 'team_all',
          name: 'Semua'
        },
        {
          id: 2,
          value: 'team_id_1',
          name: 'Team Jokowi - Makruf'
        },
        {
          id: 3,
          value: 'team_id_2',
          name: 'Team Prabowo - Sandi'
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('click', this.removeDropdown)
  },
  methods: {
    toggleDropdown(event) {
      this.isActive = !this.isActive
    },
    close() {
      this.isActive = false
    },
    removeDropdown() {
      var isClickOutside =
        !event.target.parentNode.classList.contains('widget-filter') &&
        !event.target.parentNode.classList.contains('icon-filter')
      if (isClickOutside) {
        this.isActive = false
      }
    },
    handleSourceFilterOptions(value) {
      this.$emit('onChangeSource', value)
    },
    handleResetButton() {
      this.selectedSource = 'team_all'
      this.$emit('onClickResetButton')
    }
  }
}
</script>
