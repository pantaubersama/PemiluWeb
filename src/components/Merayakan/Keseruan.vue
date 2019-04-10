<template>
  <div class="keseruan" >
    <div class="title">Keseruan Suasana di TPS</div>
    <div class="lists">
      <div class="col-lg-4 col-md-6" v-for="data in object" :key="data.id">
        <ModalKeseruan :fullImage="data.file.url"
            v-if="modal === data.id"
            @close-request="closeModal()"
        />
        <div class="list" @click="() => modal = data.id">
          <div class="thumb">
            <img :src="data.file.thumbnail.url" alt>
          </div>
          <div class="desc" v-if="data.real_count">
            <div class="tps">TPS {{data.real_count.tps}}</div>
            <div class="tps-location">{{data.real_count.province.name}}, {{data.real_count.regency.name}}, {{data.real_count.district.name}}, {{data.real_count.village.name}}</div>
            <div class="profile">
              <div class="profile-thumb">
                <img class="image" v-if="data.real_count.user" :src="data.real_count.user.avatar.thumbnail.url" alt="avatar">
                <img class="image" v-else src="@/assets/user.svg" alt="avatar">
              </div>
              <div class="user-name">{{data.real_count.user.full_name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="load-more" @click="$emit('loadMoreSuasanaTps')" v-if="!paginations.isLast && object.length > 5">
        <button class="btn btn-primary">Tampilkan Lebih Banyak</button>
      </div>
    </div>
  </div>
</template>

<script>
import ModalKeseruan from '@/components/Merayakan/ModalKeseruan'
export default {
  name: 'ListKeseruan',
  props: {
    object: {
      type: Array
    },
    paginations: {
      type: Object
    }
  },
  components: {
    ModalKeseruan,
  },
  data() {
    return {
      modal: false
    }
  },
  methods: {
    closeModal() {
      this.modal = false
    }
  },
}
</script>

<style lang="sass" scoped>
.keseruan
  margin-top: 30px
  @media (max-width: 575px)
    margin-top: 5px
  .title
    font-size: 12px
    color: #7c7c7c
    text-align: center
  .lists
    margin-top: 15px
    display: flex
    flex-wrap: wrap
    padding: 0 9px
    @media (max-width: 575px)
      padding: 0 15px
    .col-lg-4
      padding: 0 6px
      margin-bottom: 20px
      @media (max-width: 575px)
        padding: 0
    .list
      border-radius: 5px
      border: solid 1px #ececec
      background-color: #f4f4f4
      overflow: hidden
      cursor: pointer
    .thumb
      height: 170px
      img
        width: 100%
        height: 100%
        object-fit: cover
    .desc
      padding: 15px
      min-height: 106px
      display: flex
      flex-direction: column
      justify-content: flex-end
      .tps
        text-transform: uppercase
        font-weight: bold
        color: #9b0012
        margin-bottom: 5px
        &-location
          font-size: 12px
          color: #111111
          font-weight: bold
          line-height: 16px
    .profile
      margin-top: 10px
      display: flex
      &-thumb
        width: 24px
        height: 24px
        border-radius: 50%
        overflow: hidden
        margin-right: 8px
        img
          width: 100%
          height: 100%
          object-fit: cover
      .user-name
        color: #212121
  .load-more
    padding: 0 10px
    width: 100%
    height: auto
    .btn
      margin-top: 15px
</style>
