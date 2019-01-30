export const meta = ({ title, content, description, image, url }) => {
  return {
    title: title,
    meta: [
      {
        name: 'author',
        content: 'pantaubersama'
      },
      {
        name: 'copyright',
        content: 'pantaubersama'
      },
      {
        name: 'application-name',
        content: 'pantaubersama'
      },
      // meta for google
      {
        name: 'description',
        content: ''
      },
      {
        name: 'keywords',
        content: 'pantau, pemilu, pantau pemilu, pesta demokrasi, indonesia'
      },
      // meta for: facebook
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
        property: 'og:url',
        vmid: 'og:url',
        content: url
      },
      {
        property: 'og:description',
        vmid: 'og:description',
        content: description
      },
      // meta for twitter
      {
        property: 'twitter:card',
        vmid: 'twitter:card',
        content: 'summary'
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
