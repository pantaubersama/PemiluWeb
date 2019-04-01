<template>
  <div class="keseruan">
    <div class="title">Keseruan Suasana di TPS</div>
    <div class="lists">
      <div class="col-lg-4 col-md-6">
        <div class="list">
          <div class="thumb">
            <img src="@/assets/thumb-img.png" alt>
          </div>
          <div class="desc">
            <div class="tps">TPS 02</div>
            <div class="tps-location">Yogyakarta, Sleman, Depok, Condongcatur</div>
            <div class="profile">
              <div class="profile-thumb">
                <img class="image" src="@/assets/user.svg" alt="avatar">
              </div>
              <div class="user-name">Anik Kemala</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="list">
          <div class="thumb">
            <img src="@/assets/thumb-img.png" alt>
          </div>
          <div class="desc">
            <div class="tps">TPS 02</div>
            <div class="tps-location">Yogyakarta, Sleman, Depok, Condongcatur</div>
            <div class="profile">
              <div class="profile-thumb">
                <img class="image" src="@/assets/user.svg" alt="avatar">
              </div>
              <div class="user-name">Anik Kemala</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="list">
          <div class="thumb">
            <img src="@/assets/thumb-img.png" alt="">
          </div>
          <div class="desc">
            <div class="tps">TPS 02</div>
            <div class="tps-location">Yogyakarta, Sleman, Depok, Condongcatur</div>
            <div class="profile">
              <div class="profile-thumb">
                <img class="image" src="@/assets/user.svg" alt="avatar">
              </div>
              <div class="user-name">Anik Kemala</div>
            </div>
          </div>
        </div>
       </div>
       <div class="col-lg-4 col-md-6">
        <div class="list">
          <div class="thumb">
            <img src="@/assets/thumb-img.png" alt="">
          </div>
          <div class="desc">
            <div class="tps">TPS 02</div>
            <div class="tps-location">Yogyakarta, Sleman, Depok, Condongcatur</div>
            <div class="profile">
              <div class="profile-thumb">
                <img class="image" src="@/assets/user.svg" alt="avatar">
              </div>
              <div class="user-name">Anik Kemala</div>
            </div>
          </div>
        </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListKeseruan'
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
    .thumb
      height: 170px
      img
        width: 100%
        height: 100%
        object-fit: cover
    .desc
      padding: 15px
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
</style>
