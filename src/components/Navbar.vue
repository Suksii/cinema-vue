<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import GenresModal from './GenresModal.vue';

const genresShown = ref(false);

</script>
<template>
    <div class="bg-gray-900 w-full h-12 flex items-center px-6 justify-between ">
        <span class="text-red-600 text-3xl font-bold italic">Movies</span>
        <div class="flex items-center gap-10">
            <p class="text-gray-200">Popular</p>
            <p class="text-gray-200">Top Rated</p>
            <div class="relative flex items-end gap-1 text-gray-200 cursor-pointer z-50"
                @click="genresShown = !genresShown">
                <p>Genres</p>
                <span v-if="genresShown">
                    <Icon icon="ri:arrow-up-s-fill" width="20" height="20" />
                </span>
                <div v-if="genresShown" class="absolute top-6 left-0 md:left-1/2 -translate-x-1/2 text-white p-4 rounded-md w-max">
                    <GenresModal />
                </div>
                <span v-else>
                    <Icon icon="ri:arrow-down-s-fill" width="20" height="20" />
                </span>
            </div>
            <div class="relative min-w-[300px]">
                <input
                    class="py-1 px-4 bg-gray-800 rounded-full w-full text-gray-200 placeholder:text-gray-400 outline-none focus:bg-gray-700"
                    placeholder="Search for a movie" />
                <Icon icon="iconamoon:search-bold" width="24" height="24"
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    </div>
</template>
