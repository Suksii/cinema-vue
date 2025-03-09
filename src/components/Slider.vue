<script setup>
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import MovieCard from "./MovieCard.vue";
import { Icon } from "@iconify/vue";
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
  {
    id: 8,
    title: "Room",
    year: 2021,
    rating: 8.2,
    imageUrl: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
];

const moviesInView = ref(4);
const indexInView = ref(0);
const containerRef = ref(null);
const containerWidth = ref(0);

const totalSlides = computed(() =>
  Math.ceil(movies.length / moviesInView.value)
);

const updateWidth = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.clientWidth;
  }
};
onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

const scrollLeft = () => {
  if (indexInView.value === 0) {
    indexInView.value = totalSlides.value - 1;
  } else {
    indexInView.value -= 1;
  }
};

const scrollRight = () => {
  if (indexInView.value === totalSlides.value - 1) {
    indexInView.value = 0;
  } else {
    indexInView.value += 1;
  }
};
</script>
<template>
  <div class="w-[80%] mx-auto py-24 relative">
    <div class="relative overflow-hidden" ref="containerRef">
      <div
        class="flex transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(-${indexInView * 100}%)` }"
      >
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="shrink-0"
          :style="{
            width: `${containerWidth / moviesInView}px`,
            paddingRight: '12px',
          }"
        >
          <MovieCard
            :title="movie.title"
            :year="movie.year"
            :rating="movie.rating"
            :imageUrl="movie.imageUrl"
          />
        </div>
      </div>
    </div>

    <div
      class="absolute -left-16 top-1/2 -translate-y-1/2 flex items-center justify-center z-50 h-10 w-10 bg-gray-800 rounded-full cursor-pointer hover:scale-110 duration-300"
      @click="scrollLeft"
    >
      <Icon
        icon="solar:arrow-left-linear"
        width="24"
        height="24"
        class="text-gray-100"
      />
    </div>

    <div
      class="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center justify-center z-50 h-10 w-10 bg-gray-800 rounded-full cursor-pointer hover:scale-110 duration-300"
      @click="scrollRight"
    >
      <Icon
        icon="solar:arrow-right-linear"
        width="24"
        height="24"
        class="text-gray-100"
      />
    </div>
  </div>
</template>
