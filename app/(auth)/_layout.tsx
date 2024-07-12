import { Stack } from 'expo-router'

export default function RootLayout() {
  const tabs = [
    {
      name: 'index',
    },
    {
      name: 'OTP/index',
    },
  ]

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
