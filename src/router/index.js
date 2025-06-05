import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Articles from '../views/Articles.vue'
import Messages from '../views/Messages.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    }
  ]
})

export default router