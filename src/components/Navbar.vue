<script setup>
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import GenresModal from "./GenresModal.vue";
import { useSearchStore } from "@/store/searchStoreByName";
import { useDebounce } from "@/composables/useDebounce";

const genresShown = ref(false);

const searchStore = useSearchStore();
const searchInput = ref("");
const debouncedInput = useDebounce(searchInput, 2000);

watch(debouncedInput, (newQuery) => {
  searchStore.setQuery(newQuery);
});
</script>
<template>
  <div
    class="bg-secondary w-full min-h-12 flex items-center px-6 justify-between"
  >
    <span
      class="absolute top-2 left-2 md:static text-primary text-3xl font-bold italic"
      >Movies</span
    >
    <div
      class="flex flex-col md:flex-row justify-center items-center gap-10 w-full md:w-fit"
    >
      <div class="flex items-center gap-12 mt-4 md:m-0">
        <RouterLink to="/"
          class="text-white hover:text-primary cursor-pointer z-50 duration-200"
        >
          Home
        </RouterLink>
        <div
          class="relative flex items-end gap-1 text-white hover:text-primary cursor-pointer z-50 duration-200"
          @click="genresShown = !genresShown"
        >
          <p>Genres</p>
          <span v-if="genresShown">
            <Icon icon="ri:arrow-up-s-fill" width="20" height="20" />
          </span>
          <div
            v-if="genresShown"
            class="absolute top-6 left-1/2 -translate-x-1/2 text-white p-4 rounded-md w-max"
          >
            <GenresModal />
          </div>
          <span v-else>
            <Icon icon="ri:arrow-down-s-fill" width="20" height="20" />
          </span>
        </div>
      </div>
      <div class="relative w-full md:w-[300px] mb-4 md:m-0">
        <input
          class="py-1 px-4 bg-tertiary rounded-full w-full text-gray-200 placeholder:text-gray-100 outline-none focus:bg-tertiary/80"
          v-model="searchInput"
          placeholder="Search for a movie"
        />
        <div
          v-if="searchInput"
          class="absolute right-10 top-1/2 -translate-y-1/2 text-white cursor-pointer hover:ring hover:ring-white"
          @click="searchInput = ''"
        >
          <Icon icon="mdi:close" width="22" height="22" />
        </div>
        <Icon
          icon="iconamoon:search-bold"
          width="24"
          height="24"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-white"
        />
      </div>
    </div>
  </div>
</template>
