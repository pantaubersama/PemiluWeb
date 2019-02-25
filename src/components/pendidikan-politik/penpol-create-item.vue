<template>
  <div class="create-post" @click.stop="$emit('clicked')">
    <div class="card-content">
      <div class="top">
        <div class="avatar">
            <img :src="avatar" v-if="avatar && avatar.length > 0" alt="avatar">
            <img src="@/assets/user.svg" alt="avatar" v-else>
        </div>
        <h5>{{ author_name }}</h5>
      </div>
      <h4 class="title">{{ info }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PendidikanPolitikCreateItem',
  props: {
    avatar: String,
    author_name: String,
    info: {
      type: String,
      default:
        'Ada pertanyaan untuk Calon Presiden dan Calon Wakil Presiden 2019-2024?'
    }
  }
}
</script>
