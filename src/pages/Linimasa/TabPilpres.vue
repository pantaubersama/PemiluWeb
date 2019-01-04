<template>
  <div class="pilpres-content">
    <div class="card-list">
      <div class="group-tilte">
        <div class="group-thumb">
          <img src="@/assets/icon-group.png" alt>
        </div>
        <div class="group-name">
          <p>Disematkan dari Team Pemenangan Prabowo - Sandi</p>
        </div>
      </div>
      <div class="group-content">
        <div class="content-thumb">
          <div class="image-thumb">
            <img src="@/assets/trump.jpg" alt>
          </div>
          <div class="icon-thumb">
            <img src="@/assets/twitter-icon.png" alt>
          </div>
        </div>
        <div class="content-desc">
          <div class="title-desc">
            <h5>
              Adriana C. Ocampo Uria
              <span>@Toranta</span>.
              <span>5 des</span>
            </h5>
            <a
              href
              class="icon-setting"
              :class="{'is-active': isActive == 1}"
              @click.prevent="toggleDropdown(1, $event)"
            >
              <img src="@/assets/dots-icon.svg" alt>
            </a>
            <div class="dropdown-content">
              <ul>
                <li>
                  <a href>
                    <svg
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 24 24"
                      style="enable-background:new 0 0 24 24;"
                      xml:space="preserve"
                    >
                      <path
                        d="M13.2,10.7c1.3,1.3,1.3,3.4,0,4.7l-3.1,3.1c-1.3,1.3-3.4,1.3-4.7,0c-1.3-1.3-1.3-3.4,0-4.7l1.5-1.5l-1.3-1.5l-1.5,1.5
                          c-1,1-1.5,2.4-1.5,3.7c0,2.9,2.4,5.3,5.3,5.3l0,0c1.5,0,2.8-0.6,3.7-1.6l3.1-3.1c2.1-2.1,2.1-5.4,0-7.5L13.2,10.7z"
                      ></path>
                      <path
                        d="M20.6,3.6c-1.9-2.2-5.3-2.4-7.4-0.3l-3.1,2.9c-2.1,2.1-2.1,5.4,0,7.5l1.3-1.3c-1.3-1.3-1.3-3.4,0-4.7l3.1-2.9
                          c0.1-0.1,0.3-0.3,0.4-0.4c1.3-1.2,3.5-1,4.7,0.4c1.2,1.3,1,3.5-0.4,4.7L17.8,11l1.3,1.3l1.5-1.5C22.5,8.8,22.5,5.6,20.6,3.6z"
                      ></path>
                    </svg>
                    Salin Tautan
                  </a>
                </li>
                <li>
                  <a href>
                    <svg
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 24 24"
                      style="enable-background:new 0 0 24 24;"
                      xml:space="preserve"
                    >
                      <path
                        id="Path_695"
                        class="st0"
                        d="M18,16.1c-0.7,0-1.4,0.3-2,0.8l-7.1-4.2C9,12.5,9,12.2,9,12c0-0.2,0-0.5-0.1-0.7L16,7.2
                        c1.2,1.1,3.1,1,4.2-0.2s1-3.1-0.2-4.2s-3.1-1-4.2,0.2C15.3,3.5,15,4.2,15,5c0,0.2,0,0.5,0.1,0.7L8,9.8C6.8,8.7,4.9,8.7,3.8,9.9
                        s-1.1,3.1,0.1,4.2c1.2,1.1,2.9,1.1,4.1,0l7.1,4.2c-0.1,0.2-0.1,0.4-0.1,0.6c0,1.6,1.3,2.9,2.9,2.9s2.9-1.3,2.9-2.9
                        S19.6,16.1,18,16.1L18,16.1z M18,4c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S17.4,4,18,4z M6,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1
                        S6.6,13,6,13z M18,20c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S18.6,20,18,20z"
                      ></path>
                    </svg>
                    Bagikan
                  </a>
                </li>
                <li>
                  <a href>
                    <svg
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 24 24"
                      style="enable-background:new 0 0 24 24;"
                      xml:space="preserve"
                    >
                      <path
                        id="twitter"
                        class="st0"
                        d="M22.2,5.7c-1.3,0-1.3,0-1.4,0.1l0.8-2.1c0,0-2.3,0.9-2.9,1c-1.5-1.4-3.8-1.5-5.5-0.5
                        c-1.3,0.8-2,2.4-1.8,3.9C8.9,7.7,6.5,6.5,4.9,4.5L4.2,3.7L3.9,4.5c-0.5,1-0.6,2-0.5,3.1C3.5,8,3.6,8.5,3.7,8.9L3.4,8.6v0.8
                        c0,0.9,0.3,1.8,0.8,2.5c0.1,0.3,0.4,0.5,0.5,0.6H4.4l0.3,1c0.4,1.1,1.1,2,2.3,2.5c-1,0.5-1.9,0.8-3.3,1.1l-1.3,0.4l1.1,0.8
                        c1.1,0.6,2.4,1.1,3.6,1.3c3.5,0.5,7.4,0.1,10.1-2.3c2.1-2,3.1-4.9,2.8-7.9c0-0.4,0.1-0.9,0.4-1.3C20.8,7.6,22.2,5.7,22.2,5.7z
                        M19.5,7.6c-0.4,0.6-0.6,1.3-0.6,2c0.4,2.5-0.6,5.2-2.4,6.9c-2.1,1.9-5.4,2.5-9.2,2c-0.6-0.1-1.4-0.4-2-0.6c1.3-0.4,2.4-0.9,3.5-1.5
                        l2-1H8.6c-1,0-2-0.6-2.5-1.4c0.3,0,0.6-0.1,0.9-0.1l2.1-0.6L7,12.7c-0.9-0.3-1.5-0.6-2-1.4c-0.3-0.3-0.4-0.6-0.4-0.9
                        c0.3,0.1,0.6,0.1,0.9,0.1l2,0.3L5.9,9.5C4.7,8.6,4.2,7.2,4.6,5.9c2.1,2.3,5.2,3.5,8.2,3.5c0-0.4,0-0.6-0.1-1
                        c-0.4-1.1,0.1-2.5,1.3-3.1c1.3-0.8,3-0.6,4.2,0.4c0.3,0.3,0.6,0.4,1,0.3c0.3-0.1,0.5-0.1,0.8-0.3L19.3,7h0.5L19.5,7.6z"
                      ></path>
                    </svg>
                    Buka di Aplikasi Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="desc-text"
          >#SahabatBawaslu, Sentra Gakkumdu berkomitmen untuk tidak memunculkan sikap ego sektoral antar personil, baik dari pihak Bawaslu, Kepolisian, maupun Kejaksaan dalam menegakkan hukum Pemilu dalam Rapat Koordinasi Nasional Sentra Gakkumdu, di Jakarta, Rabu, (5/12/2018).</div>
        </div>
      </div>
    </div>
    <div class="card-list">
      <div class="group-tilte">
        <div class="group-thumb">
          <img src="@/assets/icon-group.png" alt>
        </div>
        <div class="group-name">
          <p>Disematkan dari Team Pemenangan Prabowo - Sandi</p>
        </div>
      </div>
      <div class="group-content">
        <div class="content-thumb">
          <div class="image-thumb">
            <img src="@/assets/trump.jpg" alt>
          </div>
          <div class="icon-thumb">
            <img src="@/assets/twitter-icon.png" alt>
          </div>
        </div>
        <div class="content-desc">
          <div class="title-desc">
            <h5>
              Adriana C. Ocampo Uria
              <span>@Toranta</span>.
              <span>5 des</span>
            </h5>
            <a
              href
              class="icon-setting"
              :class="{'is-active': isActive == 2}"
              @click.prevent="toggleDropdown(2, $event)"
            >
              <img src="@/assets/dots-icon.svg" alt>
            </a>
            <div class="dropdown-content">
              <ul>
                <li>
                  <a href>
                    <svg
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 24 24"
                      style="enable-background:new 0 0 24 24;"
                      xml:space="preserve"
                    >
                      <path
                        d="M13,10.9c1.3,1.3,1.3,3.3,0,4.6l-3,3c-1.3,1.3-3.3,1.3-4.6,0s-1.3-3.3,0-4.6l1.4-1.4l-1.3-1.4l-1.4,1.4
                        c-1,1-1.4,2.3-1.4,3.6c0,2.8,2.3,5.1,5.1,5.1l0,0c1.4,0,2.7-0.6,3.6-1.6l3-3c2-2,2-5.3,0-7.3L13,10.9z"
                      ></path>
                      <path
                        d="M20.1,4.1C18.2,2,15,1.8,13,3.8l-3,2.8c-2,2-2,5.3,0,7.3l1.3-1.3c-1.3-1.3-1.3-3.3,0-4.6l3-2.8c0.1-0.1,0.3-0.3,0.4-0.4
                        c1.3-1.1,3.4-1,4.6,0.4c1.1,1.3,1,3.4-0.4,4.6l-1.4,1.4l1.3,1.3l1.4-1.4C21.9,9.1,21.9,5.9,20.1,4.1z"
                      ></path>
                    </svg>
                    Salin Tautan
                  </a>
                </li>
                <li>
                  <a href>
                    <svg
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 24 24"
                      style="enable-background:new 0 0 24 24;"
                      xml:space="preserve"
                    >
                      <path
                        id="Path_695"
                        class="st0"
                        d="M18,16.1c-0.7,0-1.4,0.3-2,0.8l-7.1-4.2C9,12.5,9,12.2,9,12c0-0.2,0-0.5-0.1-0.7L16,7.2
                        c1.2,1.1,3.1,1,4.2-0.2s1-3.1-0.2-4.2s-3.1-1-4.2,0.2C15.3,3.5,15,4.2,15,5c0,0.2,0,0.5,0.1,0.7L8,9.8C6.8,8.7,4.9,8.7,3.8,9.9
                        s-1.1,3.1,0.1,4.2c1.2,1.1,2.9,1.1,4.1,0l7.1,4.2c-0.1,0.2-0.1,0.4-0.1,0.6c0,1.6,1.3,2.9,2.9,2.9s2.9-1.3,2.9-2.9
                        S19.6,16.1,18,16.1L18,16.1z M18,4c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S17.4,4,18,4z M6,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1
                        S6.6,13,6,13z M18,20c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S18.6,20,18,20z"
                      ></path>
                    </svg>
                    Bagikan
                  </a>
                </li>
                <li>
                  <a href>
                    <svg
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 24 24"
                      style="enable-background:new 0 0 24 24;"
                      xml:space="preserve"
                    >
                      <path
                        id="twitter"
                        class="st0"
                        d="M22.2,5.7c-1.3,0-1.3,0-1.4,0.1l0.8-2.1c0,0-2.3,0.9-2.9,1c-1.5-1.4-3.8-1.5-5.5-0.5
                        c-1.3,0.8-2,2.4-1.8,3.9C8.9,7.7,6.5,6.5,4.9,4.5L4.2,3.7L3.9,4.5c-0.5,1-0.6,2-0.5,3.1C3.5,8,3.6,8.5,3.7,8.9L3.4,8.6v0.8
                        c0,0.9,0.3,1.8,0.8,2.5c0.1,0.3,0.4,0.5,0.5,0.6H4.4l0.3,1c0.4,1.1,1.1,2,2.3,2.5c-1,0.5-1.9,0.8-3.3,1.1l-1.3,0.4l1.1,0.8
                        c1.1,0.6,2.4,1.1,3.6,1.3c3.5,0.5,7.4,0.1,10.1-2.3c2.1-2,3.1-4.9,2.8-7.9c0-0.4,0.1-0.9,0.4-1.3C20.8,7.6,22.2,5.7,22.2,5.7z
                        M19.5,7.6c-0.4,0.6-0.6,1.3-0.6,2c0.4,2.5-0.6,5.2-2.4,6.9c-2.1,1.9-5.4,2.5-9.2,2c-0.6-0.1-1.4-0.4-2-0.6c1.3-0.4,2.4-0.9,3.5-1.5
                        l2-1H8.6c-1,0-2-0.6-2.5-1.4c0.3,0,0.6-0.1,0.9-0.1l2.1-0.6L7,12.7c-0.9-0.3-1.5-0.6-2-1.4c-0.3-0.3-0.4-0.6-0.4-0.9
                        c0.3,0.1,0.6,0.1,0.9,0.1l2,0.3L5.9,9.5C4.7,8.6,4.2,7.2,4.6,5.9c2.1,2.3,5.2,3.5,8.2,3.5c0-0.4,0-0.6-0.1-1
                        c-0.4-1.1,0.1-2.5,1.3-3.1c1.3-0.8,3-0.6,4.2,0.4c0.3,0.3,0.6,0.4,1,0.3c0.3-0.1,0.5-0.1,0.8-0.3L19.3,7h0.5L19.5,7.6z"
                      ></path>
                    </svg>
                    Buka di Aplikasi Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="desc-text">
            The @Tesla Gigafactory’s economic impact on Nevada has exceeded projections, bringing in more than 7K jobs and $6B in capital investment, according to a new economic impact.
            <img
              src="@/assets/image-desc-pilpres.png"
              alt
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabPilpress',
  data() {
    return {
      isActive: false
    }
  },
  created() {
    window.addEventListener('click', this.removeDropdown)
  },
  methods: {
    toggleDropdown(el, event) {
      var toggleClick =
        event.target.classList.contains('is-active') ||
        event.target.parentNode.classList.contains('is-active')
      this.isActive = el
      if (toggleClick) {
        this.isActive = false
      }
    },
    removeDropdown(event) {
      var isClickOutside =
        !event.target.classList.contains('icon-setting') &&
        !event.target.parentNode.classList.contains('icon-setting')
      if (isClickOutside) {
        this.isActive = 0
      }
    }
  }
}
</script>
