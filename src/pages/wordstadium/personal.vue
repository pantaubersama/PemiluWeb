<template>
  <div class="debat-list-container has--separator">
    <div class="debat-title">
      <h3 class="title">Linimasa Debat</h3>
      <p class="description">
        Daftar challenge dan debat yang akan atau sudah berlangsung ditampilkan
        semua disini.
      </p>
    </div>

    <div class="debat-list-container">
      <debat-list :debat="comingSoon" link="/wordstadium/coming-soon">
        <template slot="meta">
          <i class="icon icon-outline-lawan"></i>
          <div class="title">Challenge in Progress</div>
        </template>
        <template slot="debat-item" slot-scope="props">
          <panel-debat-coming-soon :debat="props.item"></panel-debat-coming-soon>
        </template>
      </debat-list>
    </div>

    <div class="debat-list-container">
      <div class="debat-title">
        <h3 class="title">My Wordstadium</h3>
        <p class="description">
          Daftar tantangan dan debat yang akan atau sudah kamu ikuti ditampilkan semua disini.
        </p>
      </div>
      <debat-list :debat="challenges" link="/wordstadium/challenge">
        <template slot="meta">
          <i class="icon icon-debat-challenge"></i>
          <div class="title">Challenge</div>
        </template>
        <template slot="debat-item" slot-scope="props">
          <panel-debat-challenge :debat="props.item"></panel-debat-challenge>
        </template>
      </debat-list>
    </div>
  </div>
</template>

<script>
import WordstadiumLiveList from '@/components/wordstadium/live-list'
import CardDebat from '@/components/wordstadium/card-debat'
import DebatList from '@/pages/wordstadium/debat-list'
import PanelDebatComingSoon from '@/components/wordstadium/panel-debat-coming-soon'
import PanelDebatChallenge from '@/components/wordstadium/panel-debat-challenge'
export default {
  name: 'WordstadiumPublic',
  components: {
    DebatList,
    CardDebat,
    WordstadiumLiveList,
    PanelDebatComingSoon,
    PanelDebatChallenge
  },
  computed: {
    ongoing() {
      return this.$store.getters['wordstadium/ongoing']()
    },
    challenges() {
      return this.ongoing
    },
    lives() {
      return []
    }
  },
  mounted() {},
  methods: {}
}
</script>
