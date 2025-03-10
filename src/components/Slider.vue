<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import MovieCard from "./MovieCard.vue";
import { Icon } from "@iconify/vue";

const moviesInView = ref(4);
const indexInView = ref(0);
const containerRef = ref(null);
const containerWidth = ref(0);

const props = defineProps({
  moviesData: Array,
});

const totalSlides = computed(() =>
  Math.ceil((props.moviesData?.length || 0) / moviesInView.value)
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
  <div class="relative">
    <div class="relative overflow-hidden" ref="containerRef">
      <div
        class="flex transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(-${indexInView * 100}%)` }"
      >
        <div
          v-for="movie in moviesData"
          :key="movie.id"
          class="shrink-0"
          :style="{
            width: `${containerWidth / moviesInView}px`,
            paddingRight: '12px',
          }"
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
