<template>
  <div class="source">
    <a v-if="link != null" :href="link" class="source-link">
      {{link}}
    </a>
    <div class="source-detail">
      <div class="source-avatar-container">
        <img src="~@/assets/user.svg" alt="trump" class="source-avatar">
        <i class="icon icon-twitter"></i>
      </div>
      <div class="detail-container">
        <div class="meta-container">
          <div class="name">Ratu CebonganYK</div>
          <div class="username">@ratu_cebonganYK</div>
          <div class="date">&bull; 5 des</div>
        </div>
        <div class="content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis non, hic,
          aliquid voluptas sed aperiam quia, corrupti tempore fugit quod in reprehenderit
          autem doloremque adipisci nihil molestiae illo qui voluptates?
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DebatSourcePanel',
  props: ['link']
}
</script>

<style lang="sass" scoped>
.source
  margin-top: 10px
  flex: 0 0 150px
  display: flex
  flex-direction: column
  padding: 10px
  background: #f9f9f9
.source-link
  flex: 0 0 25px
  font-size: 10px
  line-height: 1.6
  text-align: left
  color: #1da1f2
  text-decoration: underline
  padding: 5px 10px
.source-detail
  display: flex
  padding: 10px
  .source-avatar-container
    flex: 0 0 40px
    height: 40px
    width: 40px
    border: 2px solid white
    border-radius: 50%
    position: relative
    img.source-avatar
      height: 36px
      width: 36px
      object-fit: cover
      border-radius: 50%
      overflow: hidden
    .icon.icon-twitter
      position: absolute
      bottom: -5px
      left: 0px
  .detail-container
    display: flex
    flex-direction: column
    margin-left: 10px
    .meta-container
      flex: 0 0 25px
      display: flex
      .name,
      .username,
      .date
        font-size: 12px
        font-weight: bold;
        line-height: 2;
        color: #aaaaaa
        margin-left: 5px
        &:first-child
          margin-left: 0
      .name
        color: #212121
    .content
      font-size: 11px
      line-height: 1.18
      letter-spacing: 0.2px
      color: #212121
</style>
