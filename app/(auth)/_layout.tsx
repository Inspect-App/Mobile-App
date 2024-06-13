import { Stack } from 'expo-router'

export default function RootLayout() {
  const screens = [
    {
      name: 'index',
      options: {
        headerTitle: 'Login',
      },
    },
    {
      name: 'register/index',
      options: {
        headerTitle: 'Register',
      },
    },
    {
      name: 'sixDigit/index',
      options: {
        headerTitle: '2FA',
      },
    },
  ]

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      {screens.map((screen) => (
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack>
  )
}
