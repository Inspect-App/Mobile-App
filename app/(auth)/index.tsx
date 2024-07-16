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
import { ServerError } from '@/api/utils/'

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
    setError,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await signIn(data)
    } catch (error) {
      const e = error as ServerError
      setError('root', {
        type: 'manual',
        message: e.message,
      })
    }
  }
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
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCapitalize="none"
                placeholder="Email"
                className="mb-1 w-full rounded-xl border border-light-100 bg-light-200 p-4 dark:border-dark-100"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email?.message && (
            <Text className="text-sm text-red-500">{errors.email?.message}</Text>
          )}
          <View className="mb-4" />

          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  'Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                className="mb-1 w-full rounded-xl border border-light-100 bg-light-200 p-4 dark:border-dark-100"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password?.message && (
            <Text className="text-sm text-red-500">{errors.password?.message}</Text>
          )}
          <View className="mb-4" />

          {errors.root?.message && (
            <Text className="text-sm text-red-500">{errors.root?.message}</Text>
          )}

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
