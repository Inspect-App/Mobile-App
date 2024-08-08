import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Swipeable } from 'react-native-gesture-handler'

const Index = () => {
  const videos = [
    {
      id: '1',
      title: 'Video 1',
      recordedAgo: '2 weeks',
    },
    {
      id: '2',
      title: 'Video 2',
      recordedAgo: '3 weeks',
    },
    {
      id: '3',
      title: 'Video 3',
      recordedAgo: '4 weeks',
    },
    {
      id: '4',
      title: 'Video 4',
      recordedAgo: '5 weeks',
    },
    {
      id: '5',
      title: 'Video 5',
      recordedAgo: '6 weeks',
    },
    {
      id: '6',
      title: 'Video 6',
      recordedAgo: '7 weeks',
    },
  ]

  const colorScheme = useColorScheme()

  return (
    <View className="flex h-full w-full flex-col px-4 bg-light-50 dark:bg-dark-50">
      <View className="h-[85%]">
        <FlatList
          horizontal={false}
          data={videos}
          renderItem={({ item }) => <VideoItem item={item} colorScheme={colorScheme} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View className="absolute bottom-3 flex w-full items-center justify-center pl-8">
        <Link href="/inspect">
          <View className="flex flex-row justify-center gap-2 rounded-full bg-light-100 px-5 py-4 dark:bg-dark-100">
            <AntDesign name="camera" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
            <Text className="text-xl font-bold text-light-950 dark:text-dark-950">Inspect</Text>
          </View>
        </Link>
      </View>
    </View>
  )
}

function VideoItem({
  item,
  colorScheme,
}: {
  item: {
    id: string
    title: string
    recordedAgo: string
  }
  colorScheme: string | undefined | null
}) {
  const leftSwipe = () => {
    return (
      <View className="flex flex-row">
        <TouchableOpacity activeOpacity={0.6}>
          <View className="flex h-full w-12 items-center justify-center">
            <View className="flex h-8 w-8 items-center justify-center rounded-full bg-light-100 dark:bg-dark-100">
              <FontAwesome
                name="remove"
                size={16}
                color={colorScheme === 'dark' ? 'white' : 'black'}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <View className="flex flex-row items-center py-3">
        <View className="h-24 w-40 rounded-2xl bg-light-100 dark:bg-dark-100" />
        <View className="px-5">
          <Text className="text-xl font-semibold text-light-950 dark:text-dark-950">
            {item.title}
          </Text>
          <Text className="text-sm text-light-800 dark:text-dark-900">{item.recordedAgo}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

export default Index
