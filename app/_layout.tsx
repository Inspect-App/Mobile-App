import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import '../global.css'
import { Ionicons } from '@expo/vector-icons'

import { useColorScheme } from '@/hooks/useColorScheme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <Stack>
          {screens.map((screen) => (
            <Stack.Screen key={screen.name} {...screen} />
          ))}
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
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
