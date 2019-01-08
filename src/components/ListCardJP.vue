<template>
  <div class="card-content">
    <div class="top">
      <div class="avatar">
        <a href>
          <img src="@/assets/user.svg">
        </a>
      </div>
      <h5>Anik Kemala,
        <span>Cluster Partai Kuning Ceria</span>
      </h5>
      <span class="right">8 days ago</span>
    </div>
    <h4 class="title">Prabowo Menjanjikan Dana 1T Untuk Setiap Desa yang memiliki UMKM</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchang</p>
    <span class="icon-right">
      <a href>
        <img src="@/assets/icon_share.svg">
      </a>
      <a href class="icon-setting">
        <icon-dots/>
      </a>
    </span>
  </div>
</template>
<script>
import { IconDots } from '@/svg/icons'
export default {
  name: 'ListCardJP',
  components: {
    IconDots
  }
}
</script>
