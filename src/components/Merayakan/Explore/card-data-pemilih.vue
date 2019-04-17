<template>
  <div>
    <div class="card card-data transparent">
      <div class="title">I. DATA PEMILIH dan DATA PENGGUNA HAK PILIH</div>
      <div class="content-sub">
        <div class="sub-title">A. DATA PEMILIH</div>
        <div class="sub-row">
          <!-- A-3 -->
          <div class="row-wrapper">
            <div class="row-title">
              1. Jumlah Pemilih dalam DPT
              <br>(Model A.3-KPU)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> {{item.a3_laki_laki}}
              </li>
              <li>
                <span>Perempuan (P)</span> {{item.a3_perempuan}}
              </li>
              <li>
                <span>Jumlah (L+P)</span> {{item.aggregates.a3_total}}
              </li>
            </ul>
          </div>
          <!-- A-4 -->
          <div class="row-wrapper">
            <div class="row-title">
              2. Jumlah Pemilih dalam DPTb
              <br>(Model A-4 KPU)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> {{item.a4_laki_laki}}
              </li>
              <li>
                <span>Perempuan (P)</span> {{item.a4_perempuan}}
              </li>
              <li>
                <span>Jumlah (L+P)</span> {{item.aggregates.a4_total}}
              </li>
            </ul>
          </div>
          <!-- A DPK -->
          <div class="row-wrapper">
            <div class="row-title">
              3. Jumlah Pemilih dalam DPK
              <br>( Model A.DPK-KPU)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> {{item.a_dpk_laki_laki}}
              </li>
              <li>
                <span>Perempuan (P)</span> {{item.a_dpk_perempuan}}
              </li>
              <li>
                <span>Jumlah (L+P)</span> {{item.aggregates.a_dpk_total}}
              </li>
            </ul>
          </div>
          <!-- Grand total -->
          <div class="row-wrapper">
            <div class="row-title">
              4. Jumlah Pemilih
              <br>(A.1 + A.2 + A.3)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> {{item.aggregates.pemilih_laki_laki_total}}
              </li>
              <li>
                <span>Perempuan (P)</span> {{item.aggregates.pemilih_perempuan_total}}
              </li>
              <li>
                <span>Jumlah (L+P)</span> {{item.aggregates.pemilih_total}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-sub">
        <div class="sub-title">B. PENGGUNA HAK PILIH</div>
        <div class="sub-row">
          <div class="row-wrapper">
            <div class="row-title">
              1. Jumlah Pemilih dalam DPT
              <br>(Model A.3-KPU)
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> {{item.c7_dpt_laki_laki}}
              </li>
              <li>
                <span>Perempuan (P)</span> {{item.c7_dpt_perempuan}}
              </li>
              <li>
                <span>Jumlah (L+P)</span> {{item.aggregates.c7_dpt_total}}
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
                <span>Laki-laki (L)</span> {{item.c7_dptb_laki_laki}}
              </li>
              <li>
                <span>Perempuan (P)</span> {{item.c7_dptb_perempuan}}
              </li>
              <li>
                <span>Jumlah (L+P)</span> {{item.aggregates.c7_dptb_total}}
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
                <span>Laki-laki (L)</span> {{item.c7_dpk_laki_laki}}
              </li>
              <li>
                <span>Perempuan (P)</span> {{item.c7_dpk_perempuan}}
              </li>
              <li>
                <span>Jumlah (L+P)</span> {{item.aggregates.c7_dpk_total}}
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
                <span>Laki-laki (L)</span> {{item.aggregates.c7_laki_laki_hak_pilih_total}}
              </li>
              <li>
                <span>Perempuan (P)</span> {{item.aggregates.c7_perempuan_hak_pilih_total}}
              </li>
              <li>
                <span>Jumlah (L+P)</span> {{item.aggregates.c7_hak_pilih_total}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-data transparent">
      <div class="title">II. DATA PEMILIH DISABILITAS</div>
      <div class="content-sub">
        <div class="sub-row no-title">
          <div class="row-wrapper">
            <div class="row-title">
              1. Jumlah seluruh Pemilih disabilitas terdaftar dalam DPT, DPTb dan DPK
              <!-- <br>(Model A.3-KPU) -->
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> {{item.disabilitas_terdaftar_laki_laki}}
              </li>
              <li>
                <span>Perempuan (P)</span> {{item.disabilitas_terdaftar_perempuan}}
              </li>
              <li>
                <span>Jumlah (L+P)</span> {{item.aggregates.disabilitas_terdaftar_total}}
              </li>
            </ul>
          </div>
          <div class="row-wrapper">
            <div class="row-title">
              2. Jumlah seluruh Pemilih disabilitas yang menggunakan hak pilih
              <!-- <br>(Model A-4 KPU) -->
            </div>
            <ul>
              <li>
                <span>Laki-laki (L)</span> {{item.disabilitas_hak_pilih_laki_laki}}
              </li>
              <li>
                <span>Perempuan (P)</span> {{item.disabilitas_hak_pilih_perempuan}}
              </li>
              <li>
                <span>Jumlah (L+P)</span> {{item.aggregates.disabilitas_hak_pilih_total}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-data transparent">
      <div class="title">III. DATA PENGGUNAAN SURAT SUARA</div>
      <div class="content-sub card-data-suara">
        <ul>
          <li>
            <div class="sub-desc">1. Jumlah surat suara yang diterima, termasuk surat suara cadangan 2% dari DPT (2+3+4)</div>
            <div class="sub-value">{{item.surat_dikembalikan + item.surat_digunakan + item.surat_tidak_digunakan}}</div>
          </li>
          <li>
            <div class="sub-desc">2. Jumlah surat suara yang dikembalikan oleh pemilik karena rusak/keliru coblos</div>
            <div class="sub-value">{{item.surat_dikembalikan}}</div>
          </li>
          <li>
            <div class="sub-desc">3. Jumlah surat suara yang tidak digunakan/tidak terpakai, termasuk sisa surat suara cadangan</div>
            <div class="sub-value">{{item.surat_digunakan}}</div>
          </li>
          <li>
            <div class="sub-desc">4. Jumlah surat suara yang digunakan</div>
            <div class="sub-value">{{item.surat_tidak_digunakan}}</div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CardData',
  props: ['item'],
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
