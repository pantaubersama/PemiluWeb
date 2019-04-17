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
  name: 'Explore--Dpd',
  components: { CardListItem, Breadcrumbs, CandidateCard, CityCard },
  computed: {
    ...mapGetters({
      getDapils: 'perhitungan/dapilsByTingkat',
      getCandidates: 'perhitungan/candidates',
      dapilById: 'perhitungan/dapil',
    }),
    dapil() { return this.dapilById(this.dapilId) },
    directory() {
      return this.$route.query.d || 'national'
    },
    dapilId() { return this.$route.query.dapil },
    items() {
      if (this.directory === 'national')
        return this.getDapils('dpd')
      if (this.directory === 'candidate')
        return this.getCandidates(this.dapilId)
    },
    breadcrumbs() {
      const breadcrumbs = [{ query: { d: 'national' }, text: 'Nasional' }]
      if (this.dapilId != null && this.dapil != null)
        breadcrumbs.push({ query: { d: 'candidate', province: this.provinceCode, regency: this.regencyCode, dapil: this.dapilId }, text: this.dapil.name })
      return breadcrumbs
    }
  },
  watch: {
    dapilId: {
      immediate: true,
      async handler(id) {
        if (id == null) return
        await this.listCandidates({ dapilId: id, tingkat: 'dpd' })
        await this.getCandidatesSummary({ dapilId: id, level: 3 })
      }
    },
  },
  mounted() {
    return this.listDapils({ tingkat: 'dpd' })
  },
  methods: {
    ...mapActions({
      listDapils: 'perhitungan/getDapils',
      listCandidates: 'perhitungan/getCandidates',
      getCandidatesSummary: 'perhitungan/getCandidatesSummary',
    }),
    onItemClick(code) {
      let directory = null
      if (this.directory === 'national') directory = 'candidate'
      else directory = this.directory
      this.$router.push({
        path: this.$route.path,
        query: {
          d: directory,
          dapil: this.directory === 'national' ? code : this.dapilId,
        }
      })
    }
  }
}
</script>
