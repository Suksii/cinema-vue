import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchByGenreStore = defineStore("searchByGenre", () => {
  const selectedGenre = ref("");

  const setSelectedGenre = (newGenre) => {
    selectedGenre.value = newGenre;
  };

  return { selectedGenre, setSelectedGenre };
});
