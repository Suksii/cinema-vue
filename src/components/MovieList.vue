<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import MovieCard from "./MovieCard.vue";
import { request } from "@/api";
import { Icon } from "@iconify/vue";
import { useSearchStore } from "@/store/searchStoreByName";
import { useSearchByGenreStore } from "@/store/searchStoreByGenre";

const moviesData = ref([]);
const pageNum = ref(1);
const totalPages = ref(1);
const searchStore = useSearchStore();
const genreStore = useSearchByGenreStore();

const searchQuery = computed(() => searchStore.query);
const selectedGenre = computed(() => genreStore.selectedGenre);

watchEffect(() => {
  console.log(selectedGenre.value);
});

async function fetchMovies() {
  try {
    const endpoint = searchQuery.value ? "search/movie" : "discover/movie";
    const params = { page: pageNum.value };
    if (searchQuery.value) {
      params.query = searchQuery.value;
      pageNum.value = 1;
    }
    if (selectedGenre.value) {
      params.with_genres = selectedGenre.value;
      console.log(params, selectedGenre.value);
    }
    const {
      data: { results, total_pages },
    } = await request.get(endpoint, { params });
    moviesData.value = results;
    totalPages.value = total_pages;
  } catch (err) {
    console.error(err);
  }
}

watchEffect(() => {
  if (searchQuery.value || pageNum.value) {
    fetchMovies();
  }
});

const prevPage = () => {
  if (pageNum.value !== 1) pageNum.value -= 1;
};
const nextPage = () => {
  if (pageNum.value !== totalPages.value) pageNum.value += 1;
};

const pageNumRender = computed(() => {
  const pages = [];

  const start = Math.max(1, pageNum.value - 2);
  const end = Math.min(totalPages.value, pageNum.value + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8"
    v-if="moviesData.length > 0"
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
  <div
    v-else
    class="w-full flex justify-center text-center py-12 text-2xl italic"
  >
    No movies shown
  </div>
  <div
    v-if="moviesData.length > 0"
    class="flex justify-center items-center gap-4 py-8"
  >
    <Icon
      icon="dashicons:arrow-left"
      class="w-10 h-10 bg-primary hover:bg-hoverPrimary text-white flex justify-center items-center text-xl cursor-pointer rounded-full"
      @click="prevPage"
    />
    <div
      v-for="page in pageNumRender"
      class="w-10 h-10 flex justify-center items-center bg-primary hover:bg-hoverPrimary text-white text-xl cursor-pointer rounded-full"
      :class="{
        'bg-primary': page !== pageNum,
        'bg-hoverPrimary scale-125': page === pageNum,
      }"
      @click="pageNum = page"
    >
      {{ page }}
    </div>
    <Icon
      icon="dashicons:arrow-right"
      @click="nextPage"
      class="w-10 h-10 bg-primary hover:bg-hoverPrimary text-white flex justify-center items-center text-xl cursor-pointer rounded-full"
      :class="{ 'cursor-not-allowed': page === totalPages }"
    />
  </div>
</template>
