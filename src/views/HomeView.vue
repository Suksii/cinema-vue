<script setup>
import { request } from "@/api";
import Slider from "@/components/Slider.vue";
import Loading from "@/loading/Loading.vue";
import { Icon } from "@iconify/vue";
import { onMounted, reactive } from "vue";

const popularMovies = reactive({ data: [], loading: false });
const topRatedMovies = reactive({ data: [], loading: false });
const upcomingMovies = reactive({ data: [], loading: false });

async function fetchMovies(moviesData, endpoint) {
  moviesData.loading = true;
  try {
    const {
      data: { results },
    } = await request.get(endpoint);
    moviesData.data = results;
  } catch (err) {
    console.error(err);
  } finally {
    moviesData.loading = false;
  }
}

onMounted(() => {
  fetchMovies(popularMovies, "movie/popular");
  fetchMovies(topRatedMovies, "movie/top_rated");
  fetchMovies(upcomingMovies, "movie/upcoming");
});
</script>

<template>
  <div class="w-[90%] md:w-[70%] mx-auto pt-22">
    <RouterLink
      to="/movies/upcoming"
      class="flex items-center w-fit border-l-8 border-primary cursor-pointer group duration-300"
    >
      <h2 class="text-2xl px-4 font-bold text-white">Upcoming Movies</h2>
      <Icon
        icon="fe:arrow-right"
        width="24"
        height="24"
        class="text-primary group-hover:scale-125 group-hover:translate-x-1 duration-300"
      />
    </RouterLink>
    <div class="py-12 relative">
      <Slider
        :moviesData="upcomingMovies.data"
        v-if="!upcomingMovies.loading"
      />
      <div
        v-else
        class="absolute top-1/2 left-1/2 -translate-1/2 text-3xl text-white"
      >
        <Loading />
      </div>
    </div>
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
      <Slider :moviesData="popularMovies.data" v-if="!popularMovies.loading" />
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
      <Slider
        :moviesData="topRatedMovies.data"
        v-if="!topRatedMovies.loading"
      />
      <div
        v-else
        class="absolute top-1/2 left-1/2 -translate-1/2 text-3xl text-white"
      >
        <Loading />
      </div>
    </div>
  </div>
</template>
