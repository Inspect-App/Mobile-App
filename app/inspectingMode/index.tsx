import React from 'react'
import { Image, Text, View } from 'react-native'

const index = () => {
  return (
    <View className="flex h-full w-full flex-col bg-light-50 dark:bg-dark-50">
      <View className="h-1/2">
        <Image
          source={require('../../assets/images/inspectionModeImage.png')}
          className="object-contain"
        />
      </View>
      <View className="px-4 pt-20">
        <Text className="mt-4 text-center text-3xl font-bold text-light-950 dark:text-dark-950">
          Inspecting Mode Active
        </Text>
        <Text className="mt-8 pl-4 text-xl text-light-950 dark:text-dark-950">
          We&apos;ve Got Your Back, Don&apos;t Worry!
        </Text>
        <View className="mt-10 flex flex-row items-center justify-center gap-4">
          <View className="flex flex-col items-center justify-center">
            <View className="rounded-2xl bg-light-100 px-10 py-5 dark:bg-dark-100">
              <Text className="text-2xl font-bold text-light-950 dark:text-dark-950">08</Text>
            </View>
            <Text className="mt-4 text-xl text-light-950 dark:text-dark-950">Hours</Text>
          </View>
          <View className="flex flex-col items-center justify-center">
            <View className="rounded-2xl bg-light-100 px-10 py-5 dark:bg-dark-100">
              <Text className="text-2xl font-bold text-light-950 dark:text-dark-950">02</Text>
            </View>
            <Text className="mt-4 text-xl text-light-950 dark:text-dark-950">Minutes</Text>
          </View>
          <View className="flex flex-col items-center justify-center">
            <View className="rounded-2xl bg-light-100 px-10 py-5 dark:bg-dark-100">
              <Text className="text-2xl font-bold text-light-950 dark:text-dark-950">30</Text>
            </View>
            <Text className="mt-4 text-xl text-light-950 dark:text-dark-950">Seconds</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default index
