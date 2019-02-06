<template>
  <div class="nav-bottom">
    <h4>Lainnya</h4>
    <ul>
      <li>
        <a href="https://pantaubersama.pusatbantuan.com/2/2">
          <img src="@/assets/icon_love.svg">Panduan Komunitas
        </a>
      </li>
      <li>
        <a href="https://pantaubersama.pusatbantuan.com/2/2">
          <img src="@/assets/icon_info.svg">Pusat Bantuan
        </a>
      </li>
      <!-- <li>
        <a href="javascript:void(0)">
          <img src="@/assets/icon_message.svg">Kirim Masukan
        </a>
      </li>-->
      <li>
        <router-link to="/profile/setting">
          <img src="@/assets/icon_setting.svg">Pengaturan
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavSidebarBottom'
}
</script>
