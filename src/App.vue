<script setup>
import { useRoute } from "vue-router";
import FooterSection from "./components/FooterSection.vue";
import Navbar from "./components/Navbar.vue";

const route = useRoute();
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
  <div v-if="route.name !== 'movie'">
    <FooterSection />
  </div>
</template>

<style scoped></style>
