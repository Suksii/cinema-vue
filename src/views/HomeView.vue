<script setup>
import { request } from "@/api";
import MovieList from "@/components/MovieList.vue";
import Slider from "@/components/Slider.vue";
import { Icon } from "@iconify/vue";
import { ref, watchEffect } from "vue";

const popularMoviesData = ref([]);
const topRatedMoviesData = ref([]);

watchEffect(async () => {
  try {
    const {
      data: { results },
    } = await request.get("movie/popular");
    popularMoviesData.value = results;
  } catch (err) {
    console.error(err);
  }
});

watchEffect(async () => {
  try {
    const {
      data: { results },
    } = await request.get("movie/top_rated");
    topRatedMoviesData.value = results;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div class="w-[90%] md:w-[70%] mx-auto pt-22">
    <RouterLink
      to="/movies/popular"
      class="flex items-center w-fit border-l-8 border-primary cursor-pointer group duration-300"
    >
      <h2 class="text-2xl px-4 font-bold text-white">Popular Movies</h2>
      <Icon
        icon="fe:arrow-right"
        width="24"
        height="24"
        class="text-primary group-hover:scale-125 group-hover:translate-x-1 duration-300"
      />
    </RouterLink>
    <div class="py-12">
      <Slider :moviesData="popularMoviesData" />
    </div>
    <RouterLink
      to="/movies/top-rated"
      class="flex items-center w-fit border-l-8 border-primary cursor-pointer group duration-300"
    >
      <h2 class="text-2xl px-4 font-bold text-white">Top Rated Movies</h2>
      <Icon
        icon="fe:arrow-right"
        width="24"
        height="24"
        class="text-primary group-hover:scale-125 group-hover:translate-x-1 duration-300"
      />
    </RouterLink>
    <div class="py-12">
      <Slider :moviesData="topRatedMoviesData" />
    </div>
    <div class="flex items-center border-l-8 border-primary">
      <h2 class="text-2xl px-4 font-bold text-white">Movies</h2>
      <Icon icon="fe:arrow-right" width="24" height="24" class="text-primary" />
    </div>
    <div class="py-12">
      <MovieList />
    </div>
  </div>
</template>
