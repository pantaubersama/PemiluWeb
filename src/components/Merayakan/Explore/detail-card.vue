<template>
  <div class="detail-card">
    <div v-for="data in payloads" :key="data.id">
      <div class="card">
        <div class="title">
          <div class="profile">
            <div class="thumb">
              <img :src="data.user.profile" :alt="data.user.name">
            </div>
            <div class="user-name">{{data.user.name}}</div>
            <div class="user-cluster">{{data.user.cluster}}</div>
          </div>
        </div>

        <div class="content">
          <div class="content-desc">
            <div class="tps">Tps {{data.tps.nomor}}</div>
            <div class="tps-location">{{data.tps.lokasi}}</div>
          </div>
        </div>
      </div>
      <div class="card transparent">
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
      <detail-c1/>
      <card-data/>
      <vote-card :SuaraSah="data.suara_sah" :SuaraTidakSah="data.suara_tidak_sah"/>
      <candidate-vote-card/>
      <city-card/>
    </div>
  </div>
</template>

<script>
import DetailC1 from '@/components/Merayakan/Explore/card-c1'
import CardData from '@/components/Merayakan/Explore/card-data'
import VoteCard from '@/components/Merayakan/Explore/vote-card'
import CandidateVoteCard from '@/components/Merayakan/Explore/candidate-vote-card'
import CityCard from '@/components/Merayakan/Explore/city-card'
export default {
  name: 'DetailCard',
  components: {
    DetailC1,
    CardData,
    VoteCard,
    CandidateVoteCard,
    CityCard
  },
  data() {
    return {
      payloads: [
        {
          id: 1,
          user: {
            name: 'Anik Kemala',
            profile: 'https://placeimg.com/240/240/tech/1',
            cluster: 'Cluster Partai Kuning Ceria'
          },
          tps: {
            nomor: '03',
            lokasi: 'Yogyakarta, Sleman, Depok, Condongcatur'
          },
          suara_sah: '100.000',
          suara_tidak_sah: '10.000',
          jokowi_maaruf: {
            percent: '30%',
            total_suara: '30.000',
          },
          prabowo_sandi: {
            percent: '70%',
            total_suara: '70.000',
          },
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.detail-card

  .title
    display: flex
    align-items: center
    padding: 6px 10px
    justify-content: space-between
    svg
      fill: #08bda8
      width: 24px
      height: 24px

  .profile
    font-size: 10px
    text-transform: none
    align-items: center
    display: flex
    align-items: center
    flex: 1
    .thumb
      width: 18px
      height: 18px
      border-radius: 50%
      overflow: hidden
      margin-right: 10px
      img
        width: 100%
        height: 100%
        object-fit: cover
    .user-name
      color: #212121
      margin-right: 5px
    .user-cluster
      color: #7c7c7c
      font-weight: normal

  .content
    padding: 10px 16px
    &-desc
      border-left: 3px solid #f2771d
      padding: 8px
      font-weight: bold
      line-height: 1
      .tps
        text-transform: uppercase
        color: #bd081c
        margin-bottom: 3px
        &-location
          font-size: 12px
          font-family: 'Bw Modelica'

  .content-vote
    display: flex
    .content
      &-left
        border-right: 1px solid #ececec
      &-left,
      &-right
        padding: 10px
        flex: 1
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
