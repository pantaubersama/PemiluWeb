<template>
  <div class="join-cluster-wrapper">
    <div class="join-cluster">
      <h3>"Selamat"</h3>
      <p> anda berhasil bergabung kedalam cluster <br>
        lihat profile untuk mengetahui lebih lanjut
      </p>
      <router-link class="btn btn-primary" to="/profile">Profile</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinCluster',
  created (){
    this.$store.dispatch('profile/joinCluster', {magicLink : this.$route.params.id})
  }
}
</script>
<style lang="sass" scoped>
.join-cluster
  padding: 15px
  &-wrapper
    width: 100vw
    height: 100vh
    display: flex
    align-items: center
    justify-content: center
    overflow-x: hidden
    text-align: center
</style>

