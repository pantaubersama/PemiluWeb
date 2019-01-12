<template>
  <div class="card widget-blog">
    <div class="blog-caption">
      <p>
        {{ this.bannerJanjiPolitikData ? bannerJanjiPolitikData.body : '' }}
        <a
          class="read-more"
        >Read more…</a>
      </p>
    </div>
    <img
      :src="this.bannerJanjiPolitikData ? bannerJanjiPolitikData.header_image.url : ''"
      :alt="this.bannerJanjiPolitikData ? bannerJanjiPolitikData.title : ''"
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LiniMasaWidgetBannerJanjiPolitik',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      bannerJanjiPolitikData: 'bannerJanjiPolitikData'
    })
  },
  methods: {
    ...mapActions(['fetchBannerInfo'])
  },
  mounted() {
    this.fetchBannerInfo('janji politik')
  }
}
</script>
