<template>
  <div class="card transparent">
    <div class="vote-party" v-if="withHeader">
      <div class="thumb">
        <img v-if="candidate.logo == null" src="https://placeimg.com/240/240/tech/1" :alt="candidate.acronym">
        <img v-else :src="candidate.logo.thumbnail.url" :alt="candidate.acronym" :title="candidate.acronym">
      </div>
      <div class="party-desc">
        <p>{{candidate.name}}</p>
        <span>No Urut {{candidate.serial_number}}</span>
      </div>
      <div class="vote-result">
        <div class="percentage">70%</div>
        <span>|</span>
        <div class="vote">1.000.000 suara</div>
      </div>
    </div>
    <div class="vote-candidate">
      <ul>
        <li v-for="(item, index) in candidate.candidates" :key="item.id">
          <div class="candidate-name">{{index + 1}}. {{item.name}}</div>
          <div class="vote-result">
            <div v-if="item.percentage == null" class="percentage">0%</div>
            <div v-else class="percentage">{{item.percentage}}%</div>
            <span>|</span>
            <div v-if="item.cv == null" class="vote">0 suara</div>
            <div v-else class="vote">{{item.cv}} suara</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CandidateCard',
  props: ['candidate', 'with-header']
}
</script>


<style lang="sass" scoped>
.vote-party
  background-color: #ececec
  color: #111111
  display: flex
  align-items: center
  padding: 17px 20px
  font-weight: bold
  font-size: 12px
  .thumb
    width: 50px
    height: 50px
    img
      width: 100%
      height: 100%
      object-fit: contain
      object-position: left center
  .party-desc
    padding: 0 20px
    flex: 1
    p
      margin-bottom: 0
      font-size: 13px
      font-family: 'Bw Modelica'
    span
      font-weight: normal
      color: #4f4f4f

.vote-result
  display: flex
  align-items: center
  .percentage
    color: #9b0012
  span
    margin: 0 10px

.vote-candidate
  li
    display: flex
    align-items: center
    padding: 10px 20px
    font-weight: bold
    font-size: 12px
    border-top: solid 1px #ececec
    &:first-child
      border-top: none
    .candidate-name
      flex: 1
</style>
