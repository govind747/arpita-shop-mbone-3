'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { ProfileForm } from '@/components/profile/ProfileForm'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { User, Shield, ShoppingBag, Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-secondary mb-4">Please sign in</h1>
          <p className="text-muted-foreground">You need to be signed in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-secondary mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-10 w-10 text-brand-accent" />
                  </div>
                  <h3 className="font-semibold text-brand-secondary">
                    {user.email?.split('@')[0] || 'User'}
                  </h3>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>

                <Separator />

                <nav className="space-y-2">
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/orders">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      My Orders
                    </Button>
                  </Link>
                  <Link href="/wishlist">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Heart className="h-4 w-4" />
                      Wishlist
                    </Button>
                  </Link>
                  <Link href="/security">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Shield className="h-4 w-4" />
                      Security
                    </Button>
                  </Link>
                </nav>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileForm />
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preferences</CardTitle>
                  <CardDescription>Manage your notification and display preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Notifications</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Order updates</span>
                        <Switch id="order-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Promotional emails</span>
                        <Switch id="promotional-emails" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Newsletter</span>
                        <Switch id="newsletter" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Display Preferences</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Currency display</span>
                        <select className="border rounded-md px-2 py-1 text-sm">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Theme</span>
                        <select className="border rounded-md px-2 py-1 text-sm">
                          <option>Light</option>
                          <option>Dark</option>
                          <option>System</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button className="bg-brand-accent hover:bg-brand-accent/90">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Import missing components
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'