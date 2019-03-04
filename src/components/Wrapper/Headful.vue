<template>
  <vue-headful
    :image="image"
    :url="url"
    :description="description"
    :name="name"
    :head="{
       'meta[name=description]': {content: appDescription},
       'meta[name=application-name]': {content: name},
       'meta[name=copyright]': {content: name},
       'meta[name=author]': {content: author},
       'meta[name=keywords]': {content: keywords},
     }"
  />
</template>

<script>
// Docs: https://github.com/troxler/vue-headful
import { heads } from '@/utils/data'

export default {
  name: 'WrapperHeadful',
  props: {
    // availables type value: janji_politik; tanya; kuis; hasil_kuis; kecenderungan; badge
    type: {
      type: String,
      validator: value => {
        return heads.map(type => type.type).indexOf(value) !== -1
      }
    },
    title: String,
    image: String,
    url: String
  },
  computed: {
    fullTitle() {
      return `${this.title} | ${this.name}`
    },
    description() {
      if (!heads) return null
      const findTitle = heads.find(head => head.type === this.type)
      if (!findTitle) return null
      return findTitle.title
    },
    appDescription() {
      const appDescription = process.env.APP_DESCRIPTION
      if (!appDescription) return null
      return appDescription
    },
    keywords() {
      const appKeywords = process.env.APP_KEYWORDS
      if (!appKeywords) return null
      return appKeywords
    },
    name() {
      const appName = process.env.APP_NAME
      if (!appName) return null
      return appName
    },
    author() {
      const appAuthor = process.env.APP_AUTHOR
      if (!appAuthor) return null
      return appAuthor
    }
  }
}
</script>
