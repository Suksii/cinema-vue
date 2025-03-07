<script setup>
import { Icon } from "@iconify/vue";

defineProps({
    title: String,
    year: Number,
    rating: Number,
    imageUrl: String
})

</script>
<template>
    <div class="relative h-full rounded-xl bg-gray-400 group overflow-hidden duration-300">
        <img :src="imageUrl" :alt="title" class="w-full h-full object-cover">
        <div
            class="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gray-800/90 flex flex-col justify-between duration-300 p-4">
            <div class="flex flex-col items-center justify-center gap-4 text-white text-2xl font-semibold">
                <div class="flex flex-col items-center justify-center text-center">
                    <h3 class="text-center">{{ title }}</h3>
                    <p class="text-center">{{ year }}</p>
                </div>
                <div class="flex gap-2 items-center justify-center">
                    <Icon icon="ic:baseline-star" width="24" height="24" color="yellow" />
                    <span>{{ rating }}</span>
                </div>
            </div>
            <RouterLink to="/movie" class="text-white text-center text-lg">See more</RouterLink>
        </div>
    </div>
</template>
