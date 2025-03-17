<script setup>
import { request } from "@/api";
import Slider from "@/components/Slider.vue";
import Loading from "@/loading/Loading.vue";
import { Icon } from "@iconify/vue";
import { ref, watchEffect } from "vue";

const popularMoviesData = ref([]);
const topRatedMoviesData = ref([]);
const loadingPopular = ref(false);
const loadingTopRated = ref(false);

watchEffect(async () => {
  loadingPopular.value = true;
  try {
    const {
      data: { results },
    } = await request.get("movie/popular");
    popularMoviesData.value = results;
  } catch (err) {
    console.error(err);
  } finally {
    loadingPopular.value = false;
  }
});

watchEffect(async () => {
  loadingTopRated.value = true;
  try {
    const {
      data: { results },
    } = await request.get("movie/top_rated");
    topRatedMoviesData.value = results;
  } catch (err) {
    console.error(err);
  } finally {
    loadingTopRated.value = false;
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
    <div class="py-12 relative">
      <Slider :moviesData="popularMoviesData" v-if="!loadingPopular" />
      <div
        v-else
        class="absolute top-1/2 left-1/2 -translate-1/2 text-3xl text-white"
      >
        <Loading />
      </div>
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
    <div class="py-12 relative">
      <Slider :moviesData="topRatedMoviesData" v-if="!loadingTopRated" />
      <div
        v-else
        class="absolute top-1/2 left-1/2 -translate-1/2 text-3xl text-white"
      >
        <Loading />
      </div>
    </div>
  </div>
</template>
