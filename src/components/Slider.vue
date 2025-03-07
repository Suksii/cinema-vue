<script setup>
import { ref } from "vue";
import MovieCard from "./MovieCard.vue";
const movies = [
  {
    id: 1,
    title: "Prestige",
    year: 2024,
    rating: 8.2,
    imageUrl: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
  {
    id: 2,
    title: "Departed",
    year: 2021,
    rating: 7.9,
    imageUrl: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
  {
    id: 3,
    title: "Home alone",
    year: 2014,
    rating: 9.2,
    imageUrl: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
  {
    id: 4,
    title: "The revenant",
    year: 2014,
    rating: 9.0,
    imageUrl: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
  {
    id: 5,
    title: "The goodfather 1",
    year: 2014,
    rating: 9.1,
    imageUrl: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
  {
    id: 6,
    title: "The goodfather 2",
    year: 2014,
    rating: 9.3,
    imageUrl: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
  {
    id: 7,
    title: "The goodfather 3",
    year: 2014,
    rating: 8.6,
    imageUrl: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
];

const moviesInView = ref(3);
const indexInView = ref(0);

const totalSlides = Math.ceil(movies.length / moviesInView.value);

const scrollLeft = () => {
  if (indexInView.value === 0) {
    indexInView.value = totalSlides - 1;
  } else {
    indexInView.value -= 1;
  }
  console.log(indexInView.value);
};

const scrollRight = () => {
  if (indexInView.value === totalSlides - 1) {
    indexInView.value = 0;
  } else {
    indexInView.value += 1;
  }
  console.log(indexInView.value);
};
</script>
<template>
  <div class="w-[80%] mx-auto py-24 relative">
    <div class="flex gap-4 overflow-x-hidden w-full relative">
      <div
        v-for="movie of movies"
        class="relative min-w-[300px] duration-300"
        :style="{ transform: `translateX(-${indexInView * 100}%)` }"
      >
        <MovieCard
          :title="movie.title"
          :year="movie.year"
          :rating="movie.rating"
          :imageUrl="movie.imageUrl"
        />
      </div>
    </div>
    <div
      class="absolute -left-16 top-1/2 z-50 px-3 py-2 bg-yellow-200"
      @click="scrollLeft"
    >
      Left
    </div>
    <div
      class="absolute -right-16 top-1/2 z-50 px-3 py-2 bg-yellow-200"
      @click="scrollRight"
    >
      Right
    </div>
  </div>
</template>
