<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Articles</h1>
        <button 
          v-if="authStore.user"
          @click="showCreateForm = true" 
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Article
        </button>
      </div>

      <!-- Create Article Form -->
      <div v-if="showCreateForm" class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-xl font-semibold mb-4">Create New Article</h2>
        <form @submit.prevent="createArticle" class="space-y-4">
          <div>
            <label class="block text-gray-700">Title</label>
            <input 
              v-model="newArticle.title" 
              type="text" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
          </div>
          <div>
            <label class="block text-gray-700">Content</label>
            <textarea 
              v-model="newArticle.content" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label class="block text-gray-700">Image URL</label>
            <input 
              v-model="newArticle.image" 
              type="url" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
          </div>
          <div class="flex justify-end space-x-2">
            <button 
              type="button" 
              @click="showCreateForm = false"
              class="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>

      <!-- Articles List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="article in articles" :key="article.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover">
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ article.title }}</h2>
            <p class="text-gray-600">{{ article.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const articles = ref([])
const showCreateForm = ref(false)
const newArticle = ref({
  title: '',
  content: '',
  image: ''
})

const fetchArticles = async () => {
  try {
    const response = await fetch('/api/articles')
    articles.value = await response.json()
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

const createArticle = async () => {
  try {
    const response = await fetch('/api/articles/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.user.token}`
      },
      body: JSON.stringify(newArticle.value)
    })
    
    if (response.ok) {
      showCreateForm.value = false
      newArticle.value = { title: '', content: '', image: '' }
      await fetchArticles()
    }
  } catch (error) {
    console.error('Error creating article:', error)
  }
}

onMounted(fetchArticles)
</script>