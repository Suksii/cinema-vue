        <script setup>
        import MovieCard from './MovieCard.vue';

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
        ]
</script>
<template>
    <div
        class="w-[90%] md:w-[70%] mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        <div class="flex justify-center items-center h-full" v-for="movie of movies" :key="movie.id">
            <MovieCard :title="movie.title" :year="movie.year" :rating="movie.rating" :imageUrl="movie.imageUrl" />
        </div>
    </div>
</template>
