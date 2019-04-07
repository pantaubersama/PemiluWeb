<template>
  <div class="presiden-card">
    <div v-for="data in payloads" :key="data.id">
      <div class="card">
        <div class="title">
          {{data.kota}}
          <OutlineArrow />
        </div>
        <div class="content-vote">
          <div class="content-left">
            <div class="candidate candidate-1">
              <div class="percentage">
                Jokowi-Ma’kruf : <span>{{data.jokowi_maaruf.percent}}</span>
                </div>
                <div class="total">
                   |  <span>{{data.jokowi_maaruf.total_suara}} suara</span>
                  </div>
            </div>
            <div class="candidate candidate-2">
              <div class="percentage">
                Prabowo-Sandi  : <span>{{data.prabowo_sandi.percent}}</span>
              </div>
              <div class="total">
                 |  <span>{{data.prabowo_sandi.total_suara}} suara</span>
              </div>
            </div>
          </div>
          <div class="content-right">
            <div class="total-vote"><span>Rerata Total Suara Masuk </span> {{data.suara_sah}}</div>
            <div class="fault-vote"><span>Rerata Suara Tidak Sah </span> {{data.suara_tidak_sah}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OutlineArrow } from '@/svg/icons'
  export default {
    name: 'PresidenCard',
    components: {
      OutlineArrow
    },
    data() {
      return {
        payloads: [
          {
            id: 1,
            kota: 'Aceh',
            jokowi_maaruf: {
              percent: '30%',
              total_suara: '30.000',
            },
            prabowo_sandi: {
              percent: '70%',
              total_suara: '70.000',
            },
            suara_sah: '100.000',
            suara_tidak_sah: '10.000'
          },
          {
            id: 2,
            kota: 'Sumatra Utara',
            jokowi_maaruf: {
              percent: '30%',
              total_suara: '30.000'
            },
            prabowo_sandi: {
              percent: '70%',
              total_suara: '70.000'
            },
            suara_sah: '100.000',
            suara_tidak_sah: '10.000'
          }
        ]
      }
    },
  }
</script>

<style lang="sass" scoped>
.presiden-card
  .card
    cursor: pointer
    margin-bottom: 10px
  .title
    font-size: 14px
    text-transform: none
    color: #08bda8
    display: flex
    align-items: center
    padding: 6px 10px
    justify-content: space-between
    svg
      fill: #08bda8
      width: 24px
      height: 24px
  .content-vote
    display: flex
    .content
      &-left
        border-right: 1px solid #ececec
        flex: 1
      &-left,
      &-right
        padding: 10px
      &-right
        font-size: 11px
        color: #111111
        width: 250px
        font-weight: bold
        > div
          margin-bottom: 3px
          height: 18px
          display: flex
          align-items: center
          &:last-child
            margin-bottom: 0
        span
          color: #4f4f4f
          width: 130px
          display: flex
          align-items: center
          justify-content: space-between
          margin-right: 10px
          font-weight: normal
          &:after
            content: ":"
            display: inline-flex
            align-items: center

    .candidate
      display: flex
      font-size: 12px
      margin-bottom: 3px
      &:last-child
        margin-bottom: 0
      .percentage
        display: flex
        align-items: center
        width: 155px
        span
          color: #f2771d
          margin: 0 10px
          font-weight: bold
        &:before
          content: ""
          width: 14px
          height: 14px
          border-radius: 50%
          background-color: #f2771d
          display: block
          margin-right: 10px
      .total
        font-weight: bold
        color: #111111
        span
          margin-left: 10px
      &-1
        .percentage
          span
            color: #bd081c
          &:before
            background-color: #bd081c

</style>
