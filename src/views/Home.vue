<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              Home
            </router-link>
            <router-link to="/articles" class="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              Articles
            </router-link>
            <router-link to="/messages" class="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              Messages
            </router-link>
          </div>
          <div class="flex items-center">
            <template v-if="authStore.user">
              <button @click="logout" class="ml-4 text-gray-700 hover:text-gray-900">Logout</button>
            </template>
            <template v-else>
              <router-link to="/login" class="text-gray-700 hover:text-gray-900">Login</router-link>
              <router-link to="/register" class="ml-4 text-gray-700 hover:text-gray-900">Register</router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900">Welcome to Article Sales</h1>
      <p class="mt-4 text-gray-600">Browse articles, send messages, and more!</p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const logout = async () => {
  await authStore.logout()
}
</script>