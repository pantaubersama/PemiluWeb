<template>
  <div class="card-detail-wrapper">
    <div class="card card-detail">
      <div class="detail-title">Prabowo Menjanjikan Dana 1T Untuk Setiap Desa yang memiliki UMKM</div>
      <div class="content-wrapper">
        <div class="detail-cluster">
          <div class="cluster-thumb">
            <img src="@/assets/trump.jpg" alt>
          </div>
          <div class="cluster-content">
            <h5>Cluster Partai Kuning Ceria</h5>
            <p>10 anggota</p>
          </div>
          <a href class="icon-setting">
            <icon-dots/>
          </a>
        </div>
        <div class="detail-content">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchang.
          <br>
          <br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchang
          <img
            src="@/assets/detail-img.png"
            alt
          >
        </div>
        <div class="detail-share">
          <button class="btn" id="button-share">
            BAGIKAN
            <img src="@/assets/icon_share.svg" alt>
          </button>
        </div>
      </div>
    </div>
    <div class="card card-author">
      <div class="author-thumb">
        <img src="@/assets/trump.jpg" alt>
      </div>
      <div class="author-name">Aniah Muanjani</div>
      <p>Berjuang bersama untuk Indonesia</p>
      <div class="time-posted">Posted 8 days ago</div>
    </div>
  </div>
</template>
<script>
import { IconDots } from '@/svg/icons'
export default {
  name: 'DetailPost',
  components: {
    IconDots
  }
}
</script>
