<template>
  <div class="card card-pilpres">
    <h4 class="title">Linimasa</h4>
    <div class="pilpres-content">
      <div v-if="feedsPilpres">
        <div class="card-list" v-for="pilpres in feedsPilpres" :key="pilpres.id">
          <div class="group-tilte">
            <div class="group-thumb">
              <img
                v-if="pilpres.team.avatar != null"
                :src="pilpres.team.avatar"
                :alt="pilpres.team.title"
              >
              <img v-else src="@/assets/icon-group.png" alt>
            </div>
            <div class="group-name">
              <p>Disematkan dari {{pilpres.team.title}}</p>
            </div>
          </div>
          <div class="group-content">
            <div class="content-thumb">
              <div class="image-thumb">
                <img
                  v-if="pilpres.account.profile_image_url != null"
                  :src="pilpres.account.profile_image_url"
                  :alt="pilpres.account.username"
                >
                <img v-else src="@/assets/user.svg" alt>
              </div>
              <div class="icon-thumb">
                <img src="@/assets/icon-twitter-rounded.svg" alt>
              </div>
            </div>
            <div class="content-desc">
              <div class="title-desc">
                <h5>
                  {{pilpres.account.name}}
                  <span>@{{pilpres.account.username}}</span>
                  <span>.</span>
                  <span>{{ pilpres.created_at_in_word.id }}</span>
                </h5>
              </div>
              <div class="desc-text">
                <p v-html="pilpres.source.text"></p>
              </div>
            </div>
            <div class="content-action action-img">
              <a
                href
                class="icon-setting"
                :class="{'is-active': isActive == pilpres.id}"
                @click.prevent="toggleDropdown(pilpres.id, $event)"
              >
                <img class="icon-dots" src="@/assets/dots-icon.svg" alt>
              </a>
              <div class="dropdown-content">
                <ul>
                  <li>
                    <a
                      href="javascript:void(0)"
                      @click.stop="openTwitter('https://twitter.com/' + pilpres.account.username + '/status/' + pilpres.source.id )"
                    >
                      <sosmed-twitter-icon/>Buka di Web Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loadingAnimating">
        <ContentLoader/>
      </div>
      <router-link
        to="/linimasa"
        class="load-more"
        v-if="!paginations.isLast"
      >Tampilkan lebih banyak
        <div class="arrow-icon">
          <bottom-arrow/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import ContentLoader from '@/components/Loading/ContentLoader'
import {
  BottomArrow,
  IconDots,
  LinkIcon,
  SosmedTwitterIcon,
  ShareIcon
} from '@/svg/icons'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'CardPilpress',
  components: {
    BottomArrow,
    IconDots,
    LinkIcon,
    SosmedTwitterIcon,
    ShareIcon,
    ContentLoader
  },
  data() {
    return {
      isActive: false,
      shareId: ''
    }
  },

  computed: {
    ...mapState('homePilpres', ['feedsPilpres', 'paginations']),
    ...mapState('loadingLottie', ['loadingAnimating'])
  },
  created() {
    this.$store.dispatch('homePilpres/homePilpres')
    window.addEventListener('click', this.removeDropdown)
  },
  methods: {
    loadMore() {
      if (this.paginations.isLast === false) {
        this.$store.dispatch('homePilpres/nextPage')
        this.$store.dispatch('homePilpres/updateHomePilpres')
      }
    },
    openTwitter(url) {
      window.open(url, '_blank')
      this.isActive = false
    },
    toggleDropdown(el, event) {
      var toggleClick =
        event.target.classList.contains('icon-dots') &&
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
