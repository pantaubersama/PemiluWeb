<template>
  <div class="card-content">
    <div class="top">
      <div class="avatar">
        <a href="#">
          <img v-if="avatarURL" :src="avatarURL">
          <img v-else src="@/assets/user.svg">
        </a>
      </div>
      <h5>
        {{name}},
        <span v-if="cluster">{{cluster}}</span>
      </h5>
      <span class="right">{{time}}</span>
    </div>
    <h4 class="title">{{title}}</h4>
    <p>{{text}}</p>
    <span class="icon-right">
      <a href="#">
        <img src="@/assets/icon_share.svg">
      </a>
      <a href="#" class="icon-setting">
        <icon-dots></icon-dots>
      </a>
    </span>
  </div>
</template>

<script>
import { IconDots } from '@/svg/icons'

export default {
  name: 'JanjiPolitikCard',
  props: ['avatarURL', 'name', 'cluster', 'time', 'title', 'text'],
  components: { IconDots }
}
</script>
