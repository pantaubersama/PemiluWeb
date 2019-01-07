<template>
  <div class="nav-top">
    <ul>
      <li>
        <router-link to="/" exact>
          <home-icon/>Beranda
        </router-link>
      </li>

      <li>
        <router-link to="/linimasa">
          <assignment-icon/>Linimasa
        </router-link>
      </li>

      <li>
        <router-link to="/pendidikan-politik">
          <book-icon/>Pendidikan Politik
        </router-link>
      </li>

      <li>
        <router-link to="/wordstadium">
          <record-icon/>Wordstadium
        </router-link>
      </li>

      <li>
        <router-link to="/lapor">
          <report-icon/>Lapor
        </router-link>
      </li>

      <li>
        <router-link to="/perhitungan">
          <date-icon/>Perhitungan
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  HomeIcon,
  AssignmentIcon,
  BookIcon,
  RecordIcon,
  ReportIcon,
  DateIcon
} from '@/svg/icons'
export default {
  name: 'NavSidebarTop',
  components: {
    HomeIcon,
    AssignmentIcon,
    BookIcon,
    RecordIcon,
    ReportIcon,
    DateIcon
  }
}
</script>
