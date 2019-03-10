<template>
  <content-loader
    :height="100"
    :width="490"
    :speed="2"
    primaryColor="#dadada"
    secondaryColor="#b7b7b7"
  >
    <circle cx="35" cy="50" r="16.1"/>
    <rect x="68" y="26" rx="3" ry="3" width="170" height="6.4" />
    <rect x="68" y="41" rx="3" ry="3" width="400" height="6.4" />
    <rect x="68" y="56" rx="3" ry="3" width="320" height="6.4" />
    <rect x="68" y="71" rx="3" ry="3" width="60" height="6.4" />
  </content-loader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  }
}
</script>
