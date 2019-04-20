<template>
  <div class="debat-card" @click="$emit('click', $event)">
    <div class="header"
      :class="{
        '--coming-soon': type === 'coming-soon',
        '--live': type === 'live',
        '--done': type === 'done',
        '--challenge': type === 'challenge'
      }">
      <span v-if="type === 'coming-soon'">Coming Soon</span>
      <span v-if="type === 'live'"><i class="icon icon-live-now"></i> Live</span>
      <span v-if="type === 'done'">Done</span>
      <span v-if="type === 'challenge'">{{challengeType}}</span>
      <img v-if="challengerAvatar" :src="challengerAvatar"
        :alt="challenger.username" class="user-a">
      <img src="~@/assets/user.svg" alt="asd" class="user-a" v-else>
      <img v-if="opponent != null && opponentAvatar"
        :src="opponentAvatar"
        :alt="opponent.username" class="user-b">
      <img v-if="opponent != null && opponentAvatar == null"
        src="~@/assets/user.svg" alt="asd" class="user-b">
    </div>
    <div class="body">
      <div class="versus"></div>
      <div class="challenger">
        <div class="challenger-column column-1">{{challenger.full_name}}</div>
        <div v-if="opponent != null" class="challenger-column column-2">{{opponent.full_name}}</div>
      </div>
    </div>
    <div class="body-lower">
      <slot name="body-lower"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardDebat',
  props: ['type', 'debat'],
  computed: {
    challengeType() {
      if (this.debat == null) return 'Open Challenge'
      return this.debat.type.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    },
    challenger() {
      if (this.debat == null) return 'Placeholder'
      return this.debat.audiences.find(it => it.role === 'challenger')
    },
    opponent() {
      if (this.debat == null) return 'Placeholder'
      return this.debat.audiences.find(it => it.role.indexOf('opponent') > -1)
    },
    challengerAvatar() {
      if (this.challenger.avatar == null) return ''
      return this.challenger.avatar.medium.url
    },
    opponentAvatar() {
      if (this.opponent == null) return ''
      if (this.opponent.avatar == null) return ''
      return this.opponent.avatar.medium.url
    }
  }
}
</script>

<style lang="sass" scoped>

i.icon.icon-live-now
  background-image: url(~@/assets/icon-live.svg)
  background-size: contain
  background-position: center
  display: inline-block
  height: 24px
  width: 24px

.debat-card
  height: 138px
  width: 245px
  // background: lightblue;
  border: 1px solid #ececec
  border-radius: 8px
  overflow: hidden
  margin-top: 15px

  .header
    height: 60px
    background-size: cover
    background-repeat: no-repeat
    background-position: left
    border: none
    display: flex
    justify-content: center
    align-items: center
    position: relative
    z-index: 1
    &.--coming-soon
      background: url(~@/assets/img-debat-coming-soon-bg.svg)
      background-size: cover
    &.--live
      background: url(~@/assets/img-debat-live-bg.svg)
      background-size: cover
    &.--done
      background: url(~@/assets/img-debat-done-bg.svg)
      background-size: cover
    &.--challenge
      background: url(~@/assets/img-debat-challenge-bg.svg)
      background-size: cover

    span
      text-align: center
      color: white
      text-transform: uppercase
      font-size: 14px
      font-weight: 900
      line-height: 1.14
      letter-spacing: 0.2px
      display: flex
      align-items: center
    img
      height: 48px
      width: 48px
      object-fit: cover
      overflow: hidden
      border-radius: 50%
      border: 2px solid white
      position: absolute
      top: 30px
      background: white
      &.user-a
        left: 10px
      &.user-b
        right: 10px

  .body
    position: relative
    .versus
      position: absolute
      left: 50%
      transform: translateX(-50%)
      background-image: url(~@/assets/ic-debat-shield.svg)
      background-repeat: no-repeat
      background-size: contain
      background-position: center
      height: 37px
      width: 37px
    .challenger
      padding: 0 10px
      padding-top: 25px
      display: flex
      justify-content: space-between
      align-items: center
      &-column
        width: 90px
        max-width: 90px
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
        flex: 1
        flex-wrap: nowrap
        font-size: 11px
        line-height: 1.18
        color: #393939
        &.column-1
          text-align: left
        &.column-2
          text-align: right
  .body-lower
    margin-top: 15px
    font-size: 11px
    font-weight: 500
    line-height: 1.36
    letter-spacing: 0.2px
    color: #7c7c7c
    text-align: center
</style>
