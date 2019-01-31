/**
 * Visit https://gist.github.com/lancejpollard/1978404
 *
 * @param {title of page} title
 * @param {meta tags title} content
 * @param {meta tags description} description
 * @param {meta tags image} image
 * @param {meta tags url} url
 */
export const meta = ({ title, content, description, image, url }) => {
  const app = {
    name: process.env.APP_NAME,
    author: process.env.APP_AUTHOR,
    description: process.env.APP_DESCRIPTION,
    keywords: process.env.APP_KEYWORDS,
    sosmed: {
      twitter: process.env.APP_SOSMED_TWITTER,
      facebook: process.env.APP_SOSMED_FACEBOOK
    }
  }

  return {
    title: title,
    meta: [
      {
        name: 'author',
        content: app.author
      },
      {
        name: 'copyright',
        content: app.author
      },
      {
        name: 'application-name',
        content: app.name
      },
      {
        property: 'url',
        content: url
      },
      {
        property: 'type',
        content: 'website'
      },
      // meta tags for google
      {
        name: 'description',
        content: app.description
      },
      {
        name: 'keywords',
        content: app.keywords
      },
      // meta tags for OpenGraph
      {
        property: 'og:title',
        vmid: 'og:title',
        content: content
      },
      {
        property: 'og:type',
        vmid: 'og:type',
        content: 'article'
      },
      {
        property: 'og:image',
        vmid: 'og:image',
        content: image
      },
      {
        property: 'og:image:type',
        content: 'image/png'
      },
      {
        property: 'og:image:alt',
        content: app.name
      },
      {
        property: 'og:url',
        vmid: 'og:url',
        content: url
      },
      {
        name: 'og:site_name',
        content: app.name
      },
      {
        property: 'og:description',
        vmid: 'og:description',
        content: description
      },
      // meta tags for twitter
      {
        property: 'twitter:card',
        vmid: 'twitter:card',
        content: 'summary'
      },
      {
        property: 'twitter:site',
        content: `@${app.sosmed.twitter}`
      },
      {
        property: 'twitter:creator',
        content: app.sosmed.twitter
      },
      {
        property: 'twitter:title',
        vmid: 'twitter:title',
        content: content
      },
      {
        property: 'twitter:description',
        vmid: 'twitter:description',
        content: description
      },
      {
        property: 'twitter:image',
        vmid: 'twitter:image',
        content: image
      }
    ]
  }
}
