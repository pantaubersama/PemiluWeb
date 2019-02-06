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
      <slot name="content">Default content for widget filter</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetFilter',
  props: {
    isActive: Boolean
  },
  mounted() {
    window.addEventListener('click', this.removeDropdown)
  },
  destroyed() {
    window.removeEventListener('click', this.removeDropdown)
  },
  methods: {
    toggleDropdown(event) {
      // this.isActive = !this.isActive
      if (!this.isActive) return this.$emit('open')
      return this.$emit('close')
    },
    close() {
      // this.isActive = false
      this.$emit('close')
    },
    removeDropdown(event) {
      const isClickOutside =
        !event.target.parentNode.classList.contains('widget-filter') &&
        !event.target.parentNode.classList.contains('icon-filter')
      if (isClickOutside) {
        this.close()
      }
    }
  }
}
</script>
