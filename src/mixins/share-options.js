const shareOptions = {
  data() {
    return {
      isActive: false
    }
  },
  created() {
    window.addEventListener('click', this.removeDropdown)
  },
  methods: {
    toggleDropdown(el, event) {
      var toggleClick =
        event.target.classList.contains('is-active') ||
        event.target.parentNode.classList.contains('is-active')
      this.isActive = el
      if (toggleClick) {
        this.isActive = false
      }
    },
    removeDropdown(event) {
      var isClickOutside =
        !event.target.classList.contains('icon-setting') &&
        !event.target.parentNode.classList.contains('icon-setting')
      if (isClickOutside) {
        this.isActive = 0
      }
    },
    copy(id) {
      this.$emit('onCopy', id)
      this.isActive = false
    },
    share(id) {
      this.$emit('onShare', id)
      this.isActive = false
    }
  }
}

export default shareOptions
