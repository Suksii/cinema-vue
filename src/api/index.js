import axios from "axios";
const api_key = import.meta.env.VITE_API_KEY;

export const request = axios.create({
  baseURL: `https://api.themoviedb.org/3/discover/movie`,
    params: {
      api_key: api_key,
    },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTM1ZmZlNGVlZmY3Zjk2YWQwZDVmMDMwY2QzOGFjZSIsIm5iZiI6MTc0MTA5OTg0Ni4yODYsInN1YiI6IjY3YzcxMzQ2NWIxZDhkNDhjNTA0ZjE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YlPaVUqWqrNvvLDTCvBekn0yTg6pGU1w3j-biaN-E_Y",
  },
});
