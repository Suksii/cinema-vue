<script setup>
import { Icon } from "@iconify/vue";
</script>
<template>
    <div class="relative w-56 h-72 m-4 rounded-xl bg-gray-400 group overflow-hidden duration-300">
        <img src="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg" alt="movie-title"
            class="w-full h-full object-cover">
        <div
            class="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gray-800/90 flex flex-col justify-between duration-300 p-4">
            <div class="flex flex-col items-center justify-center gap-4 text-white text-2xl font-semibold">
                <div class="flex flex-col items-center justify-center text-center">
                    <h3 class="text-center">Kad porastem bicu kengur</h3>
                    <p class="text-center">(2024)</p>
                </div>
                <div class="flex gap-2 items-center justify-center">
                    <Icon icon="ic:baseline-star" width="24" height="24" color="yellow" />
                    <span>8.2</span>
                </div>
            </div>
            <div class="text-white text-center text-lg">See more</div>
        </div>
    </div>
</template>
