<template>
  <div class="card-jp">
    <div class="create-post">
      <div class="card-content">
        <div class="top">
        <div class="avatar"><a href=""><img src="@/assets/user.svg"></a></div>
        <h5>Anik Kemala</h5>
        </div>
        <h4 class="title">Publikasi kembali Janji Politik?</h4>
      </div>
    </div>
    <div class="card-content">
      <div class="top">
        <div class="avatar">
          <a href=""><img src="@/assets/user.svg"></a>
        </div>
        <h5>Anik Kemala, <span>Cluster Partai Kuning Ceria</span></h5>
        <span class="right">8 days ago</span>
      </div>
      <router-link :to="{name: 'LinimasaDetail', params: {id: 1}}">
        <h4 class="title">Prabowo Menjanjikan Dana 1T Untuk Setiap Desa yang memiliki UMKM</h4>
      </router-link>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchang</p>
      <span class="icon-right">
        <a href=""><img src="@/assets/icon_share.svg"></a>
        <a href="" class="icon-setting" :class="{'is-active': isActive == 1}" @click.prevent="toggleDropdown(1, $event)">
          <img src="@/assets/dots-icon.svg" alt="">
        </a>
        <div class="dropdown-content" >
          <ul>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path id="Path_1522" class="st0" d="M11.9,2.8C7,2.8,3,6.8,3,11.7s4,8.9,8.9,8.9s8.9-4,8.9-8.9l0,0C20.8,6.8,16.8,2.8,11.9,2.8z
                  M11.9,18.8c-3.9,0-7.1-3.2-7.1-7.1S8,4.6,11.9,4.6S19,7.8,19,11.7l0,0C19,15.6,15.8,18.8,11.9,18.8z"/>
                <path id="Path_1523" class="st0" d="M14.7,7.5l-2.9,2.9L8.8,7.5L7.6,8.8l2.9,2.9l-2.9,2.9l1.3,1.3l2.9-2.9l2.9,2.9l1.3-1.3L13,11.7
                  l2.9-2.9L14.7,7.5z"/>
                </svg>
                Hapus
              </a>
            </li>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                  <path d="M13.2,10.7c1.3,1.3,1.3,3.4,0,4.7l-3.1,3.1c-1.3,1.3-3.4,1.3-4.7,0c-1.3-1.3-1.3-3.4,0-4.7l1.5-1.5l-1.3-1.5l-1.5,1.5
                    c-1,1-1.5,2.4-1.5,3.7c0,2.9,2.4,5.3,5.3,5.3l0,0c1.5,0,2.8-0.6,3.7-1.6l3.1-3.1c2.1-2.1,2.1-5.4,0-7.5L13.2,10.7z"/>
                  <path d="M20.6,3.6c-1.9-2.2-5.3-2.4-7.4-0.3l-3.1,2.9c-2.1,2.1-2.1,5.4,0,7.5l1.3-1.3c-1.3-1.3-1.3-3.4,0-4.7l3.1-2.9
                    c0.1-0.1,0.3-0.3,0.4-0.4c1.3-1.2,3.5-1,4.7,0.4c1.2,1.3,1,3.5-0.4,4.7L17.8,11l1.3,1.3l1.5-1.5C22.5,8.8,22.5,5.6,20.6,3.6z"/>
                </svg>
                Salin Tautan</a>
            </li>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path id="Path_695" class="st0" d="M18,16.1c-0.7,0-1.4,0.3-2,0.8l-7.1-4.2C9,12.5,9,12.2,9,12c0-0.2,0-0.5-0.1-0.7L16,7.2
                  c1.2,1.1,3.1,1,4.2-0.2s1-3.1-0.2-4.2s-3.1-1-4.2,0.2C15.3,3.5,15,4.2,15,5c0,0.2,0,0.5,0.1,0.7L8,9.8C6.8,8.7,4.9,8.7,3.8,9.9
                  s-1.1,3.1,0.1,4.2c1.2,1.1,2.9,1.1,4.1,0l7.1,4.2c-0.1,0.2-0.1,0.4-0.1,0.6c0,1.6,1.3,2.9,2.9,2.9s2.9-1.3,2.9-2.9
                  S19.6,16.1,18,16.1L18,16.1z M18,4c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S17.4,4,18,4z M6,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1
                  S6.6,13,6,13z M18,20c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S18.6,20,18,20z"/>
                </svg>
                Bagikan</a>
            </li>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path d="M15.6,2.8H8.2L3,8v7.3l5.2,5.2h7.3l5.2-5.2V8L15.6,2.8z M18.8,14.5l-4,4H9.1l-4-4V8.8l4-4h5.7l4,4V14.5z"/>
                <circle id="Ellipse_11" cx="11.9" cy="15.6" r="1"/>
                <path id="Path_832" d="M10.9,6.7h2v6.9h-2V6.7z"/>
                </svg>
                Laporkan
              </a>
            </li>
          </ul>
        </div>
      </span>
    </div>
    <div class="card-content">
      <div class="top">
      <div class="avatar"><a href=""><img src="@/assets/user.svg"></a></div>
      <h5>Anik Kemala, <span>Cluster Partai Kuning Ceria</span></h5>
      <span class="right">8 days ago</span>
      </div>
      <h4 class="title">Prabowo Menjanjikan Dana 1T Untuk Setiap Desa yang memiliki UMKM  </h4>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchang</p>
      <span class="icon-right">
        <a href=""><img src="@/assets/icon_share.svg"></a>
        <a href="" class="icon-setting" :class="{'is-active': isActive == 2}" @click.prevent="toggleDropdown(2, $event)">
          <img src="@/assets/dots-icon.svg" alt="">
        </a>
        <div class="dropdown-content" >
          <ul>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path id="Path_1522" class="st0" d="M11.9,2.8C7,2.8,3,6.8,3,11.7s4,8.9,8.9,8.9s8.9-4,8.9-8.9l0,0C20.8,6.8,16.8,2.8,11.9,2.8z
                  M11.9,18.8c-3.9,0-7.1-3.2-7.1-7.1S8,4.6,11.9,4.6S19,7.8,19,11.7l0,0C19,15.6,15.8,18.8,11.9,18.8z"/>
                <path id="Path_1523" class="st0" d="M14.7,7.5l-2.9,2.9L8.8,7.5L7.6,8.8l2.9,2.9l-2.9,2.9l1.3,1.3l2.9-2.9l2.9,2.9l1.3-1.3L13,11.7
                  l2.9-2.9L14.7,7.5z"/>
                </svg>
                Hapus
              </a>
            </li>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                  <path d="M13.2,10.7c1.3,1.3,1.3,3.4,0,4.7l-3.1,3.1c-1.3,1.3-3.4,1.3-4.7,0c-1.3-1.3-1.3-3.4,0-4.7l1.5-1.5l-1.3-1.5l-1.5,1.5
                    c-1,1-1.5,2.4-1.5,3.7c0,2.9,2.4,5.3,5.3,5.3l0,0c1.5,0,2.8-0.6,3.7-1.6l3.1-3.1c2.1-2.1,2.1-5.4,0-7.5L13.2,10.7z"/>
                  <path d="M20.6,3.6c-1.9-2.2-5.3-2.4-7.4-0.3l-3.1,2.9c-2.1,2.1-2.1,5.4,0,7.5l1.3-1.3c-1.3-1.3-1.3-3.4,0-4.7l3.1-2.9
                    c0.1-0.1,0.3-0.3,0.4-0.4c1.3-1.2,3.5-1,4.7,0.4c1.2,1.3,1,3.5-0.4,4.7L17.8,11l1.3,1.3l1.5-1.5C22.5,8.8,22.5,5.6,20.6,3.6z"/>
                </svg>
                Salin Tautan</a>
            </li>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path id="Path_695" class="st0" d="M18,16.1c-0.7,0-1.4,0.3-2,0.8l-7.1-4.2C9,12.5,9,12.2,9,12c0-0.2,0-0.5-0.1-0.7L16,7.2
                  c1.2,1.1,3.1,1,4.2-0.2s1-3.1-0.2-4.2s-3.1-1-4.2,0.2C15.3,3.5,15,4.2,15,5c0,0.2,0,0.5,0.1,0.7L8,9.8C6.8,8.7,4.9,8.7,3.8,9.9
                  s-1.1,3.1,0.1,4.2c1.2,1.1,2.9,1.1,4.1,0l7.1,4.2c-0.1,0.2-0.1,0.4-0.1,0.6c0,1.6,1.3,2.9,2.9,2.9s2.9-1.3,2.9-2.9
                  S19.6,16.1,18,16.1L18,16.1z M18,4c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S17.4,4,18,4z M6,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1
                  S6.6,13,6,13z M18,20c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S18.6,20,18,20z"/>
                </svg>
                Bagikan</a>
            </li>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path d="M15.6,2.8H8.2L3,8v7.3l5.2,5.2h7.3l5.2-5.2V8L15.6,2.8z M18.8,14.5l-4,4H9.1l-4-4V8.8l4-4h5.7l4,4V14.5z"/>
                <circle id="Ellipse_11" cx="11.9" cy="15.6" r="1"/>
                <path id="Path_832" d="M10.9,6.7h2v6.9h-2V6.7z"/>
                </svg>
                Laporkan
              </a>
            </li>
          </ul>
        </div>
      </span>
    </div>
    <div class="card-content">
      <div class="top">
      <div class="avatar"><a href=""><img src="@/assets/user.svg"></a></div>
      <h5>Anik Kemala, <span>Cluster Partai Kuning Ceria</span></h5>
      <span class="right">8 days ago</span>
      </div>
      <h4 class="title">Prabowo Menjanjikan Dana 1T Untuk Setiap Desa yang memiliki UMKM  </h4>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchang</p>
      <span class="icon-right">
        <a href=""><img src="@/assets/icon_share.svg"></a>
        <a href="" class="icon-setting" :class="{'is-active': isActive == 3}" @click.prevent="toggleDropdown(3, $event)">
          <img src="@/assets/dots-icon.svg" alt="">
        </a>
        <div class="dropdown-content" >
          <ul>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path id="Path_1522" class="st0" d="M11.9,2.8C7,2.8,3,6.8,3,11.7s4,8.9,8.9,8.9s8.9-4,8.9-8.9l0,0C20.8,6.8,16.8,2.8,11.9,2.8z
                  M11.9,18.8c-3.9,0-7.1-3.2-7.1-7.1S8,4.6,11.9,4.6S19,7.8,19,11.7l0,0C19,15.6,15.8,18.8,11.9,18.8z"/>
                <path id="Path_1523" class="st0" d="M14.7,7.5l-2.9,2.9L8.8,7.5L7.6,8.8l2.9,2.9l-2.9,2.9l1.3,1.3l2.9-2.9l2.9,2.9l1.3-1.3L13,11.7
                  l2.9-2.9L14.7,7.5z"/>
                </svg>
                Hapus
              </a>
            </li>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                  <path d="M13.2,10.7c1.3,1.3,1.3,3.4,0,4.7l-3.1,3.1c-1.3,1.3-3.4,1.3-4.7,0c-1.3-1.3-1.3-3.4,0-4.7l1.5-1.5l-1.3-1.5l-1.5,1.5
                    c-1,1-1.5,2.4-1.5,3.7c0,2.9,2.4,5.3,5.3,5.3l0,0c1.5,0,2.8-0.6,3.7-1.6l3.1-3.1c2.1-2.1,2.1-5.4,0-7.5L13.2,10.7z"/>
                  <path d="M20.6,3.6c-1.9-2.2-5.3-2.4-7.4-0.3l-3.1,2.9c-2.1,2.1-2.1,5.4,0,7.5l1.3-1.3c-1.3-1.3-1.3-3.4,0-4.7l3.1-2.9
                    c0.1-0.1,0.3-0.3,0.4-0.4c1.3-1.2,3.5-1,4.7,0.4c1.2,1.3,1,3.5-0.4,4.7L17.8,11l1.3,1.3l1.5-1.5C22.5,8.8,22.5,5.6,20.6,3.6z"/>
                </svg>
                Salin Tautan</a>
            </li>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path id="Path_695" class="st0" d="M18,16.1c-0.7,0-1.4,0.3-2,0.8l-7.1-4.2C9,12.5,9,12.2,9,12c0-0.2,0-0.5-0.1-0.7L16,7.2
                  c1.2,1.1,3.1,1,4.2-0.2s1-3.1-0.2-4.2s-3.1-1-4.2,0.2C15.3,3.5,15,4.2,15,5c0,0.2,0,0.5,0.1,0.7L8,9.8C6.8,8.7,4.9,8.7,3.8,9.9
                  s-1.1,3.1,0.1,4.2c1.2,1.1,2.9,1.1,4.1,0l7.1,4.2c-0.1,0.2-0.1,0.4-0.1,0.6c0,1.6,1.3,2.9,2.9,2.9s2.9-1.3,2.9-2.9
                  S19.6,16.1,18,16.1L18,16.1z M18,4c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S17.4,4,18,4z M6,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1
                  S6.6,13,6,13z M18,20c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S18.6,20,18,20z"/>
                </svg>
                Bagikan</a>
            </li>
            <li>
              <a href="">
                <svg version="1.1" id="Layer_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path d="M15.6,2.8H8.2L3,8v7.3l5.2,5.2h7.3l5.2-5.2V8L15.6,2.8z M18.8,14.5l-4,4H9.1l-4-4V8.8l4-4h5.7l4,4V14.5z"/>
                <circle id="Ellipse_11" cx="11.9" cy="15.6" r="1"/>
                <path id="Path_832" d="M10.9,6.7h2v6.9h-2V6.7z"/>
                </svg>
                Laporkan
              </a>
            </li>
          </ul>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabJP',
  data () {
    return {
      isActive: false
    }
  },
  created () {
    window.addEventListener('click', this.removeDropdown)
  },
   methods: {
    toggleDropdown (el, event) {
      var toggleClick = event.target.classList.contains('is-active') || event.target.parentNode.classList.contains('is-active')
      this.isActive = el
      if (toggleClick){
        this.isActive = false
      }
    },
    removeDropdown (event) {
      var isClickOutside = !event.target.classList.contains('icon-setting') && !event.target.parentNode.classList.contains('icon-setting')
      if (isClickOutside) {
        this.isActive = 0
      }
    }
  }
}
</script>
