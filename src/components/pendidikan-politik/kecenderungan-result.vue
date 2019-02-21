<template>
  <div class="card card-quiz-result">
    <Headful
      type="kecenderungan"
      title="Hasil Kecenderunganmu"
      :image="totalKecenderungan.image"
      :url="fullURL"
    />
    <div class="quiz-content">
      <div class="quiz-description">
        <h5 class="title">RESULT</h5>
        <p>
          Total kecenderungan {{ totalKecenderungan.finishedQuiz }} dari {{ totalKecenderungan.totalQuiz }} Kuis
          <br>
          <strong>{{ totalKecenderungan.fullName }}</strong>
          lebih suka jawaban dari
          <br>
          {{ totalKecenderungan.groupName }}
        </p>
      </div>
      <div class="quiz-description--curve">&nbsp;</div>
      <div class="quiz-description--content">
        <img
          class="thumbnail rounded-circle"
          :src="totalKecenderungan.groupAvatar"
          :alt="totalKecenderungan.groupName"
          v-if="totalKecenderungan.groupAvatar"
        >
        <img class="thumbnail rounded-circle" src="@/assets/user.svg" alt="paslon" v-else>
        <h6 class="percentage">{{ totalKecenderungan.percentage }}%</h6>
        <span class="subtitle">{{ totalKecenderungan.groupName }}</span>
        <a
          href="javascript:void(0)"
          class="share"
          @click.prevent="share('/share/kecenderungan/', totalKecenderungan.userId)"
        >
          <share-icon></share-icon>BAGIKAN
        </a>
      </div>
    </div>
    <div class="quiz-background">
      <orange-wave-background></orange-wave-background>
    </div>

    <ModalShare
      v-if="isSharing"
      :url="shareURL"
      :id="shareId"
      :title="'Hmm.. Ternyata begini kecenderunganku 👀'"
      @close="isSharing = false"
    />
  </div>
</template>

<script>
import Headful from '@/components/Wrapper/Headful'

import { ShareIcon } from '@/svg/icons'
import { OrangeWaveBackground } from '@/svg/backgrounds'
import ModalShare from '@/components/modal-share'

export default {
  name: 'KecenderunganResult',
  components: {
    Headful,
    OrangeWaveBackground,
    ShareIcon,
    ModalShare
  },
  props: {
    totalKecenderungan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isSharing: false,
      shareURL: null,
      shareId: null
    }
  },
  computed: {
    fullURL() {
      const baseURL = process.env.BASE_URL
      if (!this.$route.path) return baseURL
      return `${baseURL}${this.$route.path}`
    }
  },
  methods: {
    share(url, id) {
      this.shareURL = url
      this.shareId = id
      this.isSharing = true
    }
  }
}
</script>
