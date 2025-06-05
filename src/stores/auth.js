import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async login(email, password) {
      try {
        this.loading = true
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
        this.user = data.user
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async register(email, password, username) {
      try {
        this.loading = true
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username
            }
          }
        })
        if (error) throw error
        this.user = data.user
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.user = null
      } catch (error) {
        this.error = error.message
      }
    }
  }
})