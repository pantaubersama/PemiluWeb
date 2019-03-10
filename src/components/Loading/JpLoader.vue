<template>
  <content-loader
    :height="155"
    :width="490"
    :speed="2"
    primaryColor="#dadada"
    secondaryColor="#b7b7b7"
  >
    <circle cx="35" cy="29.7" r="11.7"/>
    <rect x="55" y="26" rx="3" ry="3" width="170" height="6.4" />
    <rect x="445" y="26" rx="3" ry="3" width="20" height="6.4" />
    <rect x="25" y="51" rx="3" ry="3" width="420" height="6.4" />
    <rect x="25" y="65" rx="3" ry="3" width="320" height="6.4" />
    <rect x="25" y="85" rx="3" ry="3" width="420" height="6.4" />
    <rect x="25" y="99" rx="3" ry="3" width="420" height="6.4" />
    <rect x="25" y="114" rx="3" ry="3" width="320" height="6.4" />
    <rect x="415" y="126" rx="3" ry="3" width="20" height="6.4" />
    <rect x="445" y="126" rx="3" ry="3" width="20" height="6.4" />

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
