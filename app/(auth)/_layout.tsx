import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Stack, router } from 'expo-router'

export default function RootLayout() {
  const tabs = [
    {
      name: 'OTP/index',
    },
    {
      name: 'index',
    },
  ]

  const { user } = useAuth()

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
