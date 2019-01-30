<template>
  <div class="profile-page">
    <LayoutTimeline>
      <template slot="main-content">
        <modal-share v-if="isModalOpened" :url="modalShareURL" @close="isModalOpened = false"></modal-share>
        <div class="list-badge">
          <div class="title">List Badge</div>
          <div class="list-content">
            <div class="list-item" v-for="badge in badges" :key="badge.id">
              <img :src="badge.image.url">
              <div class="list-content-desc">
                <div class="list-desc">
                  <p>{{badge.name}}</p>
                  <div class="sub-text">{{badge.description || '-'}}</div>
                </div>
                <a
                  href="javascript:void(0)"
                  class="icon-share"
                  @click="share(`/profile/badge-detail/${badge.id}`)"
                >
                  <icon-share/>
                </a>
              </div>
            </div>
          </div>
          <div class="list-content" v-if="badges.length <= 0">
            <div class="list-item">
              <img src="@/assets/flag-star-1.png">
              <div class="list-content-desc">
                <div class="list-desc">
                  <p>KADET</p>
                  <div class="sub-text">Ikut Kuis Pendidikan Pertama Kali</div>
                </div>
                <router-link class="icon-share" to="/profile/badge-detail">
                  <icon-share/>
                </router-link>
              </div>
            </div>
            <div class="list-item">
              <img src="@/assets/flag-star-3.png">
              <div class="list-content-desc">
                <div class="list-desc">
                  <p>VETERAN</p>
                  <div class="sub-text">Misi Ikut Kuis Pendidikan 10 X</div>
                </div>
                <div class="icon-share">
                  <icon-share/>
                </div>
              </div>
            </div>
            <div class="list-item">
              <img src="@/assets/finger-star-1.png">
              <div class="list-content-desc">
                <div class="list-desc">
                  <p>KEPO</p>
                  <div class="sub-text">Ikut Tanya Calon Presiden Pertama Kali</div>
                </div>
                <div class="icon-share">
                  <icon-share/>
                </div>
              </div>
            </div>
            <div class="list-item disabled">
              <img src="@/assets/finger-star-1.png">
              <div class="list-content-desc">
                <div class="list-desc">
                  <p>KEPO</p>
                  <div class="sub-text">Ikut Tanya Calon Presiden Pertama Kali</div>
                </div>
              </div>
            </div>
            <div class="list-item disabled">
              <img src="@/assets/finger-star-1.png">
              <div class="list-content-desc">
                <div class="list-desc">
                  <p>KEPO</p>
                  <div class="sub-text">Ikut Tanya Calon Presiden Pertama Kali</div>
                </div>
              </div>
            </div>
            <div class="list-item disabled">
              <img src="@/assets/finger-star-1.png">
              <div class="list-content-desc">
                <div class="list-desc">
                  <p>KEPO</p>
                  <div class="sub-text">Ikut Tanya Calon Presiden Pertama Kali</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="widget-wrapper">
        <div class="d-none d-lg-block">&nbsp;</div>
      </template>
    </LayoutTimeline>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { IconShare } from '@/svg/icons'
import LayoutTimeline from '@/layout/Timeline'
import ModalShare from '@/components/modal-share'
export default {
  name: 'ProfileBadge',
  components: {
    LayoutTimeline,
    IconShare,
    ModalShare
  },
  data() {
    return {
      isModalOpened: false,
      modalShareURL: null
    }
  },
  computed: {
    ...mapState({
      badges: s => s.profile.listBadges
    })
  },
  mounted() {
    this.$store.dispatch('profile/listBadges')
  },
  methods: {
    share(url) {
      this.modalShareURL = url
      this.isModalOpened = true
    }
  }
}
</script>
