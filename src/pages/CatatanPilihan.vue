<template>
  <timeline-layout>
    <div slot="main-content" class="page">
      <CatatanResult/>
      <CatatanPartai/>
    </div>
    <div slot="widget-wrapper"></div>
  </timeline-layout>
</template>

<script>
import TimelineLayout from '@/layout/Timeline'

import CatatanResult from '@/components/CatatanPilihan/CatatanResult'
import CatatanPartai from '@/components/CatatanPilihan/CatatanPartai'

export default {
  name: 'CatatanPilihan',
  components: {
    TimelineLayout,
    CatatanResult,
    CatatanPartai
  },
  computed: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>
