<template>
  <div>
    <div class="card transparent">
      <div class="vote-party">
        <div class="thumb">
          <img src="https://placeimg.com/240/240/tech/1" alt="">
        </div>
        <div class="party-desc">
          <p>Partai Gerakan Indonesia Raya</p>
          <span>No Urut 2</span>
        </div>
        <div class="vote-result">
          <div class="percentage">70%</div>
          <span>|</span>
          <div class="vote">1.000.000 suara</div>
        </div>
      </div>
      <div class="vote-candidate">
        <ul>
          <li>
            <div class="candidate-name">1. Haji Luuntung</div>
            <div class="vote-result">
              <div class="percentage">70%</div>
              <span>|</span>
              <div class="vote">1.000.000 suara</div>
            </div>
          </li>
          <li>
            <div class="candidate-name">2. Haji Luuntung</div>
            <div class="vote-result">
              <div class="percentage">70%</div>
              <span>|</span>
              <div class="vote">1.000.000 suara</div>
            </div>
          </li>
          <li>
            <div class="candidate-name">3. Haji Luuntung</div>
            <div class="vote-result">
              <div class="percentage">70%</div>
              <span>|</span>
              <div class="vote">1.000.000 suara</div>
            </div>
          </li>
          <li>
            <div class="candidate-name">4. Haji Luuntung</div>
            <div class="vote-result">
              <div class="percentage">70%</div>
              <span>|</span>
              <div class="vote">1.000.000 suara</div>
            </div>
          </li>
          <li>
            <div class="candidate-name">5. Haji Luuntung</div>
            <div class="vote-result">
              <div class="percentage">70%</div>
              <span>|</span>
              <div class="vote">1.000.000 suara</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="card transparent">
      <div class="vote-candidate">
        <ul>
          <li>
            <div class="candidate-name">1. Haji Luuntung</div>
            <div class="vote-result">
              <div class="percentage">70%</div>
              <span>|</span>
              <div class="vote">1.000.000 suara</div>
            </div>
          </li>
          <li>
            <div class="candidate-name">2. Haji Luuntung</div>
            <div class="vote-result">
              <div class="percentage">70%</div>
              <span>|</span>
              <div class="vote">1.000.000 suara</div>
            </div>
          </li>
          <li>
            <div class="candidate-name">3. Haji Luuntung</div>
            <div class="vote-result">
              <div class="percentage">70%</div>
              <span>|</span>
              <div class="vote">1.000.000 suara</div>
            </div>
          </li>
          <li>
            <div class="candidate-name">4. Haji Luuntung</div>
            <div class="vote-result">
              <div class="percentage">70%</div>
              <span>|</span>
              <div class="vote">1.000.000 suara</div>
            </div>
          </li>
          <li>
            <div class="candidate-name">5. Haji Luuntung</div>
            <div class="vote-result">
              <div class="percentage">70%</div>
              <span>|</span>
              <div class="vote">1.000.000 suara</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CandidateVoteCard'
  }
</script>

<style lang='sass' scoped>
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
