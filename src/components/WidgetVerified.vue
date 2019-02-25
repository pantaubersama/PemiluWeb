<template>
  <div class="card card-kenalan">
    <h4 class="title">Kenalan Pantau Bersama</h4>
    <div class="card-content">
      <ul>
        <li v-for="kenalan in feedsKenalan" :key="kenalan.id">
          <div v-if="kenalan.is_action == false">
            <div v-if="kenalan.id == '6c5ffd3d-219a-43e0-8035-c71af1459658'">
              <a
                :href="kenalan.link"
                target="_blank"
                class="active"
                @click="updateKenalan(kenalan.id)"
              >
                <check-icon/>
                {{kenalan.text}}
              </a>
            </div>

            <router-link v-else-if="
            kenalan.text != 'Kontribusi Perhitungan' &&
            kenalan.text != 'Kontribusi Lapor' &&
            kenalan.text != 'Ikut Debat'
            " class="active" :to="{path: '/'+ kenalan.link}">
              <check-icon/>
              {{kenalan.text}}
            </router-link>
          </div>
          <div class="content-past" v-else>
            <check-icon/>
            {{kenalan.text}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from '@/svg/icons'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'WidgetVerified',
  components: {
    CheckIcon
  },
  computed: {
    ...mapState('homeKenalan', ['feedsKenalan'])
  },
  created() {
    this.$store.dispatch('homeKenalan/homeKenalan')
  },
  methods: {
    updateKenalan(id) {
      this.$store.dispatch('homeKenalan/updateKenalan', { id: id })
    }
  }
}
</script>
