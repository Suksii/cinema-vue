import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieView from "@/views/MovieView.vue";
import MovieList from "@/components/MovieList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: MovieView,
    },
    {
      path: "/movies/",
      name: "movies",
      component: MovieList,
    },
    {
      path: "/movies/upcoming",
      name: "moviesUpcoming",
      component: MovieList,
    },
    {
      path: "/movies/popular",
      name: "moviesPopular",
      component: MovieList,
    },
    {
      path: "/movies/top-rated",
      name: "moviesTopRated",
      component: MovieList,
    },
    {
      path: "/movies/genre/:genre",
      name: "moviesByGenre",
      component: MovieList,
    },
  ],
});

export default router;
