<template>
  <modal class="modal-request-cluster">
    <template slot="modal-content">
      <div class="modal-header">
        <div class="description">
          Cluster menunjukkan preferensi kelompok kamu.
          Seperti wadah berisi kumpulan user yang memiliki kesamaan
          suatu hal; misalnya partai, alumni kampus, sekolah, organisasi,
          dan/atau komunitas tertentu. Dalam Cluster, kamu bisa menemukan
          atau mengumpulkan user-user lain dengan minat selaras.
        </div>
        <button class="close-btn" @click="$emit('close-request')">
          <i class="icon icon-close"></i>
        </button>
      </div>
      <div class="modal-content">
        <form @submit.prevent="submit($event)">
          <div class="card avatar">
            <icon-avatar v-if="avatarURL == null"></icon-avatar>
            <img v-else class="avatar" :src="avatarURL">
            <button
              type="button"
              class="add-image"
              @click="() => $refs.inputFile.click()"
            >Tambah Gambar</button>
            <input
              ref="inputFile"
              type="file"
              name="avatar"
              id="avatar"
              style="display: none"
              accept="image/*"
              @change="inputAvatarChanged($event)"
            >
          </div>
          <div class="card">
            <div class="card-column" :class="{'input': true, 'is-danger': errors.has('name') }">
              <label for="name">Nama</label>
              <input
                v-validate="'required'"
                data-vv-validate-on="blur|input"
                type="text"
                id="name"
                name="name"
                :class="{'input': true, 'is-danger': errors.has('name') }"
                v-model="name"
              >
              <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </div>
            <div
              class="card-column category-dropdown"
              :class="{'input': true, 'is-danger': validCategory }"
            >
              <label for="category">Kategori</label>
              <button
                type="button"
                id="category"
                name="category"
                class="category-btn"
                :class="{'is-active': isDropdownCategoryActive}"
                @click.stop="toggleDropdown()"
              >
                <template v-if="selectedCategory">
                  <span>{{selectedCategory.name}}</span>
                </template>
                <template v-else>
                  <span>-</span>
                </template>
                <i class="icon icon-chevron-down"></i>
              </button>
              <div class="dropdown-content">
                <div class="custom-container">
                  <label for="custom-category">Tambah Kategori Baru</label>
                  <input
                    type="text"
                    name="custom-category"
                    id="custom-category"
                    v-model="inputCustomCategory"
                    @keydown.enter="addCategory()"
                  >
                  <button type="button" class="add-category" @click.stop="addCategory()">
                    <i class="icon icon-add"></i>
                  </button>
                </div>
                <button
                  type="button"
                  class="category-item"
                  v-for="category in categories"
                  :key="category.id"
                  @click.stop="setCategory(category.id)"
                >{{category.name}}</button>
              </div>
              <span v-if="validCategory" class="help is-danger">* Wajib Diisi.</span>
            </div>
            <div class="card-column">
              <label for="description">Deskripsi</label>
              <input type="text" id="description" name="description" v-model="description">
            </div>
          </div>

          <input v-if="isSubmitting" type="submit" value="Sending" disabled class="btn btn-outline">
          <input v-else type="submit" value="Request" class="btn btn-outline">
        </form>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/layout/Modal'
import { IconAvatar } from '@/svg/icons'
import { mapState } from 'vuex'
export default {
  name: 'ModalRequestCluster',
  components: { Modal, IconAvatar },
  data() {
    return {
      name: '',
      description: '',
      inputCustomCategory: '',
      selectedCategoryId: -1,
      isDropdownCategoryActive: false,
      validCategory: false,
      isSubmitting: false,
      avatarURL: null,
      avatarFile: null
    }
  },
  computed: {
    ...mapState({
      categories: s => s.profile.categories
    }),
    selectedCategory() {
      return this.categories.find(it => it.id === this.selectedCategoryId)
    }
  },
  mounted() {
    this.$store.dispatch('profile/getClusterCategories')
  },
  methods: {
    submit(event) {
      if (this.selectedCategoryId === -1) {
        this.validCategory = true
      }
      this.$validator.validateAll().then(result => {
        if (result && !this.validCategory) {
          this.isSubmitting = true
          const name = event.target['name'].value
          const categoryId = this.selectedCategoryId
          const description = event.target['description'].value
          const avatarFile = this.avatarFile

          this.$store
            .dispatch('profile/createCluster', {
              name,
              categoryId,
              description,
              avatarFile
            })
            .then(() => {
              this.isSubmitting = false
              this.$emit('close-request')
            })
        }
      })
    },
    toggleDropdown() {
      this.isDropdownCategoryActive = !this.isDropdownCategoryActive
      if (!this.isDropdownCategoryActive && this.selectedCategoryId == -1) {
        this.validCategory = true
      }
    },
    addCategory() {
      if (this.inputCustomCategory.length <= 0) return
      this.$store
        .dispatch('profile/createCategories', this.inputCustomCategory)
        .then(() => {
          this.inputCustomCategory = ''
        })
    },
    setCategory(id) {
      this.isDropdownCategoryActive = false
      this.selectedCategoryId = id
      this.validCategory = false
    },
    inputAvatarChanged(event) {
      const file = Array.from(event.target.files).pop()
      if (this.avatarURL != null) URL.revokeObjectURL(this.avatarURL)
      this.avatarFile = file
      this.avatarURL = URL.createObjectURL(file)
    }
  },
  created() {
    document.documentElement.className = 'overflow-y-hidden'
  },
  destroyed() {
    document.documentElement.className = ''
  }
}
</script>

<style lang="sass" scoped>
img.avatar
  height: 48px
  width: 48px
  object-fit: cover
  border-radius: 50%
.card-column.category-dropdown
  position: relative
.category-btn
  text-align: left
  height: 30px
  cursor: pointer
  display: flex
  align-items: center
  border: none
  background: none
  span
    min-width: 50px
  .icon.icon-chevron-down
    background-color: grey
    -webkit-mask: url(~@/assets/icon-chevron-down.svg)
    display: inline-block
    height: 25px
    width: 25px
    flex: 0
    flex-basis: 25px
.category-btn.is-active + .dropdown-content
  display: block
  right: auto
  left: 0
.category-item
  padding: 5px 10px
  height: 44px
  display: flex
  align-items: center
  width: 100%
  border: none
  background: none
  font-size: 12px
  font-weight: bold
  line-height: 1.25
  color: #111111
  cursor: pointer
.dropdown-content
  padding: 0
.dropdown-content > *
  border-bottom: 1px solid #ececec
  &:last-child
    border-bottom: none
</style>
