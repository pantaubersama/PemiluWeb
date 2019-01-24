<template>
  <div class="card card-hint">
    <div class="hint-thumb">
      <img :src="object.header_image.large.url" alt="image">
    </div>
    <div class="hint-wrapper">
      <div class="hint-title">{{ object.title }}</div>
      <div class="hint-content">
        <p v-html="object.body"></p>
        <img :src="object.image.large.url" alt="thumbnail">
        Informasi lebih lengkap kunjungi:
        <a
          href="https://pantaubersama.com"
          target="_blank"
        >www.pantaubersama.com</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiniMasaHintBanner',
  props: {
    object: {
      type: Object
    }
  }
  // methods: {
  //   getOrDefault(value) {
  //     if (!this.object) return ''
  //     return value
  //   }
  // }
}
</script>
