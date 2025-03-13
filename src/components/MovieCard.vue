<script setup>
import { useFunctionsStore } from "@/store/functionsStore";
import { Icon } from "@iconify/vue";

defineProps({
  id: Number,
  title: String,
  year: String,
  rating: Number | String,
  imageUrl: String,
  imageWidth: String,
});

const { voteAverage } = useFunctionsStore();
</script>

<template>
  <div
    class="relative w-full h-full rounded-xl bg-gray-300 group overflow-hidden duration-300"
    style="box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.5)"
  >
    <img
      :src="'https://image.tmdb.org/t/p/' + imageWidth + '/' + imageUrl"
      :alt="title"
      class="w-full h-full object-cover text-center"
    />
    <div
      class="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-secondary/90 flex flex-col justify-between duration-700 p-4"
    >
      <div
        class="flex flex-col items-center justify-center gap-4 text-white text-2xl font-semibold"
      >
        <div class="flex flex-col items-center justify-center text-center">
          <h3 class="text-center line-clamp-3">{{ title }}</h3>
          <p class="text-center">{{ year.split("-")[0] }}</p>
        </div>
        <div class="flex gap-2 items-center justify-center">
          <Icon icon="ic:baseline-star" width="24" height="24" color="yellow" />
          <span v-if="rating">{{ voteAverage(rating) }}</span>
          <span v-else> --</span>
        </div>
      </div>
      <RouterLink
        :to="'/movie/' + id"
        class="text-white text-center text-lg py-2 px-3 w-full mx-auto bg-primary hover:bg-hoverPrimary shadow-md rounded-full duration-200"
        >See more</RouterLink
      >
    </div>
  </div>
</template>
