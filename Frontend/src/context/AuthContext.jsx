import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)
  const [idToken, setIdToken] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize authentication state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('idToken')
      
      if (storedToken) {
        try {
          const tokenPayload = JSON.parse(atob(storedToken.split('.')[1]))
          const currentTime = Date.now() / 1000
          
          if (tokenPayload.exp > currentTime) {
            setIdToken(storedToken)
            console.log(' Valid idToken restored from localStorage')
          } else {
            localStorage.removeItem('idToken')
            console.log('Expired idToken removed from localStorage')
          }
        } catch (error) {
          localStorage.removeItem('idToken')
          console.log('Invalid idToken removed from localStorage')
        }
      }
      
      setIsInitialized(true)
    }

    initializeAuth()
  }, [])

  // Check if user is authenticated based on idToken presence
  const isAuthenticated = () => {
    const token = localStorage.getItem('idToken')
    return !!(token && currentUser && idToken)
  }

  // Get and store fresh idToken - OPTIMIZED
  const getAndStoreToken = async (user) => {
    try {
      const token = await user.getIdToken(false) // Don't force refresh on first call
      localStorage.setItem('idToken', token)
      setIdToken(token)
      console.log('idToken stored successfully')
      return token
    } catch (error) {
      console.error('Error getting idToken:', error)
      return null
    }
  }

  // Clear idToken from storage and state
  const clearToken = () => {
    localStorage.removeItem('idToken')
    setIdToken(null)
    console.log('idToken cleared from localStorage')
  }

  // Get user display name for navbar
  const getUserDisplayName = () => {
    if (userProfile?.name) return userProfile.name
    if (currentUser?.displayName) return currentUser.displayName
    if (currentUser?.email) return currentUser.email.split('@')[0]
    return 'User'
  }

  // Get user initials for profile icon
  const getUserInitials = () => {
    const name = getUserDisplayName()
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const signup = async (email, password, userData) => {
    try {
      console.log('Starting signup process...')
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Get and store idToken immediately
      await getAndStoreToken(user)

      // Update profile and save to Firestore in parallel
      const [profileUpdate] = await Promise.allSettled([
        updateProfile(user, { displayName: userData.name }),
        setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: userData.name,
          email: userData.email,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true
        })
      ])

      // Set basic profile immediately (don't wait for Firestore)
      setUserProfile({
        uid: user.uid,
        name: userData.name,
        email: userData.email
      })

      console.log('Signup successful - ready for immediate redirect')
      return { success: true, user: userCredential, userData: { name: userData.name, email: userData.email } }
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  // OPTIMIZED Login - Faster processing
  const login = async (email, password) => {
    try {
      console.log('Starting login process...')
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Get and store idToken immediately
      await getAndStoreToken(userCredential.user)
      
      console.log('Login successful - ready for immediate redirect')
      return { success: true, user: userCredential }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Complete logout with idToken cleanup
  const logout = async () => {
    try {
      console.log('Starting logout process...')
      
      // Clear idToken from localStorage first (security priority)
      clearToken()
      
      // Sign out from Firebase
      await signOut(auth)
      
      // Clear all local state
      setCurrentUser(null)
      setUserProfile(null)
      
      console.log('Logout successful - ready for redirect')
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      // Even if Firebase signout fails, ensure local cleanup
      clearToken()
      setCurrentUser(null)
      setUserProfile(null)
      return { success: true }
    }
  }

  // Get user profile from Firestore - NON-BLOCKING
  const getUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        return userDoc.data()
      }
      return null
    } catch (error) {
      console.error('Error getting user profile:', error)
      return null
    }
  }

  // Enhanced auth state listener - OPTIMIZED
  useEffect(() => {
    if (!isInitialized) return

    console.log('Setting up Firebase auth state listener...')
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Firebase auth state changed:', user ? `User: ${user.uid}` : 'No user')
      
      if (user) {
        try {
          // Get token immediately
          await getAndStoreToken(user)
          
          // Set user immediately with basic info
          setCurrentUser(user)
          setUserProfile({
            uid: user.uid,
            name: user.displayName || user.email.split('@')[0],
            email: user.email
          })

          // Get full profile in background (non-blocking)
          getUserProfile(user.uid).then(profile => {
            if (profile) {
              setUserProfile(profile)
            }
          })

          console.log('User authenticated with idToken stored')
        } catch (error) {
          console.error('Error in auth state change:', error)
          setCurrentUser(user)
          setUserProfile({
            uid: user.uid,
            name: user.displayName || user.email.split('@')[0],
            email: user.email
          })
        }
      } else {
        console.log('User signed out - clearing all data')
        clearToken()
        setCurrentUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => {
      console.log('Cleaning up auth listeners')
      unsubscribe()
    }
  }, [isInitialized])

  // Context value with all authentication methods and state
  const value = {
    // User data
    currentUser,
    user: currentUser,
    userProfile,
    idToken,
    loading: loading || !isInitialized,
    
    // Authentication state
    isAuthenticated,
    getUserDisplayName,
    getUserInitials,
    
    // Authentication methods
    signup,
    login,
    logout,
    
    // Token management
    getAndStoreToken,
    clearToken,
    
    // Utility
    sendPasswordResetEmail: (email) => sendPasswordResetEmail(auth, email)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
