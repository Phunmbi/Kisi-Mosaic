<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    required: true,
    default: null
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="error-container">
    <h2> {{ error?.statusCode }} -  Looks like we lost you. </h2>
    <button @click="handleError">
      Return home.
    </button>
  </div>
</template>

<style lang="scss">
@use '~/assets/error.scss';
</style>
