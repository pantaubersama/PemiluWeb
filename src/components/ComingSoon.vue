<template>
  <div class="card comingsoon">
    <div class="comingsoon-lottie lottie-card" ref="comingsoonLottie"></div>
    <h3>Coming Soon</h3>
    <p>Pantau terus di Web dan Sosial Media
      <br>Pantau Bersama untuk info tanggal updatenya
    </p>
    <div class="sosmed-icons">
      <a href target="_blank">
        <img src="@/assets/pantau-square.svg" alt>
      </a>
      <a href target="_blank">
        <img src="@/assets/facebook-square.svg" alt>
      </a>
      <a href target="_blank">
        <img src="@/assets/instagram-square.svg" alt>
      </a>
      <a href target="_blank">
        <img src="@/assets/twitter-square.svg" alt>
      </a>
    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import Modal from '@/layout/Modal'
export default {
  name: 'ComingSoon',
  components: {
    Modal,
    lottie
  },
  data() {
    return {
      comingsoonLottie: null
    }
  },
  mounted() {
    this.comingsoonLottie = lottie.loadAnimation({
      container: this.$refs.comingsoonLottie,
      path: '/lottie/coming-soon-coffee.json',
      autoplay: true,
      loop: true,
      renderer: 'svg'
    })
  }
}
</script>
