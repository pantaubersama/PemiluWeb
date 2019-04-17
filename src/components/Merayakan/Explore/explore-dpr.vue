<template>
  <div class="explore-dprd-kabupaten">
    <breadcrumbs :base="$route.path" :items="breadcrumbs">
      <template slot="item-renderer" slot-scope="props">
        <router-link
          :to="{ path: $route.path, query: props.item.query }">
          {{props.item.text}}
        </router-link>
      </template>
    </breadcrumbs>
    <ul class="list" v-if="directory !== 'candidate'">
      <li class="item" v-for="item in items" :key="item.id" :data-name="item.name">
        <card-list-item :text="item.name" @click="onItemClick(item.code)"></card-list-item>
      </li>
    </ul>
    <ul class="list" v-if="directory === 'candidate'">
      <li class="item">
        <city-card :item="dapil"></city-card>
      </li>
      <li class="item" v-for="item in items" :key="item.id">
        <candidate-card :candidate="item" :with-header="true"></candidate-card>
      </li>
    </ul>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Merayakan/Explore/breadcrumb'
import CardListItem from '@/components/Merayakan/Explore/card-list-item'
import CandidateCard from '@/components/Merayakan/Explore/candidate-card'
import CityCard from '@/components/Merayakan/Explore/city-card'
import * as PerhitunganAPI from '@/services/api/perhitungan'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Explore--Dpr',
  components: { CardListItem, Breadcrumbs, CandidateCard, CityCard },
  computed: {
    ...mapGetters({
      getRegencies: 'perhitungan/regencies',
      getDistricts: 'perhitungan/districts',
      getVillages: 'perhitungan/villages',
      getDapils: 'perhitungan/dapilsByTingkat',
      getCandidates: 'perhitungan/candidates',
      provinceById: 'perhitungan/province',
      regencyById: 'perhitungan/regency',
      districtById: 'perhitungan/district',
      villageById: 'perhitungan/village',
      dapilById: 'perhitungan/dapil',
    }),
    province() {
      return this.provinceById(this.provinceCode)
    },
    dapil() { return this.dapilById(this.dapilId) },
    directory() {
      return this.$route.query.d || 'national'
    },
    provinceCode() {
      return this.$route.query.province
    },
    dapilId() { return this.$route.query.dapil },
    items() {
      if (this.directory === 'national')
        return this.$store.getters['perhitungan/provinces']
      if (this.directory === 'dapil')
        return this.getDapils('dpr')
          .filter(it => it.provinceCode === this.provinceCode)
      if (this.directory === 'candidate')
        return this.getCandidates(this.dapilId)
    },
    breadcrumbs() {
      const breadcrumbs = [{ query: { d: 'national' }, text: 'Nasional' }]
      if (this.provinceCode != null)
        breadcrumbs.push({ query: { d: 'dapil', province: this.provinceCode }, text: 'Dapil' })
      if (this.dapilId != null && this.dapil != null)
        breadcrumbs.push({ query: { d: 'candidate', province: this.provinceCode, regency: this.regencyCode, dapil: this.dapilId }, text: this.dapil.name })
      return breadcrumbs
    }
  },
  watch: {
    provinceCode: {
      immediate: true,
      handler(code) {
        if (code != null) this.listDapils({ provinceCode: code, tingkat: 'dpr' })
      }
    },
    dapilId: {
      immediate: true,
      handler(id) {
        if (id == null) return
        this.listCandidates({ dapilId: id, tingkat: 'dpr' })
        this.getCandidatesSummary({ dapilId: id, level: 0 })
      }
    },
  },
  mounted() {
    return this.listProvinces()
  },
  methods: {
    ...mapActions({
      listProvinces: 'perhitungan/getProvinces',
      listDapils: 'perhitungan/getDapils',
      listCandidates: 'perhitungan/getCandidates',
      getCandidatesSummary: 'perhitungan/getCandidatesSummary',
    }),
    onItemClick(code) {
      let directory = null
      if (this.directory === 'national') directory = 'dapil'
      else if (this.directory === 'dapil') directory = 'candidate'
      else directory = this.directory
      this.$router.push({
        path: this.$route.path,
        query: {
          d: directory,
          province: this.directory === 'national' ? code : this.provinceCode,
          dapil: this.directory === 'dapil' ? code : this.dapilId,
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
