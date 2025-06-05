import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async login(username, password) {
      try {
        this.loading = true
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })
        
        if (!response.ok) {
          throw new Error('Login failed')
        }

        const data = await response.json()
        this.user = data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async register(email, password, username, bio) {
      try {
        this.loading = true
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, username, bio })
        })

        if (!response.ok) {
          throw new Error('Registration failed')
        }

        const data = await response.json()
        this.user = data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.user = null
    }
  }
})