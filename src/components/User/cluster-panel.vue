<template>
  <div class="list-wrap">
    <h4 class="title">Cluster</h4>
    <div class="item">
      <img
        v-if="!isEmptyCluster && user.cluster.image.url"
        :src="user.cluster.image.url"
        class="cluster-image"
      >
      <p v-if="isEmptyCluster" class="cluster-name t-grey">Belum punya cluster</p>
      <p v-else class="cluster-name">{{user.cluster.name}}</p>

    </div>
  </div>
</template>
<script>
export default {
  props: ['user'],
  data() {
    return {
      isModalRequestClusterOpen: false,
      isDropdownRequestActive: false
    }
  },
  computed: {
    isEmptyCluster() {
      return this.user.cluster == null
    }
  },
  methods: {
    toggleDropdownRequestCluster() {
      this.isDropdownRequestActive = !this.isDropdownRequestActive
    },
    removeDropdown(event) {
      const isInsideDropdown = event.target.parentNode.parentNode.classList.contains(
        'request-cluster'
      )
      if (!this.isDropdownRequestActive) return
      if (!isInsideDropdown) this.isDropdownRequestActive = false
    },
    onToggleClusterState() {
      this.isEmptyCluster = !this.isEmptyCluster
    }
  },
  mounted() {
    window.addEventListener('click', this.removeDropdown)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.removeDropdown)
  }
}
</script>

<style lang="sass" scoped>
.cluster-image
  width: 35px !important
  height: 35px !important
  object-fit: cover
  border-radius: 50%
span.icon
  position: relative
button.request-cluster
  background: none
  border: none
  cursor: pointer
  &.is-active + .dropdown-content
    display: block
.dropdown-content
  a,
  button
    font-family: Lato
    font-size: 12px
    font-weight: bold
    line-height: 1.33
    text-align: left
    color: #111111
    cursor: pointer
    background: none
    border: none
    padding: 5px
    width: 100%
  .create-cluster
    color: #f2771d
.fiexed
  position: fixed
  bottom: 10px
  right: 10px
  padding: 20px
  background: white
  border-radius: 3px
  box-shadow: 0 0 3px rgba(0,0,0,.3)
  z-index: 1000
.cluster-name
  font-family: Lato
  font-size: 12px
  font-weight: bold
  line-height: 1.25
  text-align: left
  &.t-grey
    color: #cbcbcb;
</style>
