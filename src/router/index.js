import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriaView from '../views/CategoriaView.vue'
import ProductoView from '../views/ProductoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/categorias', // Ruta para la vista de categorías
    name: 'CategoriaView',
    component: CategoriaView,
  },
  {
    path: '/productos', // Ruta para la vista de productos
    name: 'ProductoView',
    component: ProductoView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
