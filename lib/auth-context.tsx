"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "customer" | "admin"
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock users for demo purposes
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    email: "admin@fitgear.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "john@example.com",
    password: "password123",
    name: "John Doe",
    role: "customer",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("fitgear_user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
      } catch {
        localStorage.removeItem("fitgear_user")
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      const { password: _, ...userWithoutPassword } = user
      setAuthState({
        user: userWithoutPassword,
        isLoading: false,
        isAuthenticated: true,
      })
      localStorage.setItem("fitgear_user", JSON.stringify(userWithoutPassword))
      return { success: true }
    }

    return { success: false, error: "Invalid email or password" }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "customer",
    }

    // Add to mock users (in real app, this would be an API call)
    mockUsers.push({ ...newUser, password })

    setAuthState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true,
    })
    localStorage.setItem("fitgear_user", JSON.stringify(newUser))
    return { success: true }
  }

  const logout = () => {
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
    localStorage.removeItem("fitgear_user")
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
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
