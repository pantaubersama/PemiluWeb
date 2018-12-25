<template>
  <div class="nav-top">
    <ul>
      <li>
        <router-link to="/" exact>
        <img src="../assets/icon_home_active.svg"> 
        Beranda
        </router-link>
      </li>
      <li><router-link  to="/linimasa"><img src="../assets/icon_book.svg">Linimasa</router-link></li>
      <li><a href=""><img src="../assets/icon_education.svg">Pendidikan Politik</a></li>
      <li><a href=""><img src="../assets/icon_record.svg">Wordstadium</a></li>
      <li><a href=""><img src="../assets/icon_report.svg">Lapor</a></li>
      <li><a href=""><img src="../assets/icon_date.svg">Perhitungan</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavSidebarTop'
}
</script>
