<template>
  <LayoutTimeline>
    <template slot="main-content">
      <ComingSoon/>
    </template>
    <template slot="widget-wrapper">
      <div class="d-none d-lg-block">&nbsp;</div>
    </template>
  </LayoutTimeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import ComingSoon from '@/components/ComingSoon'
export default {
  name: 'WordStadium',
  components: {
    LayoutTimeline,
    ComingSoon
  }
}
</script>
