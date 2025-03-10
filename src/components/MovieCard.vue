<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  id: Number,
  title: String,
  year: String,
  rating: Number,
  imageUrl: String,
  imageWidth: String,
});
</script>

<template>
  <div
    class="relative h-full rounded-xl bg-gray-400 group overflow-hidden duration-300"
  >
    <img
      :src="'https://image.tmdb.org/t/p/' + imageWidth + '/' + imageUrl"
      :alt="title"
      class="w-full h-full object-cover"
    />
    <div
      class="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gray-800/90 flex flex-col justify-between duration-700 p-4"
    >
      <div
        class="flex flex-col items-center justify-center gap-4 text-white text-2xl font-semibold"
      >
        <div class="flex flex-col items-center justify-center text-center">
          <h3 class="text-center">{{ title }}</h3>
          <p class="text-center">{{ year.split("-")[0] }}</p>
        </div>
        <div class="flex gap-2 items-center justify-center">
          <Icon icon="ic:baseline-star" width="24" height="24" color="yellow" />
          <span>{{ Number(rating).toFixed(1) }}</span>
        </div>
      </div>
      <RouterLink
        :to="'/movie/' + id"
        class="text-white text-center text-lg py-2 px-3 w-full mx-auto bg-gray-500/50 rounded-full"
        >See more</RouterLink
      >
    </div>
  </div>
</template>
