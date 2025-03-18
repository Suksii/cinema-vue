<script setup>
import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
import MovieCard from "./MovieCard.vue";
import { request } from "@/api";
import { Icon } from "@iconify/vue";
import { useSearchStore } from "@/store/searchStoreByName";
import { useSearchByGenreStore } from "@/store/searchStoreByGenre";
import { useRoute, useRouter } from "vue-router";
import Loading from "@/loading/Loading.vue";
const route = useRoute();
const router = useRouter();

const moviesData = ref([]);
const totalPages = ref(1);
const pageNum = ref(route.query.page ? Number(route.query.page) : 1);
const isExpanded = ref(false);
const searchStore = useSearchStore();
const genreStore = useSearchByGenreStore();
const loading = ref(false);
const selectedSort = ref("");
const isAsc = ref(false);

const searchQuery = computed(() => searchStore.query);
const selectedGenre = computed(() => genreStore.selectedGenre);

const sortOptions = [
  {
    name: "Title",
    asc: "title.asc",
    desc: "title.desc",
    id: "title"
  },
  {
    name: "Release Date",
    asc: "primary_release_date.asc",
    desc: "primary_release_date.desc",
    id: "primary_release_date"
  },
  {
    name: "Popularity",
    asc: "popularity.asc",
    desc: "popularity.desc",
    id: "popularity"
  },
  {
    name: "Vote Count",
    asc: "vote_count.asc",
    desc: "vote_count.desc",
    id: "vote_count"
  },
];

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
    const params = { page: pageNum.value, sort_by: selectedSort.value };
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
    totalPages.value = 500;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

watchEffect(() => {
  if (searchQuery.value || pageNum.value || selectedGenre.value) {
    fetchMovies();
  }
});

const prevPage = () => {
  if (pageNum.value !== 1) pageNum.value -= 1;
  router.push({ query: { ...route.query, page: pageNum.value } });
};
const nextPage = () => {
  if (pageNum.value !== totalPages.value) pageNum.value += 1;
  router.push({ query: { ...route.query, page: pageNum.value } });
};

const goToPage = (selectedPage) => {
  if (selectedPage !== pageNum.value) {
    pageNum.value = selectedPage;
    router.push({ query: { ...route.query, page: selectedPage } });
  }
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
  <div class="relative w-[90%] md:w-[70%] mx-auto pt-40 md:pt-22">
    <div
      class="w-full bg-secondary flex items-center p-1 mb-12 rounded-md h-22 lg:h-12"
    >
      <div
        class="flex items-center gap-4 text-white cursor-pointer p-2 z-20"
        @click="isExpanded = !isExpanded"
      >
        <p class="text-nowrap">Sort by</p>
        <Icon icon="mdi:sort" width="24" height="24" />
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-4 duration-500"
        :class="{
          'w-0 opacity-0': isExpanded === false,
          'w-[90%] opacity-100': isExpanded === true,
        }"
      >
        <div
          v-for="option in sortOptions"
          class="flex justify-center items-center text-white"
        >
          <div
            @click="
              selectedSort = isAsc ? option.asc : option.desc;
              isAsc = !isAsc;
              console.log(selectedSort, option);
            "
            class="flex justify-center items-center gap-1 md:min-w-40 text-white hover:bg-primary py-1 px-2 rounded-md cursor-pointer transition-colors"
            :class="{ 'bg-primary': selectedSort.includes(option.id) }"
          >
            <p class="text-nowrap">{{ option.name }}</p>
            <Icon
              v-if="selectedSort === option.asc"
              icon="solar:arrow-up-bold"
              width="24"
              height="24"
            />
            <Icon
              v-if="selectedSort === option.desc"
              icon="solar:arrow-down-bold"
              width="24"
              height="24"
            />
          </div>
        </div>
      </div>
    </div>
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
    <Icon
      icon="dashicons:arrow-left"
      class="w-10 h-10 bg-primary hover:bg-hoverPrimary text-white flex justify-center items-center text-xl rounded-full"
      :class="{
        'cursor-not-allowed': pageNum === 1,
        'cursor-pointer': pageNum > 1,
      }"
      @click="prevPage"
    />
    <div
      v-for="page in pageNumRender"
      :key="page"
      class="w-10 h-10 flex justify-center items-center bg-primary hover:bg-hoverPrimary text-white text-xl cursor-pointer rounded-full"
      :class="{
        'bg-primary': page !== pageNum,
        'bg-hoverPrimary scale-125': page === pageNum,
      }"
      @click="goToPage(page)"
    >
      {{ page }}
    </div>
    <Icon
      icon="dashicons:arrow-right"
      @click="nextPage"
      class="w-10 h-10 bg-primary hover:bg-hoverPrimary text-white flex justify-center items-center text-xl rounded-full"
      :class="{
        'cursor-not-allowed': pageNum === totalPages,
        'cursor-pointer': pageNum < totalPages,
      }"
    />
  </div>
  <div
    v-if="loading"
    class="fixed w-full h-screen flex justify-center items-center bg-black/50 text-5xl text-white"
  >
    <Loading />
  </div>
</template>
