<template>
  <div class="explore-dprd-kabupaten">
    <breadcrumbs :base="$route.path" :items="breadcrumbs">
      <template slot="item-renderer" slot-scope="props">
        <router-link :to="{ path: $route.path, query: props.item.query }">{{props.item.text}}</router-link>
      </template>
    </breadcrumbs>
    <ul class="list" v-if="directory === 'user' && realCountId == null">
      <li class="item" v-for="item in items" :key="item.id">
        <card-pengguna
          :item="item"
          :tps-number="item.tps"
          :tps-location="`${item.province.name}, ${item.regency.name}, ${item.district.name}`"
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
      <card-suara v-if="dapil != null" :valid-vote="dapil.validVote" :invalid-vote="dapil.invalidVote"></card-suara>
      <candidate-card v-for="candidate in candidates"
        :key="candidate.id"
        :candidate="candidate"
        :with-header="true"
      ></candidate-card>
      <card-data-pemilih :item="form"></card-data-pemilih>
    </div>
    <ul class="list" v-else-if="directory === 'candidate'">
      <li class="item">
        <city-card :item="dapil" @click="onItemClick()"></city-card>
      </li>
      <li class="item" v-for="item in items" :key="item.id">
        <candidate-card :candidate="item" :with-header="true"></candidate-card>
      </li>
    </ul>
    <ul class="list" v-else>
      <li class="item" v-for="item in items" :key="item.id" :data-name="item.name">
        <card-list-item :text="item.name" @click="onItemClick(item.code)"></card-list-item>
      </li>
    </ul>


  </div>
</template>

<script>
import Breadcrumbs from '@/components/Merayakan/Explore/breadcrumb'
import CardPengguna from '@/components/Merayakan/Explore/card-pengguna'
import CardSuara from '@/components/Merayakan/Explore/card-suara'
import CardDataPemilih from '@/components/Merayakan/Explore/card-data-pemilih'
import CardListItem from '@/components/Merayakan/Explore/card-list-item'
import CandidateCard from '@/components/Merayakan/Explore/candidate-card'
import CityCard from '@/components/Merayakan/Explore/city-card'
import * as PerhitunganAPI from '@/services/api/perhitungan'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Explore--DprdProvinsi',
  components: {
    CardListItem,
    Breadcrumbs,
    CandidateCard,
    CityCard,
    CardPengguna,
    CardSuara,
    CardDataPemilih
  },
  computed: {
    ...mapGetters({
      getRegencies: 'perhitungan/regencies',
      getDistricts: 'perhitungan/districts',
      getVillages: 'perhitungan/villages',
      getDapils: 'perhitungan/dapilsByTingkat',
      getCandidates: 'perhitungan/candidates',
      realCounts: 'perhitungan/realCountsByDapil',
      provinceById: 'perhitungan/province',
      regencyById: 'perhitungan/regency',
      districtById: 'perhitungan/district',
      villageById: 'perhitungan/village',
      dapilById: 'perhitungan/dapil',
      realCountById: 'perhitungan/realCount',
      formByRealCountId: 'perhitungan/form'
    }),
    province() {
      return this.provinceById(this.provinceCode)
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
    dapilId() {
      return this.$route.query.dapil
    },
    form() {
      return this.formByRealCountId(this.realCountId)
    },
    user() {
      if (this.form == null) return {}
      return this.form.real_count.user
    },
    candidates() {
      return this.getCandidates(this.dapilId)
    },
    realCountId() {
      return this.$route.query.realCountId
    },
    realCount() {
      return this.realCountById(this.realCountId)
    },
    items() {
      if (this.directory === 'national')
        return this.$store.getters['perhitungan/provinces']
      if (this.directory === 'dapil')
        return this.getDapils('provinsi')
          .filter(it => it.provinceCode === this.provinceCode)
      if (this.directory === 'candidate')
        return this.getCandidates(this.dapilId)
      if (this.directory === 'user') {
        return this.realCounts(this.dapilId)
      }
    },
    breadcrumbs() {
      const breadcrumbs = [{ query: { d: 'national' }, text: 'Nasional' }]
      if (this.provinceCode != null) {
        breadcrumbs.push({
          query: { d: 'dapil', province: this.provinceCode },
          text: 'Dapil'
        })
      }
      if (this.dapilId != null && this.dapil != null) {
        breadcrumbs.push({
          query: {
            d: 'candidate',
            province: this.provinceCode,
            regency: this.regencyCode,
            dapil: this.dapilId
          },
          text: this.dapil.name
        })
      }
      if (this.directory === 'user') {
        breadcrumbs.push({
          query: {
            d: 'user',
            province: this.provinceCode,
            regency: this.regencyCode,
            dapil: this.dapilId
          },
          text: 'Pengguna'
        })
      }
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
  },
  watch: {
    $route: {
      immediate: true,
      async handler($route) {
        const { d, realCountId, province, dapil } = $route.query
        this.listProvinces()
        if (d === 'user') {
          this.listRealCounts({ dapilId: dapil })
        }
        if (realCountId != null) {
          this.getForm({ realCountId, type: 'provinsi' })
        }
        if (province != null) {
          this.listDapils({ provinceCode: province, tingkat: 'provinsi' })
        }
        if (dapil != null) {
          this.listCandidates({ dapilId: dapil, tingkat: 'provinsi' })
            .then(() => {
              this.getCandidatesSummary({ dapilId: dapil, level: 1, realCountId })
            })
        }
      }
    },
  },
  methods: {
    ...mapActions({
      listProvinces: 'perhitungan/getProvinces',
      listDapils: 'perhitungan/getDapils',
      listCandidates: 'perhitungan/getCandidates',
      getCandidatesSummary: 'perhitungan/getCandidatesSummary',
      listRealCounts: 'perhitungan/getRealCounts',
      getForm: 'perhitungan/getFormC1'
    }),
    onItemClick(code) {
      let directory = null
      if (this.directory === 'national') directory = 'dapil'
      else if (this.directory === 'dapil') directory = 'candidate'
      else if (this.directory === 'candidate') directory = 'user'
      else directory = this.directory
      this.$router.push({
        path: this.$route.path,
        query: {
          d: directory,
          province: this.directory === 'national' ? code : this.provinceCode,
          dapil: this.directory === 'dapil' ? code : this.dapilId,
          realCountId: this.directory === 'user' ? code : this.realCountId
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
