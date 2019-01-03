<template>
  <transition-group name="modal">
    <div key="2" class="modal-wrapper">
      <div class="modal-container">
        <slot name="modal-content">default Modal</slot>
      </div>
    </div>
    <div key="1" class="modal-mask" @click.stop="$emit('close-request')"></div>
  </transition-group>
</template>

<script>
export default {
  name: 'Modal'
}
</script>
