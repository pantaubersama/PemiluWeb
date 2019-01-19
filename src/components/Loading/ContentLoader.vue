<template>
  <content-loader
    :height="120"
    :width="490"
    :speed="2"
    primaryColor="#dadada"
    secondaryColor="#b7b7b7"
  >
    <rect x="90" y="20" rx="4" ry="4" width="170" height="6.4"/>
    <rect x="90" y="37" rx="3" ry="3" width="220" height="6.4"/>
    <rect x="90" y="54" rx="3" ry="3" width="350" height="6.4"/>
    <rect x="90" y="71" rx="3" ry="3" width="380" height="6.4"/>
    <rect x="90" y="88" rx="3" ry="3" width="201" height="6.4"/>
    <circle cx="40" cy="60" r="20"/>
    <circle cx="70" cy="25" r="10"/>
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
