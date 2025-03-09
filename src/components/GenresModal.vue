<script setup>
import { request } from "@/api";
import { ref, watchEffect } from "vue";

const genresData = ref([]);

watchEffect(async () => {
  try {
    const {
      data: { genres },
    } = await request.get("genre/movie/list");
    genresData.value = genres;
    console.log(genres);
    
  } catch (err) {
    console.log(err);
  }
});
</script>
<template>
  <div class="bg-gray-900 py-8 grid grid-cols-2 w-fit z-50">
    <div
      v-for="genre in genresData"
      class="text-gray-200 px-6 py-2 w-[180px] cursor-pointer hover:bg-gray-800 duration-200"
    >
      {{ genre.name }}
    </div>
  </div>
</template>
