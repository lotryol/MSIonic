import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import RegisterPage from '../views/Register.vue'
import LoginPage from '../views/Login.vue'
import JakePage from '../views/Jake.vue'
import ProfilePage from '../views/Perfil.vue'
import GrapicPage from '../views/Graficos.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'REGISTER',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'LOGIN',
    component: LoginPage
  },
  {
    path: '/profile',
    name: 'PROFILE',
    component: ProfilePage
  },
  {
    path: '/jake',
    name: 'JAKE',
    component: JakePage
  },
  {
    path: '/graficos',
    name: 'GRAPIC',
    component: GrapicPage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
