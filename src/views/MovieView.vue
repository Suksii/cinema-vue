<script setup>
import { request } from "@/api";
import { useFunctionsStore } from "@/store/functionsStore";
import { Icon } from "@iconify/vue";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const isScrollVisible = ref(false);
const movieData = ref([]);
const trailerKey = ref(null);
const actorsData = ref([]);
const isClicked = ref(false);

const route = useRoute();
const { voteAverage } = useFunctionsStore();

console.log(voteAverage.value);

const id = route.params.id;

watchEffect(async () => {
  try {
    const { data } = await request.get(`movie/${id}`);
    movieData.value = data;
  } catch (err) {
    console.error(err);
  }
});

watchEffect(async () => {
  try {
    const {
      data: { results },
    } = await request.get(`movie/${id}/videos`);
    const trailer = results.find((item) => item.type === "Trailer");
    trailerKey.value = trailer.key;
  } catch (err) {
    console.error(err);
  }
});

watchEffect(async () => {
  try {
    const {
      data: { crew },
    } = await request.get(`https://api.themoviedb.org/3/movie/${id}/credits`);
    actorsData.value = crew.filter(
      (actor) => actor.known_for_department === "Acting"
    );
  } catch (err) {
    console.error(err);
  }
});
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const releaseDate = (date) => {
  if (!date) return "";
  const dateArray = date.split("-");

  if (dateArray.length !== 3) return date;

  const year = dateArray[0];
  const month = months[parseInt(dateArray[1], 10) - 1];
  const day = dateArray[2];
  return month + " " + day + ", " + year;
};

const movieDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}min`;
  else if (hours === 0 && minutes > 0) return `${minutes}min`;
  else if (hours > 0 && minutes === 0) return `${hours}h`;
};

const goToTrailer = (key) => {
  window.open(`https://www.youtube.com/watch?v=${key}`);
};
</script>

<template>
  <div
    class="min-h-screen h-full w-full bg-cover flex justify-center items-center relative overflow-hidden"
    :style="{
      backgroundImage: `url('https://image.tmdb.org/t/p/original/${movieData.backdrop_path}')`,
    }"
  >
    <div
      class="relative w-full lg:w-[80%] h-[100vh] lg:h-[75vh] mx-auto shadow-2xl shadow-black"
    >
      <div
        v-if="movieData.backdrop_path"
        class="w-full lg:w-5/6 h-2/3 lg:h-full bg-cover lg:bg-right bg-center relative"
        :style="{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movieData.backdrop_path}')`,
        }"
      >
        <div class="w-5/7 pb-4 absolute left-4 top-4">
          <h1 class="uppercase text-5xl font-[600] text-gray-200">
            {{ movieData.title }}
          </h1>
          <h3 v-if="movieData.tagline" class="text-xl italic text-gray-300">
            {{ movieData.tagline }}
          </h3>
        </div>

        <div class="absolute left-4 bottom-4 text-red-500">
          <Icon
            v-if="isClicked"
            icon="solar:heart-bold"
            width="46"
            height="46"
            @click="isClicked = !isClicked"
            class="cursor-pointer"
          />
          <Icon
            v-if="!isClicked"
            icon="solar:heart-linear"
            width="46"
            height="46"
            @click="isClicked = !isClicked"
            class="cursor-pointer"
          />
        </div>
      </div>
      <div
        @mouseenter="isScrollVisible = true"
        @mouseleave="isScrollVisible = false"
        class="absolute shrink-0 bottom-0 lg:right-0 w-full lg:w-2/5 min-w-[500px] h-2/3 lg:h-full bg-gradient-to-t lg:bg-gradient-to-r from-gray-800 lg:from-transparent via-50% lg:via-10% via-black to-transparent lg:to-black overflow-y-auto custom-scroll"
        :class="{ 'custom-scroll-hidden': !isScrollVisible }"
      >
        <div class="relative w-full h-full text-white py-8 px-4 lg:pl-20">
          <div class="flex flex-wrap items-center gap-4 pb-4">
            <div
              class="flex gap-2 items-center bg-gray-700/60 rounded-full px-3 py-1"
            >
              <Icon
                icon="ic:baseline-star"
                width="24"
                height="24"
                color="yellow"
              />
              <p>{{ voteAverage(movieData.vote_average) }}</p>
            </div>
            <div
              class="flex items-center gap-2 bg-gray-700/60 rounded-full px-3 py-1"
            >
              <Icon icon="mdi:movie-open" width="20" height="20" />
              <div v-for="(genre, index) of movieData.genres" :key="genre.id">
                {{ genre.name }}
                <span v-if="movieData.genres.length - 1 !== index">,</span>
              </div>
            </div>
            <div
              v-if="movieData.release_date"
              class="flex items-center gap-2 bg-gray-700/60 rounded-full px-3 py-1"
            >
              <Icon icon="ic:baseline-date-range" width="20" height="20" />
              <p>{{ releaseDate(movieData.release_date) }}</p>
            </div>
            <div
              class="flex items-center gap-2 bg-gray-700/60 rounded-full px-3 py-1"
            >
              <Icon icon="mingcute:time-duration-line" width="20" height="20" />
              <p>{{ movieDuration(movieData.runtime) }}</p>
            </div>
          </div>
          <div class="py-4">
            <h3 class="text-gray-200 text-sm italic uppercase">Description</h3>
            <p v-if="movieData.overview" class="text-lg">
              {{ movieData.overview }}
            </p>
            <p v-else>--</p>
          </div>
          <div class="py-4">
            <h3 class="text-gray-200 text-sm italic uppercase">Actors</h3>
            <div
              v-if="actorsData.length > 0"
              class="text-lg"
              v-for="actor of actorsData"
            >
              <p class="flex flex-row items-center">{{ actor.name }}</p>
            </div>
            <p v-else>--</p>
          </div>

          <button
            class="my-4 w-full bg-red-600 py-2 font-semibold tracking-widest uppercase cursor-pointer hover:bg-red-800 duration-300"
            @click="goToTrailer(trailerKey)"
          >
            Watch trailer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
