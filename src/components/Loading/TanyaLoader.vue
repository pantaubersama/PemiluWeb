<template>
  <content-loader
    :height="120"
    :width="490"
    :speed="2"
    primaryColor="#dadada"
    secondaryColor="#b7b7b7"
  >
    <path transform="translate(5,10)" d="M24,33H12V19.5H4.2L18,3.7l13.8,15.8H24V33z M15,30h6V16.5h4.2L18,8.3l-7.2,8.2H15V30z"/>
    <rect x="13" y="50" rx="3" ry="3" width="20" height="6.4" />
    <circle cx="79" cy="27" r="15" />
    <rect x="100" y="18" rx="3" ry="3" width="50" height="6.4" />
    <rect x="100" y="30" rx="3" ry="3" width="90" height="6.4" />
    <rect x="450" y="20" rx="3" ry="3" width="20" height="6.4" />
    <rect x="65" y="55" rx="3" ry="3" width="380" height="6.4" />
    <rect x="65" y="67" rx="3" ry="3" width="360" height="6.4" />
    <rect x="65" y="79" rx="3" ry="3" width="340" height="6.4" />
    <rect x="420" y="96" rx="3" ry="3" width="20" height="6.4" />
    <rect x="450" y="96" rx="3" ry="3" width="20" height="6.4" />
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
