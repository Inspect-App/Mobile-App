import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Stack, router } from 'expo-router'
import { useEffect } from 'react'

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

  const { user, tokens, isLoading, signOut } = useAuth()

  useEffect(() => {
    if (user && !user.isVerified) {
      router.replace('(auth)/OTP')
    } else if (user) {
      router.replace('tabs')
    }
  }, [isLoading, tokens, user])

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
