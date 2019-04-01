<template>
  <div class="card merayakan widget-blog">
    <div class="blog-caption">
      <p>
        {{ (this.data && this.data.body) ? trimCharacters(this.data.body, 137) : '' }}
        <a
          class="read-more"
        >Read more…</a>
      </p>
    </div>
    <!-- <img
      :src="(this.data && this.data.header_image) ? this.data.header_image.url : ''"
      :alt="(this.data && this.data.title) ? this.data.title : ''"
    > -->
    <PerhitunganIllustration />
  </div>
</template>

<script>
import { PerhitunganIllustration } from '@/svg/illustrations'
export default {
  name: 'MerayakanHint',
  // props: {
  //   data: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data() {
    return {
      data: {
        body: 'Halaman yg berisi partisipasi perhitungan para user Pantau Bersama, Rekapitulasi partisipatif real-time dan transparan.'
      }
    }
  },
  components: {
    PerhitunganIllustration
  },
  methods: {
    trimCharacters(text, maxLength = 137) {
      if (!text) return text
      const string = text.substr(0, maxLength)
      return string.substr(0, Math.min(string.length, string.lastIndexOf(' ')))
    }
  }
}
</script>

<style lang="sass">
.merayakan
  svg
    width: 100%
  @media (max-width: 575px)
    margin-bottom: 10px!important
</style>
