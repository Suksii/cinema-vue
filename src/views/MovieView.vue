<script setup>
import { Icon } from "@iconify/vue";

const genres = ["Comedy, Sci-Fi, Drama"]
</script>


<template>
    <div class="min-h-screen h-full w-full bg-cover flex justify-center items-center relative"
        style="background-image: url('https://image.tmdb.org/t/p/original/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg');">
        <div class="absolute inset-0 backdrop-blur-xs"></div>
        <div class="relative w-full lg:w-[90%] h-[100vh] lg:h-[75vh] mx-auto md:border-14 border-black rounded-xl">
            <div class="w-full lg:w-5/6 h-2/3 lg:h-full bg-cover lg:bg-right bg-center"
                style="background-image: url('https://image.tmdb.org/t/p/original/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg');">
            </div>
            <div
                class="absolute shrink-0 bottom-0 lg:right-0 w-full lg:w-2/5 min-w-[500px] h-2/3 lg:h-full bg-gradient-to-t lg:bg-gradient-to-r from-black lg:from-transparent via-50% lg:via-10% via-black to-transparent lg:to-black">
                <div class="relative w-full h-full text-white py-12 px-4 lg:pl-20">
                    <div class="pb-4">
                        <h1 class="uppercase text-5xl font-[600]">Movie title</h1>
                        <h3 class="uppercase text-xl">Tagline</h3>
                    </div>
                    <div class="flex flex-wrap items-center gap-4 pb-4">
                        <div class="flex gap-2 items-center">
                            <Icon icon="ic:baseline-star" width="24" height="24" color="yellow" />
                            <span>9.2</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-1 h-1 bg-white rounded-full shrink-0"></div>
                            <div v-for="genre of genres" :key="genre">{{ genre }}</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-1 h-1 bg-white rounded-full shrink-0"></div>
                            <p>July 16, 2024</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-1 h-1 bg-white rounded-full shrink-0"></div>
                            <p>127 minutes</p>
                        </div>
                    </div>
                    <div class="py-4">
                        <p class="text-gray-200 text-sm italic">Description</p>
                        <p class="text-lg">Two highly trained operatives grow close from a distance after being sent to
                            guard opposite
                            sides of a mysterious gorge. When an evil below emerges, they must work together to survive
                            what lies within.</p>
                    </div>
                    <div class="py-4">
                        <p class="text-gray-200 text-sm italic">Actors</p>
                        <p class="text-lg">Two highly trained operatives grow close from a distance after being sent to
                            guard opposite
                            sides of a mysterious gorge. When an evil below emerges, they must work together to survive
                            what lies within.</p>
                    </div>
                    <button
                        class="mt-4 w-full bg-red-600 py-2 font-semibold tracking-widest uppercase cursor-pointer">Watch
                        trailer</button>
                </div>
            </div>
        </div>
    </div>
</template>
