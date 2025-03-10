<script setup>
import { ref, watchEffect } from "vue";
import MovieCard from "./MovieCard.vue";
import { request } from "@/api";

const moviesData = ref([]);
const pageNum = ref(1);

watchEffect(async () => {
  try {
    const {
      data: { results },
    } = await request.get(`discover/movie?page=${pageNum.value}`);
    moviesData.value = results;
  } catch (err) {
    console.log(err);
  }
});
</script>
<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8"
  >
    <div
      class="flex justify-center items-center h-full"
      v-for="movie of moviesData"
      :key="movie.id"
    >
      <MovieCard
        :id="movie.id"
        :title="movie.title"
        :year="movie.release_date.split('-')[0]"
        :rating="vote_average"
        :imageUrl="movie.poster_path"
        imageWidth="w500"
      />
    </div>
  </div>
  <div class="flex items-center gap-4"></div>
</template>
