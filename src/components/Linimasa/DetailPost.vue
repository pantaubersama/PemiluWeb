<template>
  <div class="card-detail-wrapper">
    <div class="card card-detail">
      <div class="detail-title">{{ data.title }}</div>
      <div class="content-wrapper">
        <div class="detail-cluster">
          <div class="cluster-thumb">
            <img :src="data.creator.cluster.image.thumbnail_square.url" alt="thumbnail">
          </div>
          <div class="cluster-content">
            <h5>{{ data.creator.cluster.name }}</h5>
            <p>{{ `${data.creator.cluster.members_count} anggota` }}</p>
          </div>
          <a href class="icon-setting">
            <icon-dots/>
          </a>
        </div>
        <div class="detail-content">
          <p v-html="data.body"></p>
          <img :src="data.image.large.url" alt="thumbnail" v-if="data.image.large.url">
        </div>
        <div class="detail-share">
          <button class="btn" id="button-share">
            BAGIKAN
            <img src="@/assets/icon_share.svg" alt>
          </button>
        </div>
      </div>
    </div>
    <div class="card card-author">
      <div class="author-thumb">
        <img :src="data.creator.avatar.medium_square.url" alt>
      </div>
      <div class="author-name">{{ data.creator.full_name }}</div>
      <p>{{ data.creator.about }}</p>
      <div class="time-posted">Posted {{ data.created_at_in_word.id }}</div>
    </div>
  </div>
</template>
<script>
import { IconDots } from '@/svg/icons'

export default {
  name: 'DetailPost',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    IconDots
  }
}
</script>
