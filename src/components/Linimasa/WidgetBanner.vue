<template>
  <div class="card widget-blog">
    <div class="blog-caption">
      <p>
        {{ (this.data && this.data.body) ? trimCharacters(this.data.body, 137) : '' }}
        <a
          class="read-more"
        >Read more…</a>
      </p>
    </div>
    <img
      :src="(this.data && this.data.header_image) ? this.data.header_image.url : ''"
      :alt="(this.data && this.data.title) ? this.data.title : ''"
    >
  </div>
</template>

<script>
export default {
  name: 'LiniMasaWidgetBanner',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    trimCharacters(text, maxLength = 137) {
      const dots = text.length > maxLength
      if (dots) {
        text = text.substr(0, maxLength)
        text = text.substr(0, Math.min(text.length, text.lastIndexOf(' ')))
      }
      return dots ? `${text}` : text
    }
  }
}
</script>
