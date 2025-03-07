<script setup>
const genres = ["Adventure", "Sci-Fi", "Drama", "Action", "Comedy", "Thriller", "War"]
</script>
<template>
    <div class="bg-gray-900 py-8 grid grid-cols-2 gap-y-4 w-fit z-50">
        <div v-for="genre of genres"
            class="text-gray-200 px-6 py-2 w-[180px] cursor-pointer hover:bg-gray-800 duration-200">{{ genre }}</div>
    </div>
</template>
