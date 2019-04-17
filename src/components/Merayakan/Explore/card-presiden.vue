<template>
  <div class="presiden-card" @click.prevent="$emit('click')">
    <div class="card" :class={transparent}>
      <div class="title" v-if="!transparent">
        {{item.region.name}}
        <OutlineArrow />
      </div>
      <div class="content-vote">
        <div class="content-left">
          <div class="candidate candidate-1">
            <div class="percentage">
              Jokowi-Ma’kruf : <span>{{Math.ceil(jokowi.percentage)}}%</span>
              </div>
              <div class="total">
                  |  <span>{{jokowi.total_vote}} suara</span>
                </div>
          </div>
          <div class="candidate candidate-2">
            <div class="percentage">
              Prabowo-Sandi  : <span>{{Math.ceil(prabowo.percentage)}}%</span>
            </div>
            <div class="total">
                |  <span>{{prabowo.total_vote}} suara</span>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="total-vote"><span>Rerata Total Suara Masuk </span> {{totalVote}}</div>
          <div class="fault-vote"><span>Rerata Suara Tidak Sah </span> {{invalidVote}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OutlineArrow } from '@/svg/icons'
  export default {
    name: 'CardPresiden',
    props: ['item', 'transparent'],
    components: { OutlineArrow },
    computed: {
      jokowi() {
        if (this.item.candidates != null) return this.item.candidates[0]
        if (this.item.percentage == null) return { percentage: 0, total_vote: 0 }
        return this.item.percentage.jokowi
      },
      prabowo() {
        if (this.item.candidates != null) return this.item.candidates[1]
        if (this.item.percentage == null) return { percentage: 0, total_vote: 0 }
        return this.item.percentage.prabowo
      },
      totalVote() {
        if (this.item.total_vote != null) return this.item.total_vote
        if (this.item.percentage == null) return 0
        return this.item.percentage.total_vote
      },
      invalidVote() {
        if (this.item.invalid_vote != null) return this.item.invalid_vote.total_vote
        if (this.item.percentage == null) return 0
        return this.item.percentage.invalid_vote.total_vote
      }
    },
  }
</script>

<style lang="sass" scoped>
.presiden-card
  .card
    cursor: pointer
    margin-bottom: 10px
    &.transparent
      cursor: initial
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
