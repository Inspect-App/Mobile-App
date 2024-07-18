import { Link } from 'expo-router'
import React from 'react'
import { View, Text, FlatList } from 'react-native'

const index = () => {
  const ads = [
    {
      id: '1',
      title: 'Watch a 30s ad for 2 mins',
    },
    {
      id: '2',
      title: 'Watch a 30s ad for 2 mins',
    },
    {
      id: '3',
      title: 'Watch a 30s ad for 2 mins',
    },
    {
      id: '4',
      title: 'Watch a 30s ad for 2 mins',
    },
  ]
  return (
    <View className="h-full w-full bg-light-50 px-4 dark:bg-dark-50">
      <View className="flex w-full flex-row items-center justify-between py-6">
        <View className="flex flex-col items-center justify-center">
          <View className="rounded-2xl bg-light-100 px-20 py-4 dark:bg-dark-100">
            <Text className="text-2xl font-bold text-light-950 dark:text-dark-950">08</Text>
          </View>
          <Text className="mt-4 text-xl text-light-950 dark:text-dark-950">Minutes</Text>
        </View>
        <View className="flex flex-col items-center justify-center">
          <View className="rounded-2xl bg-light-100 px-20 py-4 dark:bg-dark-100">
            <Text className="text-2xl font-bold text-light-950 dark:text-dark-950">05</Text>
          </View>
          <Text className="mt-4 text-xl text-light-950 dark:text-dark-950">Seconds</Text>
        </View>
      </View>
      <View>
        <Text className="mb-4 mt-6 text-2xl font-bold text-light-950 dark:text-dark-950">
          Gain More Time
        </Text>
        <FlatList
          horizontal={true}
          data={ads}
          renderItem={AdItem}
          keyExtractor={(item) => item.id}
          persistentScrollbar={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View className="mt-28 flex h-[200px] w-full flex-row items-center justify-center">
        <Link href="inspectingMode">
          <View className="flex w-[300px] items-center justify-center rounded-full bg-[#F20D0D] py-4">
            <Text className="text-xl font-bold text-light-50">Start Inspecting</Text>
          </View>
        </Link>
      </View>
    </View>
  )
}

function AdItem({ item }: { item: { id: string; title: string } }) {
  return (
    <View className="mr-5 flex flex-col gap-y-5">
      <View className="h-60 w-60 rounded-2xl bg-light-100 dark:bg-dark-100" />
      <Text className="text-lg text-light-950 dark:text-dark-950">{item.title}</Text>
    </View>
  )
}

export default index
