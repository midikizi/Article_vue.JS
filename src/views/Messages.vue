<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Messages</h1>
        <button 
          v-if="authStore.user"
          @click="showCreateForm = true" 
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Send Message
        </button>
      </div>

      <!-- Create Message Form -->
      <div v-if="showCreateForm" class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-xl font-semibold mb-4">Send New Message</h2>
        <form @submit.prevent="sendMessage" class="space-y-4">
          <div>
            <label class="block text-gray-700">Title</label>
            <input 
              v-model="newMessage.title" 
              type="text" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
          </div>
          <div>
            <label class="block text-gray-700">Content</label>
            <textarea 
              v-model="newMessage.content" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label class="block text-gray-700">Attachment URL (Optional)</label>
            <input 
              v-model="newMessage.attachment" 
              type="url" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
              Send
            </button>
          </div>
        </form>
      </div>

      <!-- Messages List -->
      <div class="space-y-4">
        <div v-for="message in messages" :key="message.id" class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start">
            <h2 class="text-xl font-semibold">{{ message.title }}</h2>
            <button 
              v-if="authStore.user"
              @click="editMessage(message)" 
              class="text-gray-600 hover:text-gray-900"
            >
              Edit
            </button>
          </div>
          <p class="mt-2 text-gray-600">{{ message.content }}</p>
          <a 
            v-if="message.attachment" 
            :href="message.attachment" 
            target="_blank" 
            class="mt-2 text-blue-500 hover:text-blue-600 block"
          >
            View Attachment
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const messages = ref([])
const showCreateForm = ref(false)
const newMessage = ref({
  title: '',
  content: '',
  attachment: ''
})

const fetchMessages = async () => {
  try {
    const response = await fetch('/api/messages')
    if (!response.ok) {
      throw new Error('Failed to fetch messages')
    }
    messages.value = await response.json()
  } catch (error) {
    console.error('Error fetching messages:', error)
  }
}

const sendMessage = async () => {
  try {
    const response = await fetch('/api/messages/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.user.token}`
      },
      body: JSON.stringify(newMessage.value)
    })
    
    if (!response.ok) {
      throw new Error('Failed to send message')
    }
    
    showCreateForm.value = false
    newMessage.value = { title: '', content: '', attachment: '' }
    await fetchMessages()
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

const editMessage = async (message) => {
  try {
    const response = await fetch(`/api/messages/${message.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.user.token}`
      },
      body: JSON.stringify(message)
    })
    
    if (!response.ok) {
      throw new Error('Failed to edit message')
    }
    
    await fetchMessages()
  } catch (error) {
    console.error('Error editing message:', error)
  }
}

onMounted(fetchMessages)
</script>