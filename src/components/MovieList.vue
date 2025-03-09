<script setup>
import { ref, watchEffect } from "vue";
import MovieCard from "./MovieCard.vue";
import { request } from "@/api";

const moviesData = ref([]);

watchEffect(async () => {
  try {
    const {
      data: { results },
    } = await request.get("discover/movie");
    moviesData.value = results;
    console.log(results);
  } catch (err) {
    console.log(err);
  }
});
</script>
<template>
  <div
    class="w-[90%] md:w-[70%] mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8"
  >
    <div
      class="flex justify-center items-center h-full"
      v-for="movie of moviesData"
      :key="movie.id"
    >
      <MovieCard
        :title="movie.original_title"
        :year="movie.release_date.split('-')[0]"
        :rating="movie.vote_average.toFixed(1)"
        :imageUrl="movie.poster_path"
        imageWidth="w500"
      />
    </div>
  </div>
</template>
