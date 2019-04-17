<template>
  <div class="explore-dprd-kabupaten">
    <breadcrumbs :base="$route.path" :items="breadcrumbs">
      <template slot="item-renderer" slot-scope="props">
        <router-link :to="{ path: $route.path, query: props.item.query }">{{props.item.text}}</router-link>
      </template>
    </breadcrumbs>
    <ul class="list" v-if="level <= 3">
      <li class="item" v-for="item in items" :key="item.id" :data-name="item.name">
        <card-presiden :item="item" @click="onItemClick(item.region.code)"></card-presiden>
      </li>
    </ul>
    <ul class="list" v-if="level === 4">
      <li class="item" v-for="item in items" :key="item.id">
        <card-pengguna :item="item"
          :tps-number="item.tps"
          :tps-location="`${item.province.name}, ${item.regency.name}, ${item.district.name}, ${item.village.name}`"
          :with-header="true"
          @click="onUserClick(item.id, item.user.id)"
        ></card-pengguna>
      </li>
    </ul>
    <div v-if="level === 5 && form != null">
      <card-pengguna
        :item="form.real_count"
        :tps-number="form.real_count.tps"
        :tps-location="`${form.real_count.province.name}, ${form.real_count.regency.name}, ${form.real_count.district.name}, ${form.real_count.village.name}`"
        :disabled="true"
      ></card-pengguna>
      <card-presiden :item="president" :transparent="true"></card-presiden>
      <card-data-pemilih :item="form"></card-data-pemilih>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Merayakan/Explore/breadcrumb'
import CardListItem from '@/components/Merayakan/Explore/card-list-item'
import CardPresiden from '@/components/Merayakan/Explore/card-presiden'
import CardPengguna from '@/components/Merayakan/Explore/card-pengguna'
import CandidateCard from '@/components/Merayakan/Explore/candidate-card'
import CityCard from '@/components/Merayakan/Explore/city-card'
import CardDataPemilih from '@/components/Merayakan/Explore/card-data-pemilih'
import * as PerhitunganAPI from '@/services/api/perhitungan'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Explore--President',
  components: {
    CardListItem,
    Breadcrumbs,
    CandidateCard,
    CityCard,
    CardPresiden,
    CardPengguna,
    CardDataPemilih
  },
  computed: {
    ...mapGetters({
      getCandidates: 'perhitungan/candidates',
      getPresidents: 'perhitungan/presidentsByLevel',
      realCounts: 'perhitungan/realCountsByVillage',
      realCountById: 'perhitungan/realCount'
    }),
    nasionalCode() {
      return Number(this.$route.query.nasional)
    },
    kotaCode() {
      return Number(this.$route.query.kota)
    },
    kecamatanCode() {
      return Number(this.$route.query.kecamatan)
    },
    desaCode() {
      return Number(this.$route.query.desa)
    },
    regionCode() {
      return Number(this.$route.query.region) || null
    },
    realCountId() { return this.$route.query.realCountId },
    userId() { return this.$route.query.userId },
    user() {
      if (this.form == null) return {}
      return this.form.real_count.user
    },
    realCount() { return this.realCountById(this.realCountId) },
    president() {
      if (this.level < 5) return {}
      return this.getPresidents(this.level + 1)
        .find(it => it.region.code === this.desaCode) || {}
    },
    dapil() {
      return this.dapilById(this.dapilId)
    },
    level() {
      return Number(this.$route.query.level || 0)
    },
    dapilId() {
      return this.$route.query.dapil
    },
    items() {
      if (this.level > 3) return this.realCounts(this.regionCode)
      const items = this.getPresidents(this.level)
      if (this.regionCode == null) return items
      return items.filter(it => it.region.parentCode === this.regionCode)
    },
    breadcrumbs() {
      const breadcrumbs = [{ query: { level: 0 }, text: 'Nasional' }]
      if (this.level >= 1)
        breadcrumbs.push({
          query: {
            level: 1,
            nasional: this.nasionalCode,
            region: this.nasionalCode
          },
          text: 'Kabupaten/Kota'
        })
      if (this.level >= 2)
        breadcrumbs.push({
          query: {
            level: 2,
            nasional: this.nasionalCode,
            kota: this.kotaCode,
            region: this.kotaCode
          },
          text: 'Kecamatan'
        })
      if (this.level >= 3)
        breadcrumbs.push({
          query: {
            level: 3,
            nasional: this.nasionalCode,
            kota: this.kotaCode,
            kecamatan: this.kecamatanCode,
            region: this.kecamatanCode
          },
          text: 'Desa/Kelurahan'
        })
      if (this.level >= 4)
        breadcrumbs.push({
          query: {
            level: 4,
            nasional: this.nasionalCode,
            kota: this.kotaCode,
            kecamatan: this.kecamatanCode,
            desa: this.desaCode,
            region: this.desaCode
          },
          text: 'Pengguna'
        })
      if (this.level >= 5) {
        breadcrumbs.push({
          query: {
            level: 5,
            nasional: this.nasionalCode,
            kota: this.kotaCode,
            kecamatan: this.kecamatanCode,
            desa: this.desaCode,
            region: this.desaCode,
            realCountId: this.realCountId,
            userId: this.userId
          },
          text: this.user.full_name
        })
      }
      return breadcrumbs
    },
    form() {
      if (this.level !== 5) return null
      return this.$store.getters['perhitungan/form'](this.realCountId)
    }
  },
  watch: {
    level: {
      immediate: true,
      handler(level) {
        console.log('level changed')
        if (level <= 3) this.getPresidentSummary({ region: this.regionCode, level })
        if (level > 3) this.getRealCounts({ villageCode: this.desaCode })
        if (level === 5) this.getForm({ realCountId: this.realCountId, type: 'presiden' })
      }
    },
    realCount: {
      immediate: true,
      handler(realCount) {
        console.log('real count changed' )
        if (realCount == null) return
        if (realCount.logs.form_c1.presiden) {
          this.getPresident({ region: this.desaCode, tps: realCount.tps, realCountId: realCount.id, level: 6 })
        }
      }
    },
  },
  methods: {
    ...mapActions({
      listCandidates: 'perhitungan/getCandidates',
      getCandidatesSummary: 'perhitungan/getCandidatesSummary',
      getPresidentSummary: 'perhitungan/getPresidentSummary',
      getPresident: 'perhitungan/getPresident',
      getRealCounts: 'perhitungan/getRealCounts',
      getForm: 'perhitungan/getFormC1',
    }),
    onUserClick(realCountId, userId) {
      console.log('realcount-id', realCountId);
      this.$router.push({
        path: this.$route.path,
        query: {
          level: 5,
          nasional: this.nasionalCode,
          kota: this.kotaCode,
          kecamatan: this.kecamatanCode,
          desa: this.desaCode,
          realCountId,
          userId
        }
      })
    },
    onItemClick(code) {
      this.$router.push({
        path: this.$route.path,
        query: {
          level: this.level + 1,
          nasional: this.level === 0 ? code : this.nasionalCode,
          kota: this.level === 1 ? code : this.kotaCode,
          kecamatan: this.level === 2 ? code : this.kecamatanCode,
          desa: this.level === 3 ? code : this.desaCode,
          region: code
        }
      })
    }
  }
}
</script>
