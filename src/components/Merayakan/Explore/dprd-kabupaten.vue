<template>
  <div class="explore-dprd-kabupaten">
    <breadcrumbs base="/merayakan/explore/dprd-kabupaten" :items="breadcrumbs">
      <template slot="item-renderer" slot-scope="props">
        <router-link
          :to="{ name: 'MerayakanExplore', params: { type: 'dprd-kabupaten' }, query: props.item.query }">
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
      <li class="item"><city-card :item="dapil"></city-card></li>
      <li class="item" v-for="item in items" :key="item.id">
        <candidate-card :candidate="item"></candidate-card>
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
  name: 'Explore--DprdKabupaten',
  components: { CardListItem, Breadcrumbs, CandidateCard, CityCard },
  computed: {
    ...mapGetters({
      getRegencies: 'perhitungan/regencies',
      getDistricts: 'perhitungan/districts',
      getVillages: 'perhitungan/villages',
      getDapils: 'perhitungan/dapils',
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
    regency() {
      return this.regencyById(this.regencyCode)
    },
    district() {
      return this.districtById(this.districtCode)
    },
    village() {
      return this.villageById(this.villageCode)
    },
    dapil() { return this.dapilById(this.dapilId) },
    directory() {
      return this.$route.query.d || 'national'
    },
    provinceCode() {
      return this.$route.query.province
    },
    regencyCode() {
      return this.$route.query.regency
    },
    districtCode() {
      return this.$route.query.district
    },
    villageCode() {
      return this.$route.query.village
    },
    dapilId() { return this.$route.query.dapil },
    items() {
      if (this.directory === 'national')
        return this.$store.getters['perhitungan/provinces']
      if (this.directory === 'regency')
        return this.getRegencies(this.provinceCode)
      if (this.directory === 'dapil')
        return this.getDapils(this.regencyCode)
      if (this.directory === 'district')
        return this.getDistricts(this.regencyCode)
      if (this.directory === 'village')
        return this.getVillages(this.districtCode)
      if (this.directory === 'candidate')
        return this.getCandidates(this.dapilId)
    },
    breadcrumbs() {
      const breadcrumbs = [{ query: { d: 'national' }, text: 'Nasional' }]
      if (this.provinceCode != null)
        breadcrumbs.push({ query: { d: 'regency', province: this.provinceCode }, text: 'Kabupaten/Kota' })
      if (this.regencyCode != null)
        breadcrumbs.push({ query: { d: 'dapil', province: this.provinceCode, regency: this.regencyCode }, text: 'Dapil' })
      if (this.districtCode != null && this.district != null)
        breadcrumbs.push({ query: { d: 'village', province: this.provinceCode, regency: this.regencyCode, district: this.districtCode }, text: this.district.name })
      if (this.dapilId != null && this.dapil != null)
        breadcrumbs.push({ query: { d: 'candidate', province: this.provinceCode, regency: this.regencyCode, dapil: this.dapilId }, text: this.dapil.name })
      return breadcrumbs
    }
  },
  watch: {
    provinceCode: {
      immediate: true,
      handler(code) {
        if (code != null) this.listRegencies(code)
      }
    },
    regencyCode: {
      immediate: true,
      handler(code) {
        if (code == null) return
        this.listDistricts(code)
        this.listDapils({ provinceCode: this.provinceCode, regencyCode: code })
      }
    },
    districtCode: {
      immediate: true,
      handler(code) {
        if (code == null) return
        this.listVillages(code)
      }
    },
    dapilId: {
      immediate: true,
      handler(id) {
        if (id == null) return
        this.listCandidates({ dapilId: id })
      }
    },
  },
  mounted() {
    return this.listProvinces()
  },
  methods: {
    ...mapActions({
      listProvinces: 'perhitungan/getProvinces',
      listRegencies: 'perhitungan/getRegencies',
      listDistricts: 'perhitungan/getDistricts',
      listVillages: 'perhitungan/getVillages',
      listDapils: 'perhitungan/getDapils',
      listCandidates: 'perhitungan/getCandidates',
    }),
    onItemClick(code) {
      let directory = null
      if (this.directory === 'national') directory = 'regency'
      else if (this.directory === 'regency') directory = 'dapil'
      else if (this.directory === 'dapil') directory = 'candidate'
      else if (this.directory === 'district') directory = 'village'
      else directory = this.directory
      this.$router.push({
        name: 'MerayakanExplore',
        params: { type: this.$route.params.type },
        query: {
          d: directory,
          province: this.directory === 'national' ? code : this.provinceCode,
          regency: this.directory === 'regency' ? code : this.regencyCode,
          district: this.directory === 'district' ? code : this.districtCode,
          dapil: this.directory === 'dapil' ? code : this.dapilId,
          village: this.directory === 'village' ? code : this.villageCode
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
