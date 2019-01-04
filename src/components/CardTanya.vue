<template>
  <div class="card card-tanya">
    <h4 class="title">Tanya</h4>
    <div class="tanya-content">
      <div class="card-list">
        <div class="group-content">
          <div class="content-count">
            <div class="icon-count">
              <img src="@/assets/arrow-top.png" alt>
            </div>
            <div class="total-count">100</div>
          </div>
          <div class="content-desc">
            <div class="title-desc">
              <div class="title-thumb">
                <img src="@/assets/trump.jpg" alt>
              </div>
              <div class="title-center">
                <h5>Ariel Tatum Similikiti,</h5>
                <p>Kapan Kemana Indonesia?</p>
              </div>
              <div class="title-right">8 days ago</div>
            </div>
            <div
              class="desc-text"
            >Kapan realisasi penghapusan system tenaga kerja alih daya diterapkan seutuhnya? Kita ini insan bukan seekor sapi!</div>
            <div class="desc-icon">
              <a href>
                <img src="@/assets/icon_share.svg">
              </a>
              <a href class="icon-setting">
                <icon-dots/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="card-list">
        <div class="group-content">
          <div class="content-count">
            <div class="icon-count">
              <img src="@/assets/arrow-top-red.png" alt>
            </div>
            <div class="total-count">100</div>
          </div>
          <div class="content-desc">
            <div class="title-desc">
              <div class="title-thumb">
                <img src="@/assets/trump.jpg" alt>
              </div>
              <div class="title-center">
                <h5>Ariel Tatum Similikiti,</h5>
                <p>Kapan Kemana Indonesia?</p>
              </div>
              <div class="title-right">8 days ago</div>
            </div>
            <div
              class="desc-text"
            >Kapan realisasi penghapusan system tenaga kerja alih daya diterapkan seutuhnya? Kita ini insan bukan seekor sapi!</div>
            <div class="desc-icon">
              <a href>
                <img src="@/assets/icon_share.svg">
              </a>
              <a href class="icon-setting">
                <icon-dots/>
              </a>
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
  name: 'CardTanya',
  components: {
    BottomArrow,
    IconDots
  }
}
</script>
