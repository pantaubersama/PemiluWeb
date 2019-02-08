<template>
  <div>
    <div
      class="autocomplete label"
      v-if="item && item.name === 'Semua Cluster' && !item.id && !item.created_at"
    >
      <h6 class="title">{{ item.name }}</h6>
    </div>
    <div class="autocomplete" v-else>
      <div class="thumbnail">
        <img
          class="image"
          :src="item.image.thumbnail_square.url"
          alt="avatar"
          v-if="item.image && item.image.thumbnail_square && item.image.thumbnail_square.url && item.image.thumbnail_square.url.length > 0"
        >
        <img class="image" src="@/assets/user.svg" alt="avatar" v-else>
      </div>
      <div class="content">
        <h6 class="title">{{ item.name }}</h6>
        <span class="count">{{ `${item.members_count || 0} Anggota` }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemAutoComplete',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
  .autocomplete
    width: 100%
    border-radius: 4px
    color: #393939
    border: 1px solid rgba(0, 0, 0, 0.125)
    padding: 0
    margin: 3px 0
    display: flex
    justify-content: center
    align-items: center
    flex-direction: row
    cursor: pointer
    box-shadow: -7px 10px 30px -8px rgba(232,227,232,0.75)

    &.label
      padding: 6px

      .title
        color: #111111
        height: 28px
        line-height: 28px
        width: 100%
        text-align: left
        padding-left: 8px

    .thumbnail
      display: flex
      flex: 0 40px
      justify-content: center
      align-items: center

      .image
        height: 24px
        width: 24px
        border-radius: 50%

    .content
      display: flex
      justify-content: center
      align-items: flex-start
      flex-direction: column
      flex: 1
      height: 48px

      .title
        text-transform: uppercase
        font-weight: 700
        font-size: 13px
        color: #2d2d2d
        height: 15px
        line-height: 15px
        overflow: hidden
        word-break: break-all
        margin: 0

      .count
        font-weight: 400
        font-size: 12px
        line-height: 14px
        color: #c5c5c5
        height: 13px

</style>
