<script setup>
import Navbar from './components/Navbar.vue';
import HomeView from './views/HomeView.vue';
</script>

<template>
  <div class="min-h-screen relative">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped></style>
