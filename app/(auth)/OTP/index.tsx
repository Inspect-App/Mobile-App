import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native'
import OtpTextInput from 'react-native-text-input-otp'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'
import { ServerError } from '@/api/utils/ResponseError'

type OtpForm = {
  otp: string
}

const Index = () => {
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(0)
  const colorScheme = useColorScheme()

  const isDarkMode = colorScheme === 'dark'

  // react hook form
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<OtpForm>()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [countdown])

  const handleResendCode = () => {
    setCountdown(60)
    // Add your resend code logic here
  }

  const { user, verify } = useAuth()
  const onSubmit = async (data: { otp: string }) => {
    try {
      await verify({
        email: user!.email,
        verificationCode: data.otp,
      })

      router.replace('tabs')
    } catch (error) {
      const e = error as ServerError
      setError('root', {
        type: 'manual',
        message: e.message,
      })
      console.log(e.message)
    }
  }

  const styles = StyleSheet.create({
    OtpTextInput: {
      borderRadius: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      height: 40,
      color: isDarkMode ? 'white' : 'black', // Set text color based on theme
    },
    focusedStyle: {
      borderColor: '#5cb85c',
      borderBottomWidth: 2,
    },
    fontStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black', // Set font color based on theme
    },
  })

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex h-full items-center justify-center bg-light-50 px-4 dark:bg-dark-50">
        <Image source={require('@/assets/images/logo.png')} />
        <Text className="mt-10 text-2xl font-bold dark:text-dark-950">Enter The Code</Text>
        <Text className="mb-5 mt-5 dark:text-dark-950">
          We sent a 6-digit code to your email. Enter it below.
        </Text>
        {/* <OtpTextInput
          otp={otp}
          setOtp={setOtp}
          digits={5}
          style={styles.OtpTextInput}
          fontStyle={styles.fontStyle}
          focusedStyle={styles.focusedStyle}
        /> */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <OtpTextInput
              otp={value}
              setOtp={onChange}
              digits={6}
              style={styles.OtpTextInput}
              fontStyle={styles.fontStyle}
              focusedStyle={styles.focusedStyle}
            />
          )}
          name="otp"
          rules={{ required: 'OTP is required' }}
          defaultValue=""
        />
        {errors.root && <Text className="mt-2 text-sm text-red-500">{errors.root.message}</Text>}
        <View className="mt-10 flex w-full flex-row justify-around gap-2">
          <TouchableOpacity
            className={`rounded-xl bg-light-200 p-4 px-16 ${
              countdown > 0 ? 'opacity-60' : 'opacity-100'
            }`}
            onPress={handleResendCode}
            disabled={countdown > 0}
          >
            <Text
              className={`${countdown > 0 ? 'opacity-60' : 'opacity-100'} text-center font-bold`}
            >
              {countdown > 0 ? `${countdown} seconds` : 'Resend Code'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl bg-[#F20D0D] p-4 px-16"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-center font-bold text-white">Next</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Index
