'use client'

import { User, LogOut, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useCartStore } from '@/lib/stores/cartStore'
import { useEffect, useState } from 'react'

interface UserProfile {
  first_name: string
  last_name: string
  email: string
}

export function UserMenu() {
  const { user } = useAuth()
  const router = useRouter()
  const clearCart = useCartStore((state) => state.clearCart)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile
  useEffect(() => {
    if (user?.id) {
      fetchUserProfile()
    }
  }, [user])

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('first_name, last_name, email')
        .eq('id', user?.id)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
    } else {
      clearCart()
      toast.success('Signed out successfully')
      router.push('/')
    }
  }

  // Get user initials from first name
  const getUserInitials = () => {
    if (profile?.first_name) {
      return profile.first_name.charAt(0).toUpperCase()
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return '?'
  }

  // Get display name
  const getDisplayName = () => {
    if (profile?.first_name) {
      return profile.first_name
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-100">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-brand-primary text-white">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg" 
        align="end" 
        forceMount
      >
        <div className="flex items-center justify-start gap-2 p-3">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-sm text-gray-900">
              Welcome {getDisplayName()}
            </p>
            <p className="text-xs text-gray-500">
              {profile?.email || user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-gray-100" />
        <DropdownMenuItem 
          onClick={() => router.push('/orders')}
          className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-brand-primary focus:bg-gray-50 focus:text-brand-primary"
        >
          <Package className="mr-2 h-4 w-4" />
          <span>My Orders</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => router.push('/profile')}
          className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-brand-primary focus:bg-gray-50 focus:text-brand-primary"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-100" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}