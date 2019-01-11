<template>
  <div class="card card-pilpres">
    <h4 class="title">Pilpres</h4>
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
              <a href class="icon-setting">
                <icon-dots/>
              </a>
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
              <a href class="icon-setting">
                <icon-dots/>
              </a>
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
      <div class="load-more">Tampilkan lebih banyak
        <div class="arrow-icon">
          <bottom-arrow/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BottomArrow, IconDots } from '@/svg/icons'
export default {
  name: 'CardPilpress',
  components: {
    BottomArrow,
    IconDots
  }
}
</script>
