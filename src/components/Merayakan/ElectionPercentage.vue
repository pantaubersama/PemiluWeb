<template>
  <div class="election-percentage">

    <p>Pembaruan terakhir {{updateTime}}</p>
    <div class="candidate-wrapper">

      <div class="candidate">
        <div class="thumb">
          <img src="@/assets/paslonjokowi.png">
        </div>
        <div class="text-wrapper">
          <div class="percent"><b>{{jokowi}}</b>%</div>
          <div class="candidate-name">
            <b>Joko Widodo</b>
            <p>Ma'kruf Amin</p>
          </div>
        </div>
        <div class="voice-rate">
          Rerata: {{jokowiTotal}} suara
        </div>
        <div class="coalition-parties">
          <img src="@/assets/party2.png" alt="">
        </div>
      </div>

      <div class="candidate">
        <div class="thumb">
          <img src="@/assets/paslonprabowo.png">
        </div>
        <div class="text-wrapper">
          <div class="percent"><b>{{prabowo}}</b>%</div>
          <div class="candidate-name">
            <b>Prabowo Subianto</b>
            <p>Sandiaga Uno</p>
          </div>
        </div>
        <div class="voice-rate">
          Rerata: {{prabowoTotal}} suara
        </div>
        <div class="coalition-parties">
          <img src="@/assets/party1.png" alt="">
        </div>
      </div>

    </div>

    <div class="percentage-bar">
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="`width:${jokowi}%`" :aria-valuenow="`${jokowi}`" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="progress-bar" role="progressbar" :style="`width:${prabowo}%`" :aria-valuenow="`${prabowo}`" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ElectionPercantage',
  computed: {
    ...mapState({
      jokowi: s => s.hitungSummary.jokowi_percentage,
      jokowiTotal: s => s.hitungSummary.jokowi_total,
      prabowo: s => s.hitungSummary.prabowo_percentage,
      prabowoTotal: s => s.hitungSummary.prabowo_total,
      updateTime: s => s.hitungSummary.update_time
    })
  },

}
</script>

<style lang="sass" scoped>
.election-percentage
  padding: 18px 0
  background-color: #fff
  border-radius: 0.25rem
  position: relative
  margin-bottom: 10px
  > p
    margin-bottom: -10px
    text-align: center
    color: #7c7c7c
    font-size: 10px
  .candidate-wrapper
    display: flex
    .candidate
      flex: 1
      padding: 0 5px 0 20px
      @media (max-width: 575px)
        padding: 0 15px
      .thumb
        width: 100px
        height: 100px
        border-radius: 50%
        overflow: hidden
        @media (max-width: 575px)
          width: 60px
          height: 60px
        img
          width: 100%
          height: 100%
          object-fit: cover
          object-position: center center
      .text-wrapper
        display: flex
        align-items: center
        margin-top: 10px
        margin-bottom: 60px
        @media (max-width: 575px)
          flex-direction: column
          align-items: flex-start
        p
          margin: 0
        .percent
          font-size: 30px
          font-family: 'Bw Modelica'
          color: #9b0012
          margin-right: 5px
          line-height: 1.3
          @media (max-width: 575px)
            font-size: 20px
        .candidate-name
          line-height: 1.2
          font-size: 12px
          text-transform: uppercase
          @media (max-width: 575px)
            font-size: 13px
      .voice-rate
        font-size: 10px
        color: #9b0012
        margin-bottom: 20px
      .coalition-parties
        img
          height: 20px
          width: auto
      &:last-child
        text-align: right
        padding: 0 20px 0 5px
        .thumb
          margin-left: auto
        .text-wrapper
          flex-direction: row-reverse
          @media (max-width: 575px)
            flex-direction: column
            align-items: flex-end
          .percent
            color: #f2771d
            margin-right: 0
            margin-left: 5px
        .voice-rate
          color: #f2771d

  .percentage-bar
    padding: 0 20px
    position: absolute
    bottom: 80px
    left: 0
    width: 100%
    @media (max-width: 575px)
      padding: 0 15px
    &:before
      content: ""
      height: 55px
      width: 3px
      background-color: #cbcbcb
      position: absolute
      left: 0
      right: 0
      margin: -5px auto
      border-radius: 2px
    .progress
      height: 45px
      border-radius: 0
      justify-content: space-between
      &-bar
        &:first-child
          background-color: #9b0012
        &:last-child
          background-color: #f2771d
</style>

