<script setup>
const loading = ["L", "o", "a", "d", "i", "n", "g", ".", ".", "."];
</script>
<template>
  <div class="w-full flex justify-center items-center gap-2">
    <div
      class="text-white text-2xl bounce"
      v-for="(item, index) in loading"
      :key="index"
      :style="{ animationDelay: `${index * 100}ms` }"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
    color: #e50914;
  }
}

.bounce {
  animation: bounce 1s infinite ease-in-out;
}
</style>
