'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { useCartStore } from '@/lib/stores/cartStore'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>  // Add this line
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},  // Add default implementation
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { loadFromDatabase, syncWithDatabase, clearCart } = useCartStore()

  // Add signOut function
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      clearCart() // Optional: clear cart on sign out
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      // Load cart from database when user is authenticated
      if (user) {
        await loadFromDatabase(user.id)
      }
      
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        // Handle cart synchronization on auth state changes
        if (event === 'SIGNED_IN' && session?.user) {
          // Load cart from database when user signs in
          await loadFromDatabase(session.user.id)
        } else if (event === 'SIGNED_OUT') {
          // Clear cart when user signs out
          clearCart()
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [loadFromDatabase, clearCart])

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}