<template>
  <div class="explore-dprd-kabupaten">
    <breadcrumbs :base="$route.path" :items="breadcrumbs">
      <template slot="item-renderer" slot-scope="props">
        <router-link :to="{ path: $route.path, query: props.item.query }">{{props.item.text}}</router-link>
      </template>
    </breadcrumbs>

    <ul class="list" v-if="directory === 'candidate'">
      <li class="item">
        <city-card :item="dapil" @click="onItemClick(dapil.code)"></city-card>
      </li>
      <li class="item" v-for="item in items" :key="item.id">
        <candidate-card :candidate="item" :with-header="true"></candidate-card>
      </li>
    </ul>
    <ul class="list" v-else-if="directory === 'user' && form == null">
      <li class="item" v-for="item in items" :key="item.id">
        <card-pengguna
          :item="item"
          :tps-number="item.tps"
          :tps-location="`${item.province.name}, ${item.regency.name}, ${item.district.name}, ${item.village.name}`"
          @click="onItemClick(item.id)"
        ></card-pengguna>
      </li>
    </ul>
    <div v-else-if="directory === 'user' && form != null">
      <card-pengguna
        :item="form.real_count"
        :tps-number="form.real_count.tps"
        :tps-location="`${form.real_count.province.name}, ${form.real_count.regency.name}, ${form.real_count.district.name}, ${form.real_count.village.name}`"
        :disabled="true"
      ></card-pengguna>
      <card-suara
        v-if="dapil != null"
        :valid-vote="dapil.validVote"
        :invalid-vote="dapil.invalidVote"
      ></card-suara>
      <candidate-card
        v-for="candidate in candidates"
        :key="candidate.id"
        :candidate="candidate"
        :with-header="true"
      ></candidate-card>
      <card-data-pemilih :item="form"></card-data-pemilih>
    </div>
    <ul class="list" v-else>
      <li class="item" v-for="item in items" :key="item.id" :data-name="item.name">
        <card-list-item :text="item.name" @click="onItemClick(item.code)"></card-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Merayakan/Explore/breadcrumb'
import CardListItem from '@/components/Merayakan/Explore/card-list-item'
import CardPengguna from '@/components/Merayakan/Explore/card-pengguna'
import CardSuara from '@/components/Merayakan/Explore/card-suara'
import CardDataPemilih from '@/components/Merayakan/Explore/card-data-pemilih'
import CandidateCard from '@/components/Merayakan/Explore/candidate-card'
import CityCard from '@/components/Merayakan/Explore/city-card'
import * as PerhitunganAPI from '@/services/api/perhitungan'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Explore--DprdKabupaten',
  components: {
    CardListItem,
    Breadcrumbs,
    CandidateCard,
    CityCard,
    CardPengguna,
    CardSuara,
    CardDataPemilih,
  },
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
      realCounts: 'perhitungan/realCountsByDapil',
      formByRealCountId: 'perhitungan/form'
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
    dapil() {
      return this.dapilById(this.dapilId)
    },
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
    dapilId() {
      return this.$route.query.dapil
    },
    items() {
      if (this.directory === 'national')
        return this.$store.getters['perhitungan/provinces']
      if (this.directory === 'regency')
        return this.getRegencies(this.provinceCode)
      if (this.directory === 'dapil') return this.getDapils(this.regencyCode)
      if (this.directory === 'district')
        return this.getDistricts(this.regencyCode)
      if (this.directory === 'village')
        return this.getVillages(this.districtCode)
      if (this.directory === 'candidate')
        return this.getCandidates(this.dapilId)
      if (this.directory === 'user') {
        return this.realCounts(this.dapilId)
      }
    },
    user() {
      if (this.form == null) return {}
      return this.form.real_count.user
    },
    breadcrumbs() {
      const breadcrumbs = [{ query: { d: 'national' }, text: 'Nasional' }]
      if (this.provinceCode != null)
        breadcrumbs.push({
          query: { d: 'regency', province: this.provinceCode },
          text: 'Kabupaten/Kota'
        })
      if (this.regencyCode != null)
        breadcrumbs.push({
          query: {
            d: 'dapil',
            province: this.provinceCode,
            regency: this.regencyCode
          },
          text: 'Dapil'
        })
      if (this.districtCode != null && this.district != null)
        breadcrumbs.push({
          query: {
            d: 'village',
            province: this.provinceCode,
            regency: this.regencyCode,
            district: this.districtCode
          },
          text: this.district.name
        })
      if (this.dapilId != null && this.dapil != null)
        breadcrumbs.push({
          query: {
            d: 'candidate',
            province: this.provinceCode,
            regency: this.regencyCode,
            dapil: this.dapilId
          },
          text: this.dapil.name
        })
      if (this.directory === 'user' && this.realCountId != null) {
        breadcrumbs.push({
          query: {
            d: 'user',
            province: this.provinceCode,
            regency: this.regencyCode,
            dapil: this.dapilId,
            realCountId: this.realCountId
          },
          text: this.user.full_name
        })
      }
      return breadcrumbs
    },
    realCountId() {
      return this.$route.query.realCountId
    },
    realCount() {
      if (this.realCountId == null) return {}
      return this.realCounts(this.realCountId)
    },
    form() {
      return this.formByRealCountId(this.realCountId)
    },
    candidates() {
      return this.getCandidates(this.dapilId)
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler($route) {
        const {
          d,
          province,
          regency,
          district,
          dapil,
          realCountId
        } = $route.query
        if (d === 'national') this.listProvinces()
        if (d === 'user') this.listRealCounts({ dapilId: dapil })
        if (province != null) this.listRegencies(province)
        if (regency != null) {
          this.listDistricts(regency)
          this.listDapils({ provinceCode: province, regencyCode: regency })
        }
        if (district != null) this.listVillages(district)
        if (dapil != null) {
          this.listCandidates({ dapilId: dapil }).then(() => {
            this.getCandidatesSummary({ dapilId: dapil, level: 2 })
          })
        }
        if (realCountId != null) {
          this.getForm({ realCountId, type: 'kabupaten' })
        }
      }
    }
  },
  methods: {
    ...mapActions({
      listProvinces: 'perhitungan/getProvinces',
      listRegencies: 'perhitungan/getRegencies',
      listDistricts: 'perhitungan/getDistricts',
      listVillages: 'perhitungan/getVillages',
      listDapils: 'perhitungan/getDapils',
      listCandidates: 'perhitungan/getCandidates',
      listRealCounts: 'perhitungan/getRealCounts',
      getCandidatesSummary: 'perhitungan/getCandidatesSummary',
      getForm: 'perhitungan/getFormC1'
    }),
    onItemClick(code) {
      let directory = null
      if (this.directory === 'national') directory = 'regency'
      else if (this.directory === 'regency') directory = 'dapil'
      else if (this.directory === 'dapil') directory = 'candidate'
      else if (this.directory === 'district') directory = 'village'
      else if (this.directory === 'candidate') directory = 'user'
      else directory = this.directory
      this.$router.push({
        path: this.$route.path,
        query: {
          d: directory,
          province: this.directory === 'national' ? code : this.provinceCode,
          regency: this.directory === 'regency' ? code : this.regencyCode,
          district: this.directory === 'district' ? code : this.districtCode,
          dapil: this.directory === 'dapil' ? code : this.dapilId,
          village: this.directory === 'village' ? code : this.villageCode,
          realCountId: this.directory === 'user' ? code : this.realCountId
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
