<template>
  <layout-timeline>
    <template slot="main-content">
      <debat-detail
        title="Open Challenge"
        :debat="debat"
        :with-source="false"
        :with-opponent="true"
        :challenger="challenger"
        :opponent="opponent"
        banner-text1="Tantangan ditolak!"
        banner-text2="lawan debat tidak menerima tantangan ini :("
      >
      <template slot="debat-subcontent">
        <div class="source-detail">
          <div class="source-avatar-container">
            <img v-if="opponent.avatar == null" src="~@/assets/user.svg" alt="opponent" class="source-avatar">
            <img v-else :src="opponent.avatar.url" :alt="opponent.username" class="source-avatar">
          </div>
          <div class="detail-container">
            <div class="meta-container">
              <div class="name">{{opponent.full_name}}</div>
              <div class="username">@{{opponent.username}}</div>
              <div v-if="false" class="date">&bull; 5 des</div>
            </div>
            <div class="content">
              {{debat.reason_rejected}}
            </div>
          </div>
        </div>
      </template>
      <template slot="header-footer">
        Denied
      </template>
      </debat-detail>
    </template>
  </layout-timeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import DebatDetail from '@/components/debat-detail'
import DebatSourcePanel from '@/components/debat-source-panel'

export default {
  name: 'DebatDetail--Rejected',
  props: ['debat'],
  components: {
    LayoutTimeline,
    DebatDetail,
    DebatSourcePanel
  },
  computed: {
    challenger() {
      return this.debat.audiences.find(it => it.role === 'challenger')
    },
    opponent() {
      return this.debat.audiences.find(it => it.role.indexOf('opponent') > -1)
    }
  }
}
</script>

<style lang="sass" scoped>
.debat-detail-container /deep/ .header
  background-image: url(~@/assets/bg-debat-detail-banner-challenge.svg)
.debat-detail-container /deep/ .debat-banner
  background-image: url(~@/assets/bg-debat-detail-expired.svg)
.debat-detail-container /deep/ .debat-banner .banner-text-2
  color: #bd081c
.debat-detail-container /deep/ .debat-subcontent
  margin-top: 20px

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
