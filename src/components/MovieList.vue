<script setup>
import { computed, ref, watchEffect } from "vue";
import MovieCard from "./MovieCard.vue";
import { request } from "@/api";
import { useSearchStore } from "@/store/searchStoreByName";
import { useSearchByGenreStore } from "@/store/searchStoreByGenre";
import { useRoute } from "vue-router";
import Loading from "@/loading/Loading.vue";
import Pagination from "./Pagination.vue";
import SortSection from "./SortSection.vue";
const route = useRoute();

const moviesData = ref([]);
const totalPages = ref(1);
const pageNum = ref(route.query.page ? Number(route.query.page) : 1);
const searchStore = useSearchStore();
const genreStore = useSearchByGenreStore();
const loading = ref(false);
const selectedSort = ref(route.query.sort_by || "");

const searchQuery = computed(() => searchStore.query);
const selectedGenre = computed(() => genreStore.selectedGenre);

async function fetchMovies() {
  loading.value = true;
  try {
    const endpoint = searchQuery.value
      ? "search/movie"
      : route.name === "moviesPopular"
      ? "/movie/popular"
      : route.name === "moviesTopRated"
      ? "/movie/top_rated"
      : "discover/movie";
    const params = { page: pageNum.value };
    if (searchQuery.value) {
      params.query = searchQuery.value;
      pageNum.value = 1;
    }
    if (selectedSort.value) {
      params.sort_by = selectedSort.value;
    }
    if (selectedGenre.value) {
      params.with_genres = selectedGenre.value;
    }
    const {
      data: { results, total_pages },
    } = await request.get(endpoint, { params });
    moviesData.value = results;
    totalPages.value = total_pages;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

watchEffect(() => {
  if (
    searchQuery.value ||
    pageNum.value ||
    selectedGenre.value ||
    selectedSort.value
  ) {
    fetchMovies();
  }
});
</script>

<template>
  <div class="relative w-[90%] md:w-[70%] mx-auto pt-40 md:pt-22">
    <SortSection
      v-model:selectedSort="selectedSort"
      v-model:pageNum="pageNum"
    />
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8"
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
      <p class="text-2xl text-white italic">No movies shown</p>
    </div>
  </div>
  <div
    v-if="moviesData.length > 0"
    class="flex justify-center items-center gap-4 py-8"
  >
    <Pagination v-model:pageNum="pageNum" :totalPages="totalPages" />
  </div>
  <div
    v-if="loading"
    class="fixed w-full h-screen flex justify-center items-center bg-black/50 text-5xl text-white"
  >
    <Loading />
  </div>
</template>
