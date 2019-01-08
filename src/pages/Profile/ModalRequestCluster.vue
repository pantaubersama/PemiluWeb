<template>
  <modal @close-request="() => $emit('close-request')" class="modal-request-cluster">
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
            <icon-avatar></icon-avatar>
            <button class="add-image">Tambah Gambar</button>
          </div>
          <div class="card">
            <div class="card-column">
              <label for="name">Nama</label>
              <input type="text" id="name" name="name" :value="name">
            </div>
            <div class="card-column category-dropdown">
              <label for="category">Kategori</label>
              <button
                type="button"
                id="category"
                name="category"
                class="category-btn"
                :class="{'is-active': isDropdownCategoryActive}"
                @click.stop="toggleDropdown()"
              >
                {{selectedCategory}}
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
                  <button class="add-category" @click.stop="addCategory()">
                    <i class="icon icon-add"></i>
                  </button>
                </div>
                <button
                  type="button"
                  class="category-item"
                  v-for="category in categories"
                  :key="category"
                  @click.stop="setCategory(category)"
                >{{category}}</button>
              </div>
            </div>
            <div class="card-column">
              <label for="description">Deskripsi</label>
              <input type="text" id="description" name="description" :value="description">
            </div>
          </div>
          <input type="submit" value="Request" class="btn btn-outline">
        </form>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/layout/Modal'
import { IconAvatar } from '@/svg/icons'
export default {
  name: 'ModalRequestCluster',
  components: { Modal, IconAvatar },
  props: ['name', 'category', 'description'],
  data() {
    return {
      inputCustomCategory: '',
      selectedCategory: 'komunitas',
      categories: ['komunitas', 'universitas', 'perusahaan'],
      isDropdownCategoryActive: false
    }
  },
  methods: {
    submit(event) {
      const name = event.target['name'].value
      const category = this.selectedCategory
      const description = event.target['description'].value
      this.$emit('submit', {
        name: name,
        category: category,
        description: description
      })
    },
    toggleDropdown() {
      this.isDropdownCategoryActive = !this.isDropdownCategoryActive
    },
    addCategory() {
      if (this.inputCustomCategory.length <= 0) return
      this.categories = [this.inputCustomCategory, ...this.categories]
      this.inputCustomCategory = ''
    },
    setCategory(category) {
      this.selectedCategory = category
      this.isDropdownCategoryActive = false
    }
  }
}
</script>

<style lang="sass" scoped>
.custom-container
  display: flex
  flex-direction: column
  position: relative
  padding: 10px
  label
    font-size: 12px
    line-height: 1.25
    color: #4f4f4f
    font-style: normal
  input[type=text]
    background: none
    border: 1px solid #ececec
    border-radius: 3px
    padding: 10px 5px
  button
    background: #9b0012
    border: none
    border-top-right-radius: 3px
    border-bottom-right-radius: 3px
    position: absolute
    bottom: 10px
    right: 10px
    top: 33px
    cursor: pointer
    .icon.icon-add
      background: white no-repeat
      -webkit-mask: url(~@/assets/icon-add.svg)
      display: block
      height: 25px
      width: 25px
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
