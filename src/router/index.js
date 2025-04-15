import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";
import List from "../views/List.vue";
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/List',
    name: 'List',
    component: List
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})