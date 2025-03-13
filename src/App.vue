<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div
    class="min-h-screen relative bg-gradient-to-tl from-secondary via-[#2a2a2a] to-tertiary"
  >
    <div class="absolute top-0 w-full z-50">
      <Navbar />
    </div>
    <RouterView />
  </div>
</template>

<style scoped></style>
