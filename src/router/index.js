import { createRouter, createWebHistory } from 'vue-router'
import MoviesView from '../views/MoviesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: MoviesView,
    },
    {
      path: '/tv-shows',
      name: 'tv-shows',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TvShowsView.vue'),
    },
  ],
})

export default router
