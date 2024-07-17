import React from 'react'
import { useStorageState } from '../hooks/useStorageState'
import { AuthApi } from '@/api/auth/AuthApi'

const AuthContext = React.createContext<{
  signIn: (signInDto: { email: string; password: string }) => Promise<void>
  signOut: () => void
  tokens?: {
    accessToken: string
    refreshToken: string
  } | null
  isLoading: boolean
}>({
  signIn: () => Promise.resolve(),
  signOut: () => null,
  tokens: null,
  isLoading: false,
})

// This hook can be used to access the user info.
export function useAuth() {
  const value = React.useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function AuthProvider(props: React.PropsWithChildren) {
  const [[isLoading, tokens], setTokens] = useStorageState('tokens')

  const authApi = new AuthApi()
  return (
    <AuthContext.Provider
      value={{
        signIn: (signInDto: { email: string; password: string }) => {
          return authApi
            .login(signInDto)
            .then((response) => {
              if (response.payload) {
                setTokens(JSON.stringify(response.payload))
              }
            })
            .catch((error) => {
              throw error
            })
        },
        signOut: () => {
          setTokens(null)
        },

        tokens: tokens ? JSON.parse(tokens) : null,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
