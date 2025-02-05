<template>
  <!-- <DangerNotification /> -->
  <RouterView />
  <AppFooter />
</template>

<script setup>
import AppFooter from './components/AppFooter.vue'
// import DangerNotification from './components/DangerNotification.vue'
import { RouterView } from 'vue-router'
</script>
