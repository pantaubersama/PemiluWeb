<template>
  <div>
    <div class="card card-data transparent">
      <div class="title">{{title}}</div>
      <div class="content-sub">
        <div class="sub-title">{{sub_title}}</div>
        <div class="sub-row">
          <div class="row-wrapper">
            <div class="row-title">
              1. Jumlah Pemilih dalam DPT
              <br>(Model A.3-KPU)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> 18
              </li>
              <li>
                <span>Perempuan (P)</span> 18
              </li>
              <li>
                <span>Jumlah (L+P)</span> 36
              </li>
            </ul>
          </div>
          <div class="row-wrapper">
            <div class="row-title">
              2. Jumlah Pemilih dalam DPTb
              <br>(Model A-4 KPU)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> 18
              </li>
              <li>
                <span>Perempuan (P)</span> 18
              </li>
              <li>
                <span>Jumlah (L+P)</span> 36
              </li>
            </ul>
          </div>
          <div class="row-wrapper">
            <div class="row-title">
              3. Jumlah Pemilih dalam DPK
              <br>( Model A.DPK-KPU)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> 18
              </li>
              <li>
                <span>Perempuan (P)</span> 18
              </li>
              <li>
                <span>Jumlah (L+P)</span> 36
              </li>
            </ul>
          </div>
          <div class="row-wrapper">
            <div class="row-title">
              4. Jumlah Pemilih
              <br>(A.1 + A.2 + A.3)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> 18
              </li>
              <li>
                <span>Perempuan (P)</span> 18
              </li>
              <li>
                <span>Jumlah (L+P)</span> 36
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-data transparent">
      <div class="title">{{title}}</div>
      <div class="content-sub">
        <div class="sub-row no-title">
          <div class="row-wrapper">
            <div class="row-title">
              1. Jumlah Pemilih dalam DPT
              <br>(Model A.3-KPU)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> 18
              </li>
              <li>
                <span>Perempuan (P)</span> 18
              </li>
              <li>
                <span>Jumlah (L+P)</span> 36
              </li>
            </ul>
          </div>
          <div class="row-wrapper">
            <div class="row-title">
              2. Jumlah Pemilih dalam DPTb
              <br>(Model A-4 KPU)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> 18
              </li>
              <li>
                <span>Perempuan (P)</span> 18
              </li>
              <li>
                <span>Jumlah (L+P)</span> 36
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-data transparent">
      <div class="title">{{title}}</div>
      <div class="content-sub card-data-suara">
        <ul>
          <li>
            <div class="sub-desc">1. Jumlah surat suara yang diterima, termasuk surat suara cadangan 2% dari DPT (2+3+4)</div>
            <div class="sub-value">23</div>
          </li>
          <li>
            <div class="sub-desc">2. Jumlah surat suara yang dikembalikan oleh pemilik karena rusak/keliru coblos</div>
            <div class="sub-value">23</div>
          </li>
          <li>
            <div class="sub-desc">3. Jumlah surat suara yang tidak digunakan/tidak terpakai, termasuk sisa surat suara cadangan</div>
            <div class="sub-value">23</div>
          </li>
          <li>
            <div class="sub-desc">4. Jumlah surat suara yang digunakan</div>
            <div class="sub-value">23</div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CardData',
  data() {
    return {
      title: 'I. DATA PEMILIH dan DATA PENGGUNA HAK PILIH',
      sub_title: 'A. DATA PEMILIH'
    }
  }
}
</script>

<style lang="sass" scoped>
.card-data
  overflow: hidden
  .title
    padding: 10px 16px
    color: #ffffff
    background-color: #f2771d
    font-size: 12px
    border-bottom: none

  .content-sub
    font-size: 12px
    .sub-title
      padding: 10px 16px
      color: #f2771d
      border-bottom: 1px solid #cbcbcb
    .sub-row
      display: flex
      flex-direction: row
      flex-wrap: wrap
      &.no-title
        .row-wrapper
          border-top-color: transparent
      .row-wrapper
        flex: 0 0 50%
        padding: 10px 16px
        border-right: 1px solid #cbcbcb
        border-top: 1px solid #cbcbcb
        margin-top: -1px
        color: #111111
        font-weight: bold
        &:nth-child(even)
          border-right: none
        .row-title
          margin-bottom: 5px
        span
          color: #7c7c7c
          min-width: 100px
          display: inline-flex
          margin-right: 5px
          justify-content: space-between
          font-weight: normal
          &:after
            content: ":"
            display: inline-flex
            align-items: center

.card-data-suara
  li
    padding: 10px 16px
    display: flex
    align-items: flex-star
    color: #111111
    font-weight: bold
    .sub-desc
      padding-right: 20px
      flex: 1
    .sub-value
      width: 78px
      height: 38px
      background-color: #fef8e3
      border-radius: 4px
      display: flex
      align-items: center
      justify-content: center
</style>
