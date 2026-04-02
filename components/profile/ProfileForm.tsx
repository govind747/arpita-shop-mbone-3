'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { User, Mail, Phone, Calendar, Save, Loader2, Camera, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProfileFormData {
  first_name: string
  last_name: string
  full_name: string
  phone: string
  avatar_url: string
}

export function ProfileForm() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: '',
    last_name: '',
    full_name: '',
    phone: '',
    avatar_url: ''
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      if (data) {
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          full_name: data.full_name || '',
          phone: data.phone || '',
          avatar_url: data.avatar_url || ''
        })
        setAvatarPreview(data.avatar_url || '')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate full_name from first and last name
      ...(name === 'first_name' || name === 'last_name' ? {
        full_name: `${name === 'first_name' ? value : formData.first_name} ${name === 'last_name' ? value : formData.last_name}`.trim()
      } : {})
    }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const preview = URL.createObjectURL(file)
      setAvatarPreview(preview)
    }
  }

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return null

    const fileExt = avatarFile.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile)

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    try {
      let avatarUrl = formData.avatar_url

      // Upload new avatar if selected
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar()
        if (uploadedUrl) avatarUrl = uploadedUrl
      }

      // Update profile
      const { error } = await supabase
        .from('users')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          full_name: formData.full_name,
          phone: formData.phone,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      toast.success('Profile updated successfully!')
      
      // Refresh the page to show updated data
      router.refresh()
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    toast.success('Signed out successfully')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Picture</CardTitle>
          <CardDescription>Upload a photo to personalize your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarPreview} />
              <AvatarFallback className="bg-brand-accent text-white text-xl">
                {formData.first_name?.[0] || formData.email?.[0] || user?.email?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-1 bg-brand-accent rounded-full cursor-pointer hover:bg-brand-accent/90 transition-colors"
            >
              <Camera className="h-4 w-4 text-white" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground">
            Click the camera icon to upload a profile picture
          </p>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Enter your first name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="pl-10 bg-muted/30"
                placeholder="Auto-generated from first and last name"
                disabled
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Full name is automatically generated from first and last name
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                value={user?.email || ''}
                className="pl-10 bg-muted/30"
                disabled
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Email cannot be changed. Contact support if you need to update it.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Account Created</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''}
                className="pl-10 bg-muted/30"
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={saving}
          className="bg-brand-accent hover:bg-brand-accent/90 flex-1"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleSignOut}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </form>
  )
}