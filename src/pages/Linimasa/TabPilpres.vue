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
            <img src="@/assets/icon-twitter-rounded.svg" alt>
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
                    <link-icon/>Salin Tautan
                  </a>
                </li>
                <li>
                  <a href>
                    <share-icon/>Bagikan
                  </a>
                </li>
                <li>
                  <a href>
                    <sosmed-twitter-icon/>Buka di Aplikasi Twitter
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
            <img src="@/assets/icon-twitter-rounded.svg" alt>
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
                    <link-icon/>Salin Tautan
                  </a>
                </li>
                <li>
                  <a href>
                    <share-icon/>Bagikan
                  </a>
                </li>
                <li>
                  <a href>
                    <sosmed-twitter-icon/>Buka di Aplikasi Twitter
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
import { LinkIcon, SosmedTwitterIcon, ShareIcon } from '@/svg/icons'
export default {
  name: 'TabPilpress',
  data() {
    return {
      isActive: false
    }
  },
  components: {
    LinkIcon,
    SosmedTwitterIcon,
    ShareIcon
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
