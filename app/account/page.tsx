"use client"

import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Heart, Settings, User as UserIcon } from "lucide-react"
import { getUserProfile } from "@/lib/api"
import { User } from "@/lib/auth-context"

// Dynamically import components that use browser APIs
const Header = dynamic<{}>(
  () => import('@/components/header').then(mod => mod.Header),
  { ssr: false }
)
const FooterSection = dynamic<{}>(
  () => import('@/components/sections/Footer').then(mod => mod.FooterSection),
  { ssr: false }
)

export default function AccountPage() {
  const { user, isAuthenticated, isLoading, token } = useAuth()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
      return
    }

    if (isAuthenticated && token) {
      fetchUserProfile()
    }
  }, [isAuthenticated, isLoading, router, token])

  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true)
      const response = await getUserProfile(token || undefined)
      
      if (response.success && response.data) {
        setUserProfile(response.data)
      } else {
        // Fall Back to auth context user if API fails
        setUserProfile(user)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      // Fall back to auth context user
      setUserProfile(user)
    } finally {
      setProfileLoading(false)
    }
  }

  if (typeof window === 'undefined' || isLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your account...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    // Let the client-side redirect handle this
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {(userProfile?.name || user?.name || '')
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
                <CardTitle className="text-xl">{userProfile?.name || user?.name}</CardTitle>
                
               
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Heart className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Wishlist</h3>
                        <p className="text-sm text-muted-foreground">Saved items</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow ">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Profile</h3>
                        <p className="text-sm text-muted-foreground">Name : {userProfile?.name || user?.name}</p>
                        <p className="text-sm text-muted-foreground">Email : {userProfile?.email || user?.email}</p>
                        
                        
                      </div>
                    </div>
                  </CardContent>
                </Card>

              
              </div>

              {/* Recent Orders */}
            
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  )
}
