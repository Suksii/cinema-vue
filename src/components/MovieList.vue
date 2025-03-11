<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import MovieCard from "./MovieCard.vue";
import { request } from "@/api";
import { Icon } from "@iconify/vue";
import { useSearchStore } from "@/store/searchStore";

const moviesData = ref([]);
const pageNum = ref(1);
const totalPages = ref(20);
const store = useSearchStore();

const searchQuery = computed(() => store.query);


async function fetchMovies() {
  try {
    const {
      data: { results, total_pages },
    } = await request.get(`discover/movie?page=${pageNum.value}`);
    moviesData.value = results;
    // totalPages.value = total_pages;
  } catch (err) {
    console.log(err);
  }
}

watch(pageNum, fetchMovies, { immediate: true });

const prevPage = () => {
  if (pageNum.value !== 1) pageNum.value -= 1;
};
const nextPage = () => {
  if (pageNum.value !== totalPages.value - 1) pageNum.value += 1;
};

const pageNumRender = computed(() => {
  const pages = [];

  const start = Math.max(1, pageNum.value - 2);
  const end = Math.min(totalPages.value, pageNum.value + 2);

  for (let i = start; i < end; i++) {
    pages.push(i);
  }
  return pages;
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
        :year="movie.release_date"
        :rating="movie.vote_average"
        :imageUrl="movie.poster_path"
        imageWidth="w500"
      />
    </div>
  </div>
  <div class="flex justify-center items-center gap-4 py-8">
    <Icon
      icon="dashicons:arrow-left"
      class="w-10 h-10 bg-gray-700 flex justify-center items-center text-gray-50 text-xl cursor-pointer rounded-full"
      @click="prevPage"
    />
    <div
      v-for="page in pageNumRender"
      class="w-10 h-10 flex justify-center items-center text-gray-50 text-xl cursor-pointer rounded-full"
      :class="{
        'bg-gray-700': page !== pageNum,
        'bg-gray-900 scale-125': page === pageNum,
      }"
      @click="pageNum = page"
    >
      {{ page }}
    </div>
    <Icon
      icon="dashicons:arrow-right"
      @click="nextPage"
      class="w-10 h-10 bg-gray-700 flex justify-center items-center text-gray-50 text-xl cursor-pointer rounded-full"
    />
  </div>
</template>
