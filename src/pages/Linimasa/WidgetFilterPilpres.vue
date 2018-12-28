<template>
<div class="card widget-filter">
  <div class="button-reset">
    <button class="btn btn-outline">Reset</button>
  </div>
  <button class="button-filter" id="button-filter" :class="{'is-active': isActive}" @click="toggleDropdown($event)">
    Filter
    <i class="icon icon-filter">
      <img src="@/assets/icon-filter.svg" alt="">
    </i>
  </button>

  <div class="dropdown-content" @click.stop>
    <div class="dropdown-title">Sumber dari</div>
    <ul>
      <li>
        <input type="radio" id="sumber1" name="radio-group" checked>
        <label for="sumber1">Semua</label>
      </li>
      <li>
        <input type="radio" id="sumber2" name="radio-group">
        <label for="sumber2">Team Jokowi - Makruf</label>
      </li>
      <li>
        <input type="radio" id="sumber3" name="radio-group">
        <label for="sumber3">Team Prabowo - Sandi</label>
      </li>
    </ul>
    <div class="button-filter-group">
      <button class="btn btn-primary" @click="close()">Terapkan</button>
      <button class="btn btn-outline" @click="close()">Reset</button>
    </div>
  </div>
  
</div>
</template>

<script>
  export default {
    name: 'WidgetFilterPilpres',
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
