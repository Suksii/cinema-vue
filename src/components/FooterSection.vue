<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>
<template>
  <div class="flex justify-center items-center gap-2 w-full h-18 bg-secondary">
    <p class="text-white text-lg">
      Copyright {{ currentYear }} &copy; Šućo Ramović
    </p>
  </div>
</template>
