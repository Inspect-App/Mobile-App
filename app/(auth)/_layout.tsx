import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Stack, router } from 'expo-router'
import { useState, useEffect } from 'react'

export default function RootLayout() {
  const tabs = [
    {
      name: 'OTP/index',
    },
    {
      name: 'index',
    },
    {
      name: 'register/index',
    },
  ]

  const [hasRedirected, setHasRedirected] = useState(false)
  const { user, tokens, isLoading, signOut } = useAuth()

  useEffect(() => {
    if (user && !user.isVerified && !hasRedirected) {
      router.replace('(auth)/OTP')
      setHasRedirected(true)
    } else if (user && user.isVerified && !hasRedirected) {
      router.replace('tabs')
      setHasRedirected(true)
    }
  }, [isLoading, tokens, user, hasRedirected])

  return (
    <Stack>
      {tabs.map(({ name }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            headerShown: false,
          }}
        />
      ))}
    </Stack>
  )
}
