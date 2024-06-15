import { Tabs } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme'

function HomeIcon({ color }: { color: string }) {
  return <Feather name="home" size={20} color={color} />
}

function PendingIcon({ color }: { color: string }) {
  return <AntDesign name="clockcircleo" size={20} color={color} />
}

function DeletedIcon({ color }: { color: string }) {
  return <Feather name="trash-2" size={20} color={color} />
}

function SavedIcon({ color }: { color: string }) {
  return <FontAwesome name="bookmark" size={20} color={color} />
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const tabs = [
    {
      name: 'index',
      options: {
        headerTitle: 'Home',
        tabBarIcon: HomeIcon,
      },
    },
    {
      name: 'viewPendingVideos/index',
      options: {
        headerTitle: 'Pending',
        tabBarIcon: PendingIcon,
      },
    },
    // {
    //   name: 'inspect/index',
    //   options: {
    //     headerTitle: 'Inspect',
    //     tabBarIcon: InspectIcon,
    //   },
    // },
    {
      name: 'deleted/index',
      options: {
        headerTitle: 'Deleted',
        tabBarIcon: DeletedIcon,
      },
    },
    {
      name: 'saved',
      options: {
        headerTitle: 'Saved',
        tabBarIcon: SavedIcon,
      },
    },
  ]

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
        },
      }}
    >
      {tabs.map(({ name, options }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            ...options,
            tabBarInactiveTintColor: colorScheme === 'dark' ? '#B89E9E' : '#876363',
            tabBarStyle: {
              backgroundColor: colorScheme === 'dark' ? '#261C1C' : '#F5F0F0',
            },
          }}
        />
      ))}
    </Tabs>
  )
}
