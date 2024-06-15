import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Link } from 'expo-router'

type Video = {
  title: string
  description: string
  url: string
  id: string
}

const Index = () => {
  const videos = [
    {
      title: 'Pending Inspection',
      list: [
        {
          id: '1',
          title: 'Pending Inspection',
          description: 'Pending Inspection',
          url: 'https://www.youtube.com/watch?v=6bBdU3mXU0s',
        },
        {
          id: '2',
          title: 'Pending Inspection',
          description: 'Pending Inspection',
          url: 'https://www.youtube.com/watch?v=6bBdU3mXU0s',
        },
      ],
    },
    {
      title: 'Saved For Later',
      list: [
        {
          id: '3',
          title: 'Saved For Later',
          description: 'Saved For Later',
          url: 'https://www.youtube.com/watch?v=6bBdU3mXU0s',
        },
        {
          id: '4',
          title: 'Saved For Later',
          description: 'Saved For Later',
          url: 'https://www.youtube.com/watch?v=6bBdU3mXU0s',
        },
      ],
    },
  ]

  const colorScheme = useColorScheme()

  return (
    <View className="h-full bg-light-50 px-4 dark:bg-dark-50">
      {videos.map((video) => {
        return (
          <View key={video.title} className="py-2">
            <Text className="mb-5 text-2xl font-bold text-light-950 dark:text-dark-950">
              {video.title}
            </Text>
            <FlatList
              horizontal={true}
              data={video.list}
              renderItem={VideoItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        )
      })}
      <View className="absolute bottom-2 flex w-full items-center justify-center pl-8">
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

function VideoItem({ item }: { item: Video }) {
  return <View className="mr-6 h-60 w-40 rounded-md bg-light-100 dark:bg-dark-100" />
}

export default Index
