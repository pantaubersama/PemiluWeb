<template>
  <LayoutTimeline>
    <template slot="main-content">
      <ComingSoon/>
    </template>
    <template slot="widget-wrapper">&nbsp;</template>
  </LayoutTimeline>
</template>

<script>
import LayoutTimeline from '@/layout/Timeline'
import ComingSoon from '@/components/ComingSoon'
export default {
  name: 'Lapor',
  components: {
    LayoutTimeline,
    ComingSoon
  }
}
</script>
