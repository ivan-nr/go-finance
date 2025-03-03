"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types/user"
import { loginUser, registerUser, fetchCurrentUser } from "@/lib/api"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (fullName: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUserData: (updatedUser: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("authToken")
        if (token) {
          const userData = await fetchCurrentUser()
          setUser(userData)
        }
      } catch (error) {
        console.error("Authentication error:", error)
        // Clear token if we get an error
        localStorage.removeItem("authToken")
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string) => {
    const { user, token } = await loginUser(email, password)

    // Store token in localStorage
    localStorage.setItem("authToken", token)

    // Update state
    setUser(user)
  }

  const register = async (fullName: string, email: string, password: string) => {
    const { user, token } = await registerUser(fullName, email, password)

    // Store token in localStorage
    localStorage.setItem("authToken", token)

    // Update state
    setUser(user)
  }

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("authToken")

    // Update state
    setUser(null)
  }

  const updateUserData = (updatedUser: User) => {
    setUser(updatedUser)
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUserData,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

