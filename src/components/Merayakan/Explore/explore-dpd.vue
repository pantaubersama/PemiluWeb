<template>
  <div class="explore-dprd-kabupaten">
    <breadcrumbs :base="$route.path" :items="breadcrumbs">
      <template slot="item-renderer" slot-scope="props">
        <router-link :to="{ path: $route.path, query: props.item.query }">{{props.item.text}}</router-link>
      </template>
    </breadcrumbs>
    <ul class="list" v-if="directory === 'candidate'">
      <li class="item">
        <city-card :item="dapil" @click="onItemClick(dapil.id)"></city-card>
      </li>
      <li class="item" v-for="item in items" :key="item.id">
        <candidate-card :candidate="item"></candidate-card>
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
import CandidateCard from '@/components/Merayakan/Explore/candidate-card'
import CardPengguna from '@/components/Merayakan/Explore/card-pengguna'
import CardSuara from '@/components/Merayakan/Explore/card-suara'
import CardDataPemilih from '@/components/Merayakan/Explore/card-data-pemilih'
import CityCard from '@/components/Merayakan/Explore/city-card'
import * as PerhitunganAPI from '@/services/api/perhitungan'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Explore--Dpd',
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
      getDapils: 'perhitungan/dapilsByTingkat',
      getCandidates: 'perhitungan/candidates',
      realCounts: 'perhitungan/realCountsByDapil',
      dapilById: 'perhitungan/dapil',
      formByRealCountId: 'perhitungan/form'
    }),
    dapil() {
      return this.dapilById(this.dapilId)
    },
    directory() {
      return this.$route.query.d || 'national'
    },
    dapilId() {
      return this.$route.query.dapil
    },
    realCountId() {
      return this.$route.query.realCountId
    },
    candidates() {
      return this.getCandidates(this.dapilId)
    },
    form() {
      return this.formByRealCountId(this.realCountId)
    },
    user() {
      if (this.form == null) return {}
      return this.form.real_count.user
    },
    items() {
      if (this.directory === 'national') return this.getDapils('dpd')
      if (this.directory === 'candidate')
        return this.getCandidates(this.dapilId)
      if (this.directory === 'user') return this.realCounts(this.dapilId)
    },
    breadcrumbs() {
      const breadcrumbs = [{ query: { d: 'national' }, text: 'Nasional' }]
      if (this.dapilId != null && this.dapil != null) {
        breadcrumbs.push({
          query: {
            d: 'candidate',
            dapil: this.dapilId
          },
          text: this.dapil.name
        })
      }
      if (this.directory === 'user') {
        breadcrumbs.push({
          query: {
            d: 'user',
            dapil: this.dapilId
          },
          text: 'Pengguna'
        })
      }
      return breadcrumbs
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler($route) {
        const { d, dapil, realCountId } = $route.query
        this.listDapils({ tingkat: 'dpd' })
        if (d === 'user') this.listRealCounts({ dapilId: dapil })
        if (realCountId != null) this.getForm({ realCountId, type: 'dpd' })
        if (dapil != null) {
          this.listCandidates({ dapilId: dapil, tingkat: 'dpd' }).then(() => {
            this.getCandidatesSummary({ dapilId: dapil, level: 3 })
          })
        }
      }
    }
  },
  methods: {
    ...mapActions({
      listDapils: 'perhitungan/getDapils',
      listCandidates: 'perhitungan/getCandidates',
      listRealCounts: 'perhitungan/getRealCounts',
      getCandidatesSummary: 'perhitungan/getCandidatesSummary',
      getForm: 'perhitungan/getFormC1'
    }),
    onItemClick(code) {
      let directory = null
      if (this.directory === 'national') directory = 'candidate'
      else if (this.directory === 'candidate') directory = 'user'
      else directory = this.directory
      this.$router.push({
        path: this.$route.path,
        query: {
          d: directory,
          dapil: this.directory === 'national' ? code : this.dapilId,
          realCountId: this.directory === 'user' ? code : this.realCountId
        }
      })
    }
  }
}
</script>
