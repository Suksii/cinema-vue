<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen relative">
    <div class="absolute top-0 w-full z-50">
      <Navbar />
    </div>
    <RouterView />
  </div>
</template>

<style scoped></style>
