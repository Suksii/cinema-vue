<script setup>
import { ref, watchEffect } from "vue";
import MovieCard from "./MovieCard.vue";
import { request } from "@/api";
import { Icon } from "@iconify/vue";

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
const prevPage = () => {
  pageNum.value -= 1;
};
const nextPage = () => {
  pageNum.value += 1;
};
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
      @click="prevPage"
      class="w-10 h-10 bg-gray-700 flex justify-center items-center text-gray-50 text-xl cursor-pointer rounded-full"
    />
    <p
      v-if="pageNum > 2"
      class="w-10 h-10 bg-gray-700 flex justify-center items-center text-gray-50 text-xl cursor-pointer rounded-full"
    >
      {{ pageNum - 2 }}
    </p>
    <p
      v-if="pageNum > 1"
      class="w-10 h-10 bg-gray-700 flex justify-center items-center text-gray-50 text-xl cursor-pointer rounded-full"
    >
      {{ pageNum - 1 }}
    </p>
    <p
      class="w-10 h-10 bg-gray-900 flex justify-center items-center text-gray-50 text-xl cursor-pointer rounded-full scale-120"
    >
      {{ pageNum }}
    </p>
    <p
      class="w-10 h-10 bg-gray-700 flex justify-center items-center text-gray-50 text-xl cursor-pointer rounded-full"
    >
      {{ pageNum + 1 }}
    </p>
    <p
      class="w-10 h-10 bg-gray-700 flex justify-center items-center text-gray-50 text-xl cursor-pointer rounded-full"
    >
      {{ pageNum + 2 }}
    </p>
    <Icon
      icon="dashicons:arrow-right"
      @click="nextPage"
      class="w-10 h-10 bg-gray-700 flex justify-center items-center text-gray-50 text-xl cursor-pointer rounded-full"
    />
  </div>
</template>
