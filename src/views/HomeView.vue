<script setup>
import { request } from '@/api';
import { watchEffect } from 'vue';


async function fetchMovies() {
  try {
    const response = await request.get("")
    // return response.data
    console.log(response);

  } catch (err) {
    console.log(err);
  }
}
watchEffect(() => fetchMovies())

</script>

<template>
  <p class="">Text</p>
</template>
