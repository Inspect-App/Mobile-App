import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

interface FormData {
  email: string
  password: string
}
export default function Index() {
  // get the upper padding for safe area
  //     const paddingTop = useSafeAreaInsets().top
  //  console.log(`pt-[${paddingTop + 40}px]`)

  const { signIn } = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = (data) => signIn(data)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className={'flex-grow pt-[100px]'}>
        <Image
          className="w-3/4 self-center"
          // align self to center

          source={require('../../assets/images/logo.png')}
        />
        <Text className="pt-4 text-center text-2xl font-bold">Login to Inspect</Text>
        <View className="m-4">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                className="mb-5 w-full rounded-xl border border-light-100 bg-light-200 p-4 dark:border-dark-100"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                className="mb-5 w-full rounded-xl border border-light-100 bg-light-200 p-4 dark:border-dark-100"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />

          <Link href={''} className="mt-2 text-light-800">
            Forgot Password?
          </Link>
          <TouchableOpacity
            className="mt-4 w-full rounded-xl bg-[#f20d0d] p-4"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-center font-bold text-white">Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-4 w-full rounded-xl bg-[#ff] p-4">
            <Text className="text-center font-bold text-black">Create an Account </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
