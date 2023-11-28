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
  <div>
    <h2> Oooppssss {{ error?.statusCode }} </h2>
    <button @click="handleError">
      Clear error
    </button>
  </div>
</template>
