<template>
  <div class="card widget-blog">
    <div class="blog-caption">
      <p>
        {{ this.bannerPilpresData ? bannerPilpresData.body : '' }}
        <a class="read-more">Read more…</a>
      </p>
    </div>
    <img
      :src="this.bannerPilpresData ? bannerPilpresData.header_image.url : ''"
      :alt="this.bannerPilpresData ? bannerPilpresData.title : ''"
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LiniMasaWidgetBannerPilpres',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      bannerPilpresData: 'bannerPilpresData'
    })
  },
  methods: {
    ...mapActions(['fetchBannerInfo'])
  },
  mounted() {
    this.fetchBannerInfo('pilpres')
  }
}
</script>
