export const catatan = {
  data() {
    return {
      aliases: [
        "Jokowi - Ma'ruf",
        'Prabowo - Sandi',
        'Belum menentukan pilihan'
      ]
    }
  },
  methods: {
    nameOfPaslon(index) {
      return this.aliases[index - 1]
    },
    idOfPaslon(name) {
      return this.aliases.findIndex(alias => alias === name) + 2
    }
  }
}
