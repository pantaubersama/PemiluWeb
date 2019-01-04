<template>
  <div class="nav-top">
    <ul>
      <li>
        <router-link to="/" exact>
          <!-- <svg version="1.1" id="baseline-home-48px" x="0px" y="0px" viewBox="0 0 24 21.3" style="enable-background:new 0 0 24 21.3;" xml:space="preserve">
          <path id="Path_1717" class="st0" d="M9.7,20.6v-6.9h4.6v6.9h5.8v-9.3h3.5L12,0.9L0.4,11.3h3.5v9.3L9.7,20.6z"/>
          </svg>-->
          Beranda
        </router-link>
      </li>

      <li>
        <router-link to="/linimasa">
          <!-- <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
            <path id="Path_32" class="st0" d="M3.5,5.6H1.4v14.8c0,1.2,0.9,2.1,2.1,2.1h14.8v-2.1H3.5V5.6z M20.5,1.4H7.8c-1.2,0-2.1,1-2.1,2.1
              v12.7c0,1.2,1,2.1,2.1,2.1h12.7c1.2,0,2.1-1,2.1-2.1V3.5C22.6,2.4,21.6,1.4,20.5,1.4z M19.4,10.9H8.8V8.8h10.6L19.4,10.9z
              M15.2,15.2H8.8v-2.1h6.4V15.2z M19.4,6.7H8.8V4.6h10.6L19.4,6.7z"/>
          </svg>-->
          Linimasa
        </router-link>
      </li>

      <li>
        <router-link to="/pendidikan-politik">
          <!-- <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
            <path class="st0" d="M2,7v12h1c3,0,6.7,1.9,8,2.6V9.3C9.1,8.4,5.9,7,3,7H2z"/>
            <circle class="st0" cx="12" cy="5" r="3"/>
            <path class="st0" d="M21,7c-2.9,0-6.1,1.4-8,2.3v12.3c1.3-0.7,5-2.6,8-2.6h1V7H21z"/>
          </svg>-->
          Pendidikan Politik
        </router-link>
      </li>

      <li>
        <router-link to="/wordstadium">
          <!-- <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
            <path id="Path_39" class="st0" d="M9,15c-2.7,0-8,1.3-8,4v2h16v-2C17,16.3,11.7,15,9,15z M16.8,5.4L15.1,7c0.8,1.2,0.8,2.7,0,3.9
              l1.7,1.7C18.8,10.6,18.8,7.4,16.8,5.4C16.8,5.4,16.8,5.4,16.8,5.4z M20.1,2l-1.6,1.6c2.8,3,2.8,7.7,0,10.7l1.6,1.6
              c3.9-3.8,3.9-10,0.1-13.9C20.1,2.1,20.1,2,20.1,2z"/>
            <circle id="Ellipse_2" class="st0" cx="9" cy="9" r="4"/>
          </svg>-->
          Wordstadium
        </router-link>
      </li>

      <li>
        <router-link to="/lapor">
          <!-- <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
            <path id="Path_14" class="st0" d="M19.5,2.9H15c-0.6-1.7-2.5-2.5-4.1-1.9C10,1.3,9.3,2,9,2.9H4.5C3.4,2.9,2.4,3.8,2.4,5v14.6
              c0,1.2,1,2.1,2.1,2.1h14.9c1.2,0,2.1-0.9,2.1-2.1V5C21.6,3.8,20.6,2.9,19.5,2.9z M12,2.9c0.6,0,1,0.5,1,1.1c0,0.6-0.5,1-1.1,1
              c-0.6,0-1-0.5-1-1C10.9,3.3,11.4,2.9,12,2.9z M14.1,17.4H6.7v-2.1h7.5L14.1,17.4z M17.3,13.3H6.7v-2.1h10.7V13.3z M17.3,9.1H6.7V7
              h10.7V9.1z"/>
          </svg>-->
          Lapor
        </router-link>
      </li>

      <li>
        <router-link to="/perhitungan">
          <!-- <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
            <path id="Path_22" class="st0" d="M16.5,11.1L15.5,10l-4.9,4.9l-2.1-2.1l-1.1,1.1l3.2,3.2C10.6,17,16.5,11.1,16.5,11.1z M19,3h-1V1
              h-2v2H8V1H6v2H5C3.9,3,3,3.9,3,5c0,0,0,0,0,0l0,14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V8h14V19z"/>
          </svg>-->
          Perhitungan
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavSidebarTop'
}
</script>
