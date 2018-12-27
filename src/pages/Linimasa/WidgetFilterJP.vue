<template>
<div class="card widget-filter">
  <button class="button-filter" id="button-filter" :class="{'is-active': isActive}" @click="toggleDropdown($event)">
    Filter
    <i class="icon icon-filter">
      <img src="../../assets/icon-filter.svg" alt="">
    </i>
  </button>

  <div class="dropdown-content" @click.stop>
    <div class="dropdown-title">User</div>
    <ul>
      <li>
        <input type="radio" id="user1" name="radio-group" checked>
        <label for="user1">Semua</label>
      </li>
      <li>
        <input type="radio" id="user2" name="radio-group">
        <label for="user2">Belum Verifikasi</label>
      </li>
      <li>
        <input type="radio" id="user3" name="radio-group">
        <label for="user3">Terverifikasi</label>
      </li>
    </ul>
    <div class="dropdown-title">Cluster</div>
    <div class="cluster-search">
      <input type="text" >
    </div>
    <div class="button-filter-group">
      <button class="btn btn-primary" @click="close()">Terapkan</button>
      <button class="btn btn-outline" @click="close()">Reset</button>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'WidgetFilterJP',
    data () {
      return {
        isActive: false
      }
    },
    mounted (){
      window.addEventListener('click', this.removeDropdown)
    },
    methods: {
      toggleDropdown (event) {
        this.isActive = !this.isActive
      },
      close(){
        this.isActive = false
      },
      removeDropdown () {
        var isClickOutside = !event.target.parentNode.classList.contains('widget-filter') && !event.target.parentNode.classList.contains('icon-filter')
        if(isClickOutside) {
          this.isActive = false
        }
      }
    }
  }
</script>
