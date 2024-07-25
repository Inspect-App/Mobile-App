import React, { useEffect } from 'react'
import { useStorageState } from '../hooks/useStorageState'
import { AuthApi, User } from '@/api/auth/AuthApi'
import { UserApi } from '@/api/auth/UserApi'

const AuthContext = React.createContext<{
  signIn: (signInDto: { email: string; password: string }) => Promise<boolean | undefined>
  signOut: () => void
  verify: (verifyDto: { email: string; verificationCode: string }) => Promise<void>
  tokens?: {
    accessToken: string
    refreshToken: string
  } | null
  isLoading: boolean
  user: User
  signUp: (signUpDto: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => Promise<boolean | undefined>
}>({
  signIn: () => Promise.resolve(undefined),
  signOut: () => null,
  tokens: null,
  isLoading: false,
  user: null,
  verify: () => Promise.resolve(),
  signUp: () => Promise.resolve(undefined),
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
  const [user, setUser] = React.useState<User>(null)

  useEffect(() => {
    if (tokens && !user) {
      const userApi = new UserApi()

      userApi
        .getMe()
        .then((response) => {
          if (response.payload) {
            setUser(response.payload)
          }
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
  }, [tokens, user])

  const authApi = new AuthApi()
  return (
    <AuthContext.Provider
      value={{
        verify: (verifyDto: { email: string; verificationCode: string }) => {
          return authApi
            .verify(verifyDto)
            .then((response) => {
              if (response.payload) {
                setTokens(
                  JSON.stringify({
                    accessToken: response.payload.accessToken,
                    refreshToken: response.payload.refreshToken,
                  })
                )

                setUser(response.payload.user)
              }
            })
            .catch((error) => {
              throw error
            })
        },
        signIn: (signInDto: { email: string; password: string }) => {
          return authApi
            .login(signInDto)
            .then((response) => {
              if (response.payload) {
                setTokens(
                  JSON.stringify({
                    accessToken: response.payload.accessToken,
                    refreshToken: response.payload.refreshToken,
                  })
                )

                setUser(response.payload.user)
                if (!response.payload.user?.isVerified) {
                  return false
                }
                return true
              }
            })
            .catch((error) => {
              throw error
            })
        },
        signUp: (signUpDto: {
          email: string
          password: string
          firstName: string
          lastName: string
        }) => {
          return authApi
            .signUp(signUpDto)
            .then((response) => {
              if (response.payload) {
                setTokens(
                  JSON.stringify({
                    accessToken: response.payload.accessToken,
                    refreshToken: response.payload.refreshToken,
                  })
                )

                setUser(response.payload.user)
                if (!response.payload.user?.isVerified) {
                  return false
                }
                return true
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
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
