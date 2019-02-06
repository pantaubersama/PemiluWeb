<template>
  <div class="card widget-filter">
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
      <div class="dropdown-title">User</div>
      <ul>
        <li v-for="input in inputFilters" :key="input.id">
          <input
            type="radio"
            name="radio.group"
            v-model="selectedStatus"
            :id="`user.${input.id}`"
            :value="input.value"
          >
          <label
            :for="`user.${input.id}`"
            v-on:click.stop="handleStatusFilterOptions(input.value)"
          >{{ input.name }}</label>
        </li>
      </ul>
      <div class="dropdown-title">Cluster</div>
      <div class="cluster-search">
        <TextAutocomplete
          :items="clusters"
          :cleared="isCleared"
          @onUpdateItems="$emit('onUpdateItems', $event)"
          @onSelectedItem="$emit('onSelectedItem', $event)"
          @alreadyCleared="clearedAutocomplete()"
        />
      </div>
      <div class="button-filter-group">
        <button class="btn btn-primary" @click="$emit('onClickApplyButton')">Terapkan</button>
        <button class="btn btn-outline" @click="handleResetButton()">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import TextAutocomplete from '@/components/Autocomplete/TextAutocomplete'

export default {
  name: 'WidgetFilterJP',
  components: { TextAutocomplete },
  props: {
    clusters: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isActive: false,
      selectedStatus: 'user_verified_all',
      isCleared: false,
      inputFilters: [
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
    removeDropdown(event) {
      var isClickOutside =
        !event.target.parentNode.classList.contains('widget-filter') &&
        !event.target.parentNode.classList.contains('icon-filter')
      if (isClickOutside) {
        this.isActive = false
      }
    },
    handleStatusFilterOptions(value) {
      this.$emit('onChangeUserStatus', value)
    },
    handleResetButton() {
      this.selectedStatus = 'user_verified_all'
      this.isCleared = true
      this.$emit('onClickResetButton')
    },
    clearedAutocomplete() {
      this.isCleared = false
    }
  }
}
</script>
