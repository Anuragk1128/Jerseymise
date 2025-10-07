"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { registerUser, loginUser } from "./api"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "customer" | "admin"
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string, otp: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  getAuthHeaders: () => Record<string, string> | {}
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
}

const AuthContext = createContext<AuthContextType | null>(null)

// Real API auth implementation - no mock data needed

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("fitgear_user")
    const storedToken = localStorage.getItem("fitgear_token")
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser)
        setAuthState({
          user,
          token: storedToken,
          isLoading: false,
          isAuthenticated: true,
        })
      } catch {
        localStorage.removeItem("fitgear_user")
        localStorage.removeItem("fitgear_token")
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    } else {
      // Clean up any partial data
      localStorage.removeItem("fitgear_user")
      localStorage.removeItem("fitgear_token")
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await loginUser({ email, password })
      
      if (result.success && result.data) {
        const { token, user: apiUser } = result.data
        const user: User = {
          id: apiUser.id,
          email: apiUser.email,
          name: apiUser.name,
          role: apiUser.role as "customer" | "admin"
        }
        
        setAuthState({
          user,
          token,
          isLoading: false,
          isAuthenticated: true,
        })
        localStorage.setItem("fitgear_user", JSON.stringify(user))
        localStorage.setItem("fitgear_token", token)
        return { success: true }
      }
      
      return { success: false, error: result.error || "Login failed" }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    otp: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await registerUser({ name, email, password, otp })
      
      if (result.success && result.data) {
        const { token, user: apiUser } = result.data
        const user: User = {
          id: apiUser.id,
          email: apiUser.email,
          name: apiUser.name,
          role: apiUser.role as "customer" | "admin"
        }
        
        setAuthState({
          user,
          token,
          isLoading: false,
          isAuthenticated: true,
        })
        localStorage.setItem("fitgear_user", JSON.stringify(user))
        localStorage.setItem("fitgear_token", token)
        return { success: true }
      }
      
      return { success: false, error: result.error || "Registration failed" }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    })
    localStorage.removeItem("fitgear_user")
    localStorage.removeItem("fitgear_token")
  }

  const getAuthHeaders = () => {
    return authState.token ? { Authorization: `Bearer ${authState.token}` } : {}
  }

  const value = {
    ...authState,
    login,
    register,
    logout,
    getAuthHeaders,
    setAuthState, // Expose setAuthState in the context
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
