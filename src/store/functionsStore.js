import { defineStore } from "pinia";

export const useFunctionsStore = defineStore("functions", {
  actions: {
    voteAverage: (vote) => {
      if (!vote) return "--";
      const isInt = vote.toString().includes(".");
      if (isInt) return Number(vote).toFixed(1);
      return Number(vote);
    },
  },
});
