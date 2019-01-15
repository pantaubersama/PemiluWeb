<template>
  <div class="pilpres-content">
    <div class="card-list" v-for="item in data" :key="item.id">
      <div class="group-tilte">
        <div class="group-thumb">
          <img :src="item.team.avatar || '@/assets/icon-group.png'" alt="team">
        </div>
        <div class="group-name">
          <p>Disematkan dari Team Pemenangan {{ item.team.title }}</p>
        </div>
      </div>
      <div class="group-content">
        <div class="content-thumb">
          <div class="image-thumb">
            <img :src="item.account.profile_image_url" alt="avatar">
          </div>
          <div class="icon-thumb">
            <img src="@/assets/icon-twitter-rounded.svg" alt>
          </div>
        </div>
        <div class="content-desc">
          <div class="title-desc">
            <h5>
              {{ item.account.name }}
              <span>{{ `@${item.account.name}` }}</span>.
              <span>{{ item.created_at_in_word.id }}</span>
            </h5>
            <a
              href
              class="icon-setting"
              :class="{'is-active': isActive == item.id}"
              @click.prevent="toggleDropdown(item.id, $event)"
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
            <p v-html="item.source.text"></p>
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
  props: {
    data: {
      type: Array,
      required: true
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
