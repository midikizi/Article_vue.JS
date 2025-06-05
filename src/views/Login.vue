<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700">Username</label>
          <input 
            v-model="username" 
            type="text" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          >
        </div>
        <div>
          <label class="block text-gray-700">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          >
        </div>
        <button 
          type="submit" 
          class="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Loading...' : 'Login' }}
        </button>
        <p v-if="authStore.error" class="text-red-500 text-center">{{ authStore.error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  await authStore.login(username.value, password.value)
  if (authStore.user) {
    router.push('/')
  }
}
</script>