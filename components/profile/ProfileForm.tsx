'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { User, Mail, Phone, Calendar, Save, Loader2, Camera, Lock, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface ProfileFormData {
  first_name: string
  last_name: string
  full_name: string
  phone: string
  avatar_url: string
}

export function ProfileForm() {
  const { user, signOut } = useAuth()
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
    if (user) fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
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
      toast.error('Unable to fetch profile details')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'first_name' || name === 'last_name' ? {
        full_name: `${name === 'first_name' ? value : formData.first_name} ${name === 'last_name' ? value : formData.last_name}`.trim()
      } : {})
    }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("File too large (Max 2MB)")
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      let avatarUrl = formData.avatar_url

      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop()
        const filePath = `avatars/${user?.id}-${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatarFile)
        if (uploadError) throw uploadError
        avatarUrl = supabase.storage.from('avatars').getPublicUrl(filePath).data.publicUrl
      }

      const { error } = await supabase
        .from('users')
        .update({ ...formData, avatar_url: avatarUrl, updated_at: new Date().toISOString() })
        .eq('id', user?.id)

      if (error) throw error
      toast.success('Profile updated successfully')
      router.refresh()
    } catch (error) {
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="h-64 flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-10 w-10 animate-spin text-brand-accent" />
      <p className="text-slate-400 font-bold animate-pulse">Synchronizing Profile...</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      {/* Avatar Integration Section */}
      <div className="flex flex-col sm:flex-row items-center gap-8 bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-accent to-blue-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
          <Avatar className="h-32 w-32 border-4 border-white shadow-2xl relative">
            <AvatarImage src={avatarPreview} className="object-cover" />
            <AvatarFallback className="bg-slate-900 text-white text-3xl font-black">
              {formData.first_name?.[0] || user?.email?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <label htmlFor="avatar-upload" className="absolute bottom-1 right-1 h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center cursor-pointer border-4 border-white hover:bg-brand-accent transition-all shadow-lg active:scale-90">
            <Camera className="h-4 w-4 text-white" />
            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>
        <div className="text-center sm:text-left space-y-2">
          <h3 className="text-xl font-black text-slate-900">Profile Photo</h3>
          <p className="text-sm text-slate-500 font-medium max-w-[240px]">
            JPG or PNG. Max size of 2MB. A clean photo helps identify your orders.
          </p>
          {avatarFile && <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">New Image Ready</span>}
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">First Name</Label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
            <Input name="first_name" value={formData.first_name} onChange={handleInputChange} className="h-12 pl-12 bg-white border-slate-100 rounded-xl focus:ring-brand-accent/10" placeholder="John" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</Label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
            <Input name="last_name" value={formData.last_name} onChange={handleInputChange} className="h-12 pl-12 bg-white border-slate-100 rounded-xl focus:ring-brand-accent/10" placeholder="Doe" />
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name Display</Label>
          <div className="relative">
            <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
            <Input value={formData.full_name} disabled className="h-12 pl-12 bg-slate-50 border-none rounded-xl text-slate-500 font-bold" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <Input value={user?.email || ''} disabled className="h-12 pl-12 bg-slate-50 border-none rounded-xl text-slate-300 font-medium italic" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Contact</Label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
            <Input name="phone" value={formData.phone} onChange={handleInputChange} className="h-12 pl-12 bg-white border-slate-100 rounded-xl focus:ring-brand-accent/10" placeholder="+1 (555) 000-0000" />
          </div>
        </div>
      </div>

      <Separator className="bg-slate-100" />

      {/* Form Action */}
      <div className="flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <Calendar className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-tighter">Joined {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'recently'}</span>
        </div>
        <Button 
          type="submit" 
          disabled={saving} 
          className="h-12 px-10 bg-slate-900 hover:bg-brand-accent text-white font-bold rounded-xl transition-all shadow-xl shadow-slate-900/10 active:scale-95"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </div>
          )}
        </Button>
      </div>
    </form>
  )
}