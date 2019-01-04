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
            <div class="card-column">
              <label for="category">Kategori</label>
              <select id="category" name="category" :value="category">
                <option value="partai" selected>Partai</option>
                <option value="bukan partai">Bukan Partai</option>
              </select>
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
  name: 'ModalChangePassword',
  components: { Modal, IconAvatar },
  props: ['name', 'category', 'description'],
  methods: {
    submit(event) {
      const name = event.target['name'].value
      const category = event.target['category'].value
      const description = event.target['description'].value
      this.$emit('submit', {
        name: name,
        category: category,
        description: description
      })
    }
  }
}
</script>
