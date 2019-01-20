export const utils = {
  methods: {
    trimCharacters(text, maxLength = 355) {
      if (!text) return text
      const dots = text.length > maxLength
      const string = text.substr(0, maxLength)
      const result = string.substr(
        0,
        Math.min(string.length, string.lastIndexOf(' '))
      )
      return dots ? `${result}...` : result
    },
    setName(name) {
      if (!name || !name.length) return 'Unknown'
      return name
    }
  }
}
