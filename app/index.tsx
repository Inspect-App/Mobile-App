import { Redirect, Stack, useNavigation } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

import { useAuth } from '@/providers/AuthProvider'

import { useColorScheme } from '@/hooks/useColorScheme'
import { Ionicons } from '@expo/vector-icons'
export default function Index() {
  const { tokens, isLoading, signOut } = useAuth()

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (tokens) {
    console.log(tokens)
    //  signOut()

    return <Redirect href="(auth)" />
  }

  const screens = [
    {
      name: '(tabs)',
      options: {
        headerShown: false,
      },
    },
    {
      name: 'inspect/index',
      options: {
        headerTitle: 'Inspect',
        headerLeft: BackIcon,
      },
    },
    {
      name: 'inspectingMode/index',
      options: {
        headerTitle: 'Inspecting Mode',
        headerLeft: BackIcon,
      },
    },
  ]

  return (
    <Stack>
      {screens.map((screen) => (
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack>
  )
}

function BackIcon() {
  const navigation = useNavigation()
  const colorScheme = useColorScheme()

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons
        name="arrow-back-outline"
        size={24}
        color={colorScheme === 'dark' ? 'white' : 'black'}
      />
    </TouchableOpacity>
  )
}
