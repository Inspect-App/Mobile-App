import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Text, Image, TextInput, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native'

export default function Page() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false)

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      className="flex h-full flex-col items-center gap-5 bg-light-50 px-10 dark:bg-dark-50"
    >
      <Image source={require('@/assets/images/logo.png')} />
      <Text className="text-2xl font-bold text-light-950 dark:text-dark-950">Create Account</Text>
      <View className="flex w-full items-center justify-center gap-2">
        <TextInput
          placeholder="Email"
          className="w-full rounded-xl border border-light-100 p-4 dark:border-dark-100 dark:text-light-100"
        />
        <View className="w-full">
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            className="w-full rounded-xl border border-light-100 p-4 dark:border-dark-100 dark:text-light-100"
          />
          <Entypo
            name={showPassword ? 'eye' : 'eye-with-line'}
            onPress={() => setShowPassword(!showPassword)}
            size={24}
            color={'#e5dbdb'}
            className="absolute right-4 top-3"
          />
        </View>
        <View className="w-full">
          <TextInput
            placeholder="Repeat Password"
            secureTextEntry={!showRepeatPassword}
            className="w-full rounded-xl border border-light-100 p-4 dark:border-dark-100 dark:text-light-100"
          />
          <Entypo
            name={showRepeatPassword ? 'eye' : 'eye-with-line'}
            onPress={() => setShowRepeatPassword(!showPassword)}
            size={24}
            className="absolute right-4 top-3"
            color={'#e5dbdb'}
          />
        </View>
      </View>
      <TouchableOpacity className="w-full rounded-xl bg-[#F20D0D] p-4">
        <Text className="text-center font-bold text-white">Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}
