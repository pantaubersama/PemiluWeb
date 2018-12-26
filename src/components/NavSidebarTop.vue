<template>
  <div class="nav-top">
    <ul>
      <li><router-link to="/" exact><img src="@/assets/icon_home_active.svg"> Beranda</router-link></li>
      <li><router-link to="/linimasa"><img src="@/assets/icon_book.svg">Linimasa</router-link></li>
      <li><router-link to="/pendidikan-politik"><img src="@/assets/icon_education.svg">Pendidikan Politik</router-link></li>
      <li><router-link to="/wordstadium"><img src="@/assets/icon_record.svg">Wordstadium</router-link></li>
      <li><router-link to="/lapor"><img src="@/assets/icon_report.svg">Lapor</router-link></li>
      <li><router-link to="/perhitungan"><img src="@/assets/icon_date.svg">Perhitungan</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavSidebarTop'
}
</script>
