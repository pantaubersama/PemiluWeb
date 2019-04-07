<template>
  <div class="confirmation-panel">
    <div class="avatar-container">
      <img v-if="user.avatar.url == null" src="~@/assets/user.svg" :alt="user.username" class="avatar">
      <img v-else :src="user.avatar.url" :alt="user.username" class="avatar">
    </div>
    <div class="user-detail">
      <div class="displayname">{{user.full_name}}</div>
      <div class="username">@{{user.username}}</div>
    </div>
    <div v-if="withButton" class="button-container">
      <button type="button"
        class="confirm-button"
        :disabled="disabled"
        @click.prevent="$emit('confirm')">
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationPanel',
  props: ['disabled', 'with-button', 'user']
}
</script>

<style lang="sass" scoped>
.confirmation-panel
  display: flex
  align-items: center

.avatar-container
  flex: 0 0 40px
  height: 40px
  width: 40px
  border-radius: 50%
  overflow: hidden
  img.avatar
    height: 100%
    width: 100%
    object-fit: cover

.user-detail
  flex: 1
  margin-left: 10px
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: center

  .displayname
    font-size: 14px
    font-weight: bold
    line-height: 1.14
    color: #000000
  .username
    font-size: 12px
    line-height: 1.25
    color: #757575

.button-container
  flex: 0 0 auto
  button.confirm-button
    background: #08bda8
    height: 32px
    width: 120px
    text-transform: uppercase
    border: none
    border-radius: 2px
    font-size: 12px
    font-weight: bold
    line-height: 1
    letter-spacing: 1.2px
    text-align: center
    color: #ffffff
    cursor: pointer
    &:disabled
      background: #ececec
      cursor: not-allowed

</style>
