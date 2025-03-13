<script setup>
import { request } from "@/api";
import { useSearchByGenreStore } from "@/store/searchStoreByGenre";
import { ref, watchEffect } from "vue";

const genresData = ref([]);
const store = useSearchByGenreStore();

watchEffect(async () => {
  try {
    const {
      data: { genres },
    } = await request.get("genre/movie/list");
    genresData.value = genres;
  } catch (err) {
    console.log(err);
  }
});

const handleClick = (genre) => {
  store.setSelectedGenre(genre);
};
</script>
<template>
  <div class="bg-secondary py-8 grid grid-cols-2 w-fit z-50">
    <div
      v-for="genre in genresData"
      :key="genre.id"
      @click="handleClick(genre.id)"
      class="text-white px-6 py-2 w-[180px] cursor-pointer hover:bg-tertiary duration-200"
    >
      {{ genre.name }}
    </div>
  </div>
</template>
