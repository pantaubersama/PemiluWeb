<template>
  <LayoutTimeline>
    <template slot="main-content">
      <div class="list-badge">
        <div class="title">List Badge</div>
        <div class="list-content">
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
    <template slot="widget-wrapper">&nbsp;</template>
  </LayoutTimeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import { IconShare } from '@/svg/icons'
export default {
  name: 'ProfileBadge',
  components: {
    LayoutTimeline,
    IconShare
  }
}
</script>
